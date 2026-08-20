import { load } from "cheerio"

const REVALIDATE_SECONDS = 6 * 60 * 60
const MEMORY_CACHE_MS = REVALIDATE_SECONDS * 1_000
const MAX_HTML_BYTES = 2_000_000
const MAX_SELECTED_PAGES = 3
const MAX_CONTEXT_CHARS = 9_000

type SitePage = {
  path: string
  label: string
  keywords: string[]
}

type PageChunk = {
  path: string
  label: string
  heading: string
  text: string
}

type CachedPage = {
  expiresAt: number
  chunks: PageChunk[]
}

export type NiraWebsiteSource = {
  href: string
  label: string
}

export type NiraWebsiteContext = {
  context: string
  sources: NiraWebsiteSource[]
}

export const NIRA_SITE_PAGES: SitePage[] = [
  { path: "/", label: "Neurogati home", keywords: ["neurogati", "company", "services", "what do", "overview", "mission"] },
  { path: "/about", label: "About Neurogati", keywords: ["about", "company", "mission", "neurogati", "services", "work"] },
  { path: "/products", label: "Applications", keywords: ["applications", "products", "platform", "services", "akshara", "diagnostics"] },
  { path: "/neurodiagnostics", label: "Diagnostics and Qumon-PD", keywords: ["qumon", "quamon", "parkinson", "diagnostic", "monitoring", "gait", "tremor", "clinical"] },
  { path: "/assistivetech", label: "Assistive technology", keywords: ["assistive", "sparshbharati", "mudhrabharati", "nodtext", "braille", "accessibility", "sign language"] },
  { path: "/games", label: "Gaming and rehabilitation", keywords: ["games", "gaming", "rehabilitation", "exergames", "therapy", "crgs"] },
  { path: "/gamingcategories", label: "Neurogati games", keywords: ["games", "play", "posabets", "frosty", "dunk", "mandala", "sonic", "dart", "shoot froot", "crgs"] },
  { path: "/modelling", label: "Modelling and research", keywords: ["modelling", "modeling", "research", "publication", "books", "basal ganglia", "deep brain stimulation"] },
  { path: "/neurovidya", label: "Neurovidya learning platform", keywords: ["neurovidya", "education", "learning platform", "courses", "eeg", "python", "neural oscillators", "movement analysis", "books", "community"] },
  { path: "/workshops", label: "Workshops and programs", keywords: ["workshop", "program", "course", "class", "fees", "price", "registration", "student", "training", "school"] },
  { path: "/workshops/young-computational-neuroscientist-2026", label: "Young Computational Neuroscientist Program", keywords: ["young", "school", "class 9", "class 10", "class 11", "class 12", "ycnp", "computational neuroscientist"] },
  { path: "/workshops/research-program-phase-2-july-sept", label: "Computational Neuroscience Research Training Phase 2", keywords: ["phase 2", "research training", "mentorship", "research track", "abstract"] },
  { path: "/workshops/summer-school-2026", label: "Neurogati Summer School 2026", keywords: ["summer school", "2026", "lecture", "poster", "bci", "neurorehabilitation"] },
  { path: "/workshops/brain-modeling-medicos-july-2026", label: "Brain Modeling for Medicos", keywords: ["medicos", "medical", "brain modeling", "brain modelling", "doctor", "coding background"] },
  { path: "/workshops/ai-applications-eeg-august-2026", label: "AI Applications in EEG", keywords: ["eeg", "brain signals", "signal processing", "ai applications", "seizure"] },
  { path: "/workshops/research-program-phase-1", label: "AI and Brain Science Summer Program", keywords: ["phase 1", "brain science", "high school", "grade 8", "grade 9", "grade 10", "grade 11", "grade 12"] },
  { path: "/advisory", label: "Neurogati Advisory", keywords: ["advisory", "advice", "career", "learning path", "internship", "project", "collaboration", "consultation"] },
  { path: "/team", label: "Neurogati team", keywords: ["team", "founder", "chakravarthy", "indira", "scientist", "chief medical officer", "people"] },
  { path: "/careers", label: "Careers at Neurogati", keywords: ["career", "job", "opening", "position", "developer", "coordinator", "employment"] },
  { path: "/contact", label: "Contact Neurogati", keywords: ["contact", "email", "phone", "address", "location", "hours", "collaborate"] },
  { path: "/gallery", label: "Neurogati gallery", keywords: ["gallery", "event", "anubhav", "showcase", "photos"] },
  { path: "/privacy", label: "Privacy Policy", keywords: ["privacy", "data", "personal information", "deepseek", "nira", "delete"] },
  { path: "/terms", label: "Terms and Conditions", keywords: ["terms", "conditions", "medical disclaimer", "liability", "nira", "ai assistant"] },
]

