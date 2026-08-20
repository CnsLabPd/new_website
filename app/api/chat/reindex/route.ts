import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { refreshNiraWebsiteIndex, resolveNiraSiteOrigin } from "@/lib/nira-site-index"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 503 })
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  revalidateTag("nira-site-pages")
  const origin = resolveNiraSiteOrigin(request.nextUrl.origin)
  const results = await refreshNiraWebsiteIndex(origin)
  const indexed = results.filter((result) => result.ok).length

  return NextResponse.json({
    ok: indexed > 0,
    indexed,
    failed: results.length - indexed,
    pages: results,
    refreshedAt: new Date().toISOString(),
  })
}
