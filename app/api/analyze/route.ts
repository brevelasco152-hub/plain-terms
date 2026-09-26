import { NextResponse } from "next/server"
import { analyzePolicy, isModelConfigured } from "@/lib/analyze"
import { analysisSchema } from "@/lib/analysis-schema"
import { DEMO_RESULT } from "@/lib/demo-results"

export const runtime = "nodejs"
export const maxDuration = 60

const MAX_CHARS = 60_000

export async function POST(request: Request) {
  let policy = ""
  try {
    const body = await request.json()
    policy = typeof body?.policy === "string" ? body.policy : ""
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const trimmed = policy.trim()
  if (trimmed.length < 40) {
    return NextResponse.json(
      { error: "Please paste a longer policy so we have enough text to analyze." },
      { status: 400 },
    )
  }

  const text = trimmed.slice(0, MAX_CHARS)

  // No key configured → serve the demo experience so the app still works.
  if (!isModelConfigured()) {
    return NextResponse.json(DEMO_RESULT)
  }

  try {
    const result = await analyzePolicy(text)

    // Validate the model output before it reaches the client.
    const parsed = analysisSchema.safeParse(result)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "We couldn't read the analysis result. Please try again." },
        { status: 502 },
      )
    }

    return NextResponse.json({ categories: parsed.data.categories, demo: false })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.log("[plain-terms] analyze error:", message)

    // Surface configuration/quota problems distinctly so they stop looking
    // like random transient failures.
    const isQuota = /insufficient_quota|quota|billing|rate limit/i.test(message)
    return NextResponse.json(
      {
        error: isQuota
          ? "Analysis is temporarily unavailable. Please try again later."
          : "Something went wrong while analyzing the policy. Please try again.",
      },
      { status: isQuota ? 503 : 500 },
    )
  }
}
