"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type PerBalloon = {
  spawn_t_ms: number
  pop_t_ms: number | null
  reaction_time_ms: number | null
  popped: boolean
}

type AnalyticsPayload = {
  metadata?: {
    session_id?: string
    username?: string
    game_id?: string
    timestamp_start?: string
    timestamp_end?: string
    level_number?: number
    module_number?: number
  }
  wrist_kinematics?: {
    sample_count?: number
    average_velocity_px_per_s?: number | null
    average_acceleration_px_per_s2?: number | null
    average_jerk_px_per_s3?: number | null
  }
  reaction_time?: {
    average_reaction_time_ms?: number | null
    total_spawned?: number
    total_popped?: number
    total_missed?: number
    per_balloon?: PerBalloon[]
  }
}

const POLL_INTERVAL_MS = 2000
const MAX_POLL_ATTEMPTS = 10

function formatNumber(value: number | null | undefined, digits = 2) {
  return typeof value === "number" ? value.toFixed(digits) : "Pending"
}

export default function SonicPopResultsPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("sessionId")

  const [analytics, setAnalytics] = useState<AnalyticsPayload | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [message, setMessage] = useState("Processing analytics...")

  useEffect(() => {
    if (!sessionId) {
      setStatus("error")
      setMessage("Missing sessionId in the results URL.")
      return
    }

    let isCancelled = false
    let attempt = 0

    const fetchAnalytics = async () => {
      attempt += 1

      try {
        const response = await fetch(
          `/api/sonic-pop/results?sessionId=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" }
        )

        if (response.status === 202) {
          if (attempt >= MAX_POLL_ATTEMPTS) {
            if (!isCancelled) {
              setStatus("error")
              setMessage("Analytics are still processing. Reload this page in a few seconds.")
            }
            return
          }

          if (!isCancelled) {
            setMessage(`Processing analytics... (${attempt}/${MAX_POLL_ATTEMPTS})`)
            window.setTimeout(fetchAnalytics, POLL_INTERVAL_MS)
          }
          return
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch analytics: ${response.status}`)
        }

        const payload = await response.json()
        if (!isCancelled) {
          setAnalytics(payload.analytics)
          setStatus("ready")
        }
      } catch (error) {
        console.error("Failed to fetch Sonic Pop analytics:", error)
        if (!isCancelled) {
          setStatus("error")
          setMessage("Could not load analytics results.")
        }
      }
    }

    fetchAnalytics()

    return () => {
      isCancelled = true
    }
  }, [sessionId])

  const perBalloon = useMemo(
    () => analytics?.reaction_time?.per_balloon ?? [],
    [analytics]
  )

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-xl text-center space-y-4">
          <div className="h-12 w-12 mx-auto border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <h1 className="text-3xl font-black tracking-tight">Sonic Pop Results</h1>
          <p className="text-slate-300">{message}</p>
        </div>
      </div>
    )
  }

  if (status === "error" || !analytics) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-3xl font-black tracking-tight">Sonic Pop Results</h1>
          <p className="text-slate-300">{message}</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/gaming/play/sonic-pop" className="px-5 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold">
              Play Again
            </Link>
            <Link href="/gaming/play/sonic-pop" className="px-5 py-3 rounded-xl border border-white/15 text-white font-bold">
              Back To Level Select
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#12304a,_#020617_60%)] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-cyan-300 uppercase tracking-[0.25em] text-xs font-bold">Sonic Pop Analytics</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Session Results</h1>
            <p className="text-slate-300 mt-2">
              Session `{analytics.metadata?.session_id ?? sessionId}` for {analytics.metadata?.username ?? "player"}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/gaming/play/sonic-pop" className="px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 font-black">
              Play Again
            </Link>
            <Link href="/gaming/play/sonic-pop" className="px-5 py-3 rounded-xl border border-white/15 text-white font-black">
              Back To Level Select
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/60 p-5">
            <p className="text-slate-400 text-sm">Average Velocity</p>
            <p className="text-3xl font-black mt-2">{formatNumber(analytics.wrist_kinematics?.average_velocity_px_per_s)} <span className="text-sm text-slate-400">px/s</span></p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/60 p-5">
            <p className="text-slate-400 text-sm">Average Acceleration</p>
            <p className="text-3xl font-black mt-2">{formatNumber(analytics.wrist_kinematics?.average_acceleration_px_per_s2)} <span className="text-sm text-slate-400">px/s²</span></p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/60 p-5">
            <p className="text-slate-400 text-sm">Average Jerk</p>
            <p className="text-3xl font-black mt-2">{formatNumber(analytics.wrist_kinematics?.average_jerk_px_per_s3)} <span className="text-sm text-slate-400">px/s³</span></p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/60 p-5">
            <p className="text-slate-400 text-sm">Average Reaction Time</p>
            <p className="text-3xl font-black mt-2">{formatNumber(analytics.reaction_time?.average_reaction_time_ms)} <span className="text-sm text-slate-400">ms</span></p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-xl font-black">Session Summary</h2>
            <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
              <div>
                <p className="text-slate-400">Game</p>
                <p className="font-bold">{analytics.metadata?.game_id ?? "sonic_pop"}</p>
              </div>
              <div>
                <p className="text-slate-400">Level</p>
                <p className="font-bold">{analytics.metadata?.level_number ?? "-"}</p>
              </div>
              <div>
                <p className="text-slate-400">Module</p>
                <p className="font-bold">{analytics.metadata?.module_number ?? "-"}</p>
              </div>
              <div>
                <p className="text-slate-400">Wrist Samples</p>
                <p className="font-bold">{analytics.wrist_kinematics?.sample_count ?? "-"}</p>
              </div>
              <div>
                <p className="text-slate-400">Spawned</p>
                <p className="font-bold">{analytics.reaction_time?.total_spawned ?? 0}</p>
              </div>
              <div>
                <p className="text-slate-400">Popped / Missed</p>
                <p className="font-bold">
                  {analytics.reaction_time?.total_popped ?? 0} / {analytics.reaction_time?.total_missed ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-xl font-black">Reaction Timeline</h2>
            <div className="mt-5 space-y-3">
              {perBalloon.map((item, index) => (
                <div
                  key={`${item.spawn_t_ms}-${index}`}
                  className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-bold">Balloon {index + 1}</p>
                    <p className="text-xs text-slate-400">Spawn {item.spawn_t_ms} ms</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-black ${item.popped ? "text-emerald-300" : "text-amber-300"}`}>
                      {item.popped ? `${formatNumber(item.reaction_time_ms, 0)} ms` : "Missed"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {item.popped ? `Pop ${item.pop_t_ms} ms` : "No pop event recorded"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
