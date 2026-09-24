import { ShieldCheck } from "lucide-react"

const GITHUB_URL = "https://github.com/your-username/plain-terms"
const PORTFOLIO_URL = "https://your-portfolio.example"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ShieldCheck className="size-4 text-primary" />
          Built as a consumer transparency project.
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Portfolio
          </a>
        </nav>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          PlainTerms explains agreements in simpler language. It does not provide legal advice.
        </p>
      </div>
    </footer>
  )
}
