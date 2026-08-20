"use client"

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ExternalLink, MessageCircle, RefreshCcw, Send, ShieldCheck, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ChatLink = { label: string; href: string }
type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  links?: ChatLink[]
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello, I am Nira, Neurogati's AI website guide. I can help you explore our applications, games, research, workshops, and advisory services. What would you like to know?",
}

const QUICK_QUESTIONS = [
  "What does Neurogati do?",
  "Which workshops are open?",
  "Tell me about Qumon-PD",
]

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function NiraChatbot() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowGreeting(true)
    const timer = window.setTimeout(() => setShowGreeting(false), 9_000)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 260)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "end" })
  }, [messages, loading, reduceMotion])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE])
    setInput("")
    setError("")
    inputRef.current?.focus()
  }

  const openChat = () => {
    setShowGreeting(false)
    setOpen(true)
  }

  const sendMessage = async (suggestion?: string) => {
    const content = (suggestion ?? input).trim()
    if (!content || loading) return

    const userMessage: ChatMessage = { id: newId(), role: "user", content }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput("")
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pagePath: pathname,
          messages: nextMessages
            .filter((message) => message.id !== "welcome")
            .slice(-10)
            .map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || "Nira is temporarily unavailable.")

      setMessages((current) => [
        ...current,
        {
          id: newId(),
          role: "assistant",
          content: data.answer,
          links: Array.isArray(data.links) ? data.links : [],
        },
      ])
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Nira is temporarily unavailable.")
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    void sendMessage()
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void sendMessage()
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-label="Chat with Nira"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-[130] flex h-[78dvh] max-h-[680px] flex-col overflow-hidden border border-border bg-background shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(680px,calc(100dvh-48px))] sm:w-[400px] sm:rounded-lg"
          >
            <header className="relative flex h-[76px] flex-none items-center gap-3 border-b border-white/10 bg-[#104581] px-4 text-white">
              <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full border-2 border-white/80 bg-[#f7eee4] shadow-sm">
                <Image src="/nira-avatar.jpg" alt="Nira" fill sizes="48px" className="object-cover" priority />
              </div>
              <span className="absolute left-[53px] top-[49px] h-3 w-3 rounded-full border-2 border-[#104581] bg-emerald-400" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold leading-tight">Nira</h2>
                <p className="mt-1 text-xs text-blue-100">Grounded in Neurogati's website</p>
              </div>
              <button
                type="button"
                onClick={resetChat}
                className="flex h-9 w-9 items-center justify-center rounded-full text-blue-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <RefreshCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-blue-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close Nira"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto bg-muted/25 px-4 py-5" aria-live="polite" aria-busy={loading}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div className={cn("max-w-[86%]", message.role === "user" ? "items-end" : "items-start")}>
                      <div
                        className={cn(
                          "whitespace-pre-wrap rounded-lg px-3.5 py-3 text-[14px] leading-relaxed shadow-sm",
                          message.role === "user"
                            ? "bg-[#1c82c2] text-white"
                            : "border border-border bg-background text-foreground"
                        )}
                      >
                        {message.content}
                      </div>
                      {!!message.links?.length && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.links.map((link) => (
                            <Link
                              key={`${message.id}-${link.href}`}
                              href={link.href}
                              className="inline-flex items-center gap-1.5 rounded-md border border-blue-500/30 bg-blue-500/5 px-2.5 py-1.5 text-xs font-semibold text-[#1c82c2] transition-colors hover:bg-blue-500/10 dark:text-sky-300"
                            >
                              {link.label}
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {messages.length === 1 && (
                  <div className="grid gap-2 pt-1">
                    {QUICK_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => void sendMessage(question)}
                        className="min-h-10 rounded-md border border-border bg-background px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:border-blue-500/40 hover:bg-blue-500/5"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-4 shadow-sm" aria-label="Nira is responding">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="h-1.5 w-1.5 rounded-full bg-[#1c82c2]"
                          animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <div role="alert" className="rounded-md border border-red-500/30 bg-red-500/5 px-3 py-2.5 text-sm text-red-700 dark:text-red-300">
                    {error}
                  </div>
                )}
                <div ref={endRef} />
              </div>
            </div>

            <form onSubmit={onSubmit} className="flex-none border-t border-border bg-background p-3">
              <div className="flex items-end gap-2 rounded-lg border border-input bg-background p-2 focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/10">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 800))}
                  onKeyDown={onInputKeyDown}
                  rows={2}
                  maxLength={800}
                  disabled={loading}
                  placeholder="Ask about Neurogati..."
                  aria-label="Message Nira"
                  className="max-h-24 min-h-11 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#1c82c2] text-white transition-colors hover:bg-[#176fa5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                  title="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex items-start gap-1.5 px-1 text-[10px] leading-4 text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-3 w-3 flex-none" />
                <p>
                  AI-generated information. Do not share personal or clinical data. By sending, you acknowledge our{" "}
                  <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> and{" "}
                  <Link href="/terms" className="underline hover:text-foreground">Terms</Link>.
                </p>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && showGreeting && (
          <motion.aside
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.25, ease: "easeOut" }}
            className="fixed bottom-[96px] right-4 z-[119] w-[min(292px,calc(100vw-32px))] rounded-lg border border-border bg-background p-1.5 shadow-[0_14px_38px_rgba(15,23,42,0.22)] sm:bottom-[104px] sm:right-6"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={openChat}
              className="block w-full rounded-md px-3.5 py-3 pr-10 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c82c2]"
              aria-label="Open Nira chat"
            >
              <span className="block text-xs font-bold uppercase text-[#1c82c2] dark:text-sky-400">Nira</span>
              <span className="mt-1 block text-sm font-semibold leading-6 text-foreground">
                Hello, I am Nira. I am here to assist you.
              </span>
            </button>
            <button
              type="button"
              onClick={() => setShowGreeting(false)}
              className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c82c2]"
              aria-label="Dismiss Nira greeting"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={openChat}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.9 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 360, damping: 28 }
            }
            className="group fixed bottom-5 right-4 z-[120] flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-[#104581] shadow-[0_12px_35px_rgba(16,69,129,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40 sm:bottom-6 sm:right-6"
            aria-label="Open Nira, Neurogati AI website guide"
            title="Ask Nira"
          >
            <span className="absolute inset-0 rounded-full border border-blue-400/50 motion-safe:animate-ping motion-reduce:animate-none" aria-hidden="true" />
            <span className="relative h-[54px] w-[54px] overflow-hidden rounded-full bg-[#f7eee4]">
              <Image src="/nira-avatar.jpg" alt="" fill sizes="54px" className="object-cover transition-transform duration-300 group-hover:scale-105" priority />
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#1c82c2] text-white" aria-hidden="true">
              <MessageCircle className="h-3.5 w-3.5" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
