import { ChevronDown, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { getCategoryMeta } from "@/lib/categories"
import type { CategoryResult, Status } from "@/lib/types"

const STATUS_STYLES: Record<
  Status,
  { badge: string; icon: typeof CheckCircle2; iconClass: string }
> = {
  Found: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
    icon: AlertCircle,
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  "Nothing notable found": {
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
    icon: CheckCircle2,
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  Unclear: {
    badge:
      "border-border bg-muted text-muted-foreground",
    icon: HelpCircle,
    iconClass: "text-muted-foreground",
  },
}

export function ResultCard({ result }: { result: CategoryResult }) {
  const meta = getCategoryMeta(result.category)
  const status = STATUS_STYLES[result.status]
  const StatusIcon = status.icon
  const hasClause = result.status === "Found" && result.clause.trim().length > 0

  return (
    <div className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
          <meta.icon className="size-5" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold">{result.category}</h3>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                status.badge,
              )}
            >
              <StatusIcon className={cn("size-3.5", status.iconClass)} />
              {result.status}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{result.summary}</p>

          {hasClause && (
            <Collapsible className="mt-1">
              <CollapsibleTrigger className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                View original clause
                <ChevronDown className="size-4 transition-transform group-data-[panel-open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <blockquote className="mt-3 rounded-xl border-l-2 border-primary/40 bg-muted/60 px-4 py-3 text-sm italic leading-relaxed text-foreground/80">
                  {result.clause}
                </blockquote>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </div>
    </div>
  )
}
