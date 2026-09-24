import { RotateCcw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/result-card"
import type { AnalysisResult } from "@/lib/types"

export function ResultsView({
  result,
  onReset,
}: {
  result: AnalysisResult
  onReset: () => void
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          Here&apos;s what you should know
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-pretty">
          We found the sections that may matter most before you agree.
        </p>
      </div>

      {result.demo && (
        <div className="mx-auto flex max-w-xl items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          <Info className="size-4 shrink-0" />
          <span>
            <strong className="font-semibold">Demo data.</strong> No API key is configured, so these
            are sample results for the built-in example policy.
          </span>
        </div>
      )}

      <div className="grid gap-4">
        {result.categories.map((category) => (
          <ResultCard key={category.category} result={category} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw data-icon="inline-start" />
          Scan another policy
        </Button>
        <p className="max-w-md text-center text-xs leading-relaxed text-muted-foreground">
          This tool helps explain agreements in simpler language. It does not provide legal advice.
        </p>
      </div>
    </div>
  )
}
