import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PolicyScanner } from "@/components/policy-scanner"

export default function Page() {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PolicyScanner />
      </main>
      <SiteFooter />
    </div>
  )
}
