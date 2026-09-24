"use client"

import { useState } from "react"
import { Sparkles, ScanSearch, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AnalyzingState } from "@/components/analyzing-state"
import { ResultsView } from "@/components/results-view"
import { HowItWorks } from "@/components/how-it-works"
import { SAMPLE_POLICY } from "@/lib/sample-policy"
import { analysisSchema } from "@/lib/analysis-schema"
import type { AnalysisResult } from "@/lib/types"

type Phase = "idle" | "loading" | "results"

export function PolicyScanner() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [text, setText] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze() {
    if (!text.trim()) return
    setPhase("loading")
    setError(null)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policy: text }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.")
        setPhase("idle")
        return
      }

      const parsed = analysisSchema.safeParse(data)
      if (!parsed.success) {
        setError("We couldn't read the analysis result. Please try again.")
        setPhase("idle")
        return
      }

      setResult({ categories: parsed.data.categories, demo: Boolean(data.demo) })
      setPhase("results")
    } catch {
      setError("We couldn't reach the analyzer. Please check your connection and try again.")
      setPhase("idle")
    }
  }

  function handleReset() {
    setPhase("idle")
    setResult(null)
    setError(null)
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (phase === "loading") {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AnalyzingState />
      </div>
    )
  }

  if (phase === "results" && result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ResultsView result={result} onReset={handleReset} />
      </div>
    )
  }

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-14 pb-4 sm:px-6 sm:pt-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Understand agreements in plain English
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Know what you&apos;re agreeing to.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Paste the Terms &amp; Conditions or Privacy Policy and get a quick breakdown of what
            actually matters before you click &quot;I agree.&quot;
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <label htmlFor="policy" className="sr-only">
            Paste your Terms &amp; Conditions or Privacy Policy
          </label>
          <Textarea
            id="policy"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the Terms & Conditions or Privacy Policy here…"
            className="min-h-52 resize-y border-0 bg-transparent px-2 py-1 text-base shadow-none focus-visible:ring-0 dark:bg-transparent"
          />

          <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setText(SAMPLE_POLICY)}
              className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <ScanSearch className="size-3.5" />
              Try a sample policy
            </button>

            <Button size="lg" onClick={handleAnalyze} disabled={!text.trim()}>
              <ScanSearch data-icon="inline-start" />
              Analyze Terms
            </Button>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            <AlertTriangle className="size-4 shrink-0" />
            {error}
          </div>
        )}

        <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
          This tool helps explain agreements in simpler language. It does not provide legal advice.
        </p>
      </section>

      <HowItWorks />
    </>
  )
}