export function resolveNiraSiteOrigin(requestOrigin: string) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`).origin
  }

  const fallback = new URL(requestOrigin)
  if (fallback.hostname === "localhost" || fallback.hostname === "127.0.0.1" || fallback.hostname === "::1") {
    return fallback.origin
  }

  return "https://www.neurogati.com"
}

const STOP_WORDS = new Set([
  "about", "after", "also", "and", "are", "can", "could", "does", "for", "from", "have", "how", "into", "its",
  "more", "that", "the", "their", "there", "they", "this", "was", "what", "when", "where", "which", "who", "will",
  "with", "would", "you", "your", "tell", "please", "want", "know",
])

const globalCache = globalThis as typeof globalThis & { __niraPageCache?: Map<string, CachedPage> }
const pageCache = globalCache.__niraPageCache || new Map<string, CachedPage>()
globalCache.__niraPageCache = pageCache

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function searchable(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim()
}

function tokenize(value: string) {
  return [...new Set(searchable(value).split(" ").filter((token) => token.length > 2 && !STOP_WORDS.has(token)))]
}

function occurrences(text: string, term: string) {
  let count = 0
  let cursor = 0
  while (count < 5) {
    const found = text.indexOf(term, cursor)
    if (found === -1) break
    count += 1
    cursor = found + term.length
  }
  return count
}

function selectPages(query: string, pagePath: string) {
  const normalizedQuery = searchable(query)
  const tokens = tokenize(query)

  const ranked = NIRA_SITE_PAGES.map((page) => {
    const haystack = searchable(`${page.label} ${page.keywords.join(" ")}`)
    let score = page.path === pagePath ? 14 : 0

    for (const keyword of page.keywords) {
      const normalizedKeyword = searchable(keyword)
      if (normalizedKeyword && normalizedQuery.includes(normalizedKeyword)) score += normalizedKeyword.includes(" ") ? 10 : 6
    }
    for (const token of tokens) {
      if (haystack.includes(token)) score += 2
    }
    return { page, score }
  }).sort((a, b) => b.score - a.score)

  const matched = ranked.filter((entry) => entry.score > 0).slice(0, MAX_SELECTED_PAGES)
  if (matched.length > 0) return matched

  return ["/about", "/products", "/workshops"]
    .map((path) => ({ page: NIRA_SITE_PAGES.find((page) => page.path === path)!, score: 1 }))
}

function htmlToChunks(html: string, page: SitePage) {
  const $ = load(html)
  $("script, style, noscript, svg, canvas, iframe, nav, footer, form, button, [role='dialog'], [aria-label*='Nira']").remove()

  const root = $("main").first().length ? $("main").first() : $("body")
  const blocks: Array<{ heading: string; text: string }> = []
  const seen = new Set<string>()
  let heading = page.label

  root.find("h1, h2, h3, h4, p, li, dt, dd, figcaption, th, td").each((_, element) => {
    const text = normalize($(element).text())
    if (text.length < 2 || seen.has(text)) return
    seen.add(text)

    if (/^h[1-4]$/.test(element.tagName)) {
      heading = text.slice(0, 180)
      return
    }
    blocks.push({ heading, text })
  })

  const chunks: PageChunk[] = []
  let currentHeading = page.label
  let current: string[] = []
  let currentLength = 0

  const flush = () => {
    if (!current.length) return
    chunks.push({ path: page.path, label: page.label, heading: currentHeading, text: current.join("\n") })
    current = []
    currentLength = 0
  }

  for (const block of blocks) {
    if (block.heading !== currentHeading || currentLength + block.text.length > 1_300) {
      flush()
      currentHeading = block.heading
    }
    current.push(block.text)
    currentLength += block.text.length
  }
  flush()

  return chunks.slice(0, 80)
}

async function fetchPage(origin: string, page: SitePage, force = false) {
  const cacheKey = `${origin}${page.path}`
  const cached = pageCache.get(cacheKey)
  if (!force && cached && cached.expiresAt > Date.now()) return cached.chunks

  const response = await fetch(new URL(page.path, origin), {
    headers: {
      Accept: "text/html",
      "User-Agent": "Neurogati-Nira-Indexer/1.0",
    },
    next: { revalidate: REVALIDATE_SECONDS, tags: ["nira-site-pages"] },
    signal: AbortSignal.timeout(30_000),
  })

  if (!response.ok) throw new Error(`Could not index ${page.path}: HTTP ${response.status}`)
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("text/html")) throw new Error(`Could not index ${page.path}: not HTML`)

  const declaredLength = Number(response.headers.get("content-length") || 0)
  if (declaredLength > MAX_HTML_BYTES) throw new Error(`Could not index ${page.path}: response too large`)

  const html = await response.text()
  if (html.length > MAX_HTML_BYTES) throw new Error(`Could not index ${page.path}: response too large`)

  const chunks = htmlToChunks(html, page)
  if (!chunks.length) throw new Error(`Could not index ${page.path}: no readable content`)

  pageCache.set(cacheKey, { chunks, expiresAt: Date.now() + MEMORY_CACHE_MS })
  return chunks
}

export async function retrieveNiraWebsiteContext(args: {
  origin: string
  query: string
  pagePath: string
}): Promise<NiraWebsiteContext> {
  const selected = selectPages(args.query, args.pagePath)
  const settled = await Promise.allSettled(selected.map(({ page }) => fetchPage(args.origin, page)))
  const allChunks = settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []))
  if (!allChunks.length) return { context: "", sources: [] }

  const tokens = tokenize(args.query)
  const rankedChunks = allChunks
    .map((chunk) => {
      const haystack = searchable(`${chunk.heading} ${chunk.text}`)
      const selectedPage = selected.find(({ page }) => page.path === chunk.path)
      let score = selectedPage?.score || 0
      for (const token of tokens) score += occurrences(haystack, token) * 2
      if (chunk.path === args.pagePath) score += 4
      return { chunk, score }
    })
    .sort((a, b) => b.score - a.score)

  const chosen: PageChunk[] = []
  let contextLength = 0
  for (const { chunk } of rankedChunks) {
    const nextLength = chunk.text.length + chunk.heading.length + 80
    if (chosen.length >= 8 || contextLength + nextLength > MAX_CONTEXT_CHARS) continue
    chosen.push(chunk)
    contextLength += nextLength
  }

  const context = chosen
    .map((chunk) => `[SOURCE: ${chunk.label} | ${chunk.path}]\nSECTION: ${chunk.heading}\n${chunk.text}`)
    .join("\n\n")

  const sources = [...new Map(chosen.map((chunk) => [chunk.path, { href: chunk.path, label: `Source: ${chunk.label}` }])).values()]
    .slice(0, 3)

  return { context, sources }
}

export async function refreshNiraWebsiteIndex(origin: string) {
  for (const key of pageCache.keys()) {
    if (key.startsWith(origin)) pageCache.delete(key)
  }

  const results: Array<{ path: string; ok: boolean; chunks?: number; error?: string }> = []
  for (let index = 0; index < NIRA_SITE_PAGES.length; index += 4) {
    const batch = NIRA_SITE_PAGES.slice(index, index + 4)
    const settled = await Promise.allSettled(batch.map((page) => fetchPage(origin, page, true)))
    settled.forEach((result, batchIndex) => {
      const page = batch[batchIndex]
      results.push(
        result.status === "fulfilled"
          ? { path: page.path, ok: true, chunks: result.value.length }
          : { path: page.path, ok: false, error: result.reason instanceof Error ? result.reason.message : "Indexing failed" }
      )
    })
  }

  return results
}
