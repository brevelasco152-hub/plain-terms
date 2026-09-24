import { ClipboardPaste, ScanSearch, Lightbulb } from "lucide-react"

const STEPS = [
  {
    icon: ClipboardPaste,
    title: "Paste",
    description: "Paste a Terms & Conditions or Privacy Policy.",
  },
  {
    icon: ScanSearch,
    title: "Scan",
    description: "The tool looks for important clauses across five categories.",
  },
  {
    icon: Lightbulb,
    title: "Understand",
    description: "Get a simple explanation and see the original language for yourself.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-14 sm:px-6">
      <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        How it works
      </h2>
      <ol className="mt-8 grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="rounded-2xl border border-border bg-card p-6 text-center"
          >
            <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
              <step.icon className="size-5" />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Step {i + 1}</span>
            </div>
            <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
