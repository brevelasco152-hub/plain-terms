import { generateText, Output } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { analysisSchema } from "@/lib/analysis-schema"
import { CATEGORY_KEYS, type AnalysisResult, type CategoryResult } from "@/lib/types"

/**
 * The model / provider lives behind this single function so it can be swapped
 * without touching the API route or UI. To change providers, replace the
 * client and model below and keep returning an `AnalysisResult`.
 */
const MODEL_ID = "gpt-4o-mini"

export function isModelConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY)
}

const SYSTEM_PROMPT = `You are a careful assistant that helps everyday people understand Terms & Conditions and Privacy Policies before they agree to them. You are not a lawyer and you never give legal advice.

You will receive the full text of a policy. Analyze it across exactly these five categories:
1. "Your Data" — personal information collected, location, browsing/activity, device info, purchase info, data retention, deletion options.
2. "Data Sharing" — third-party sharing, advertisers, analytics companies, business partners, affiliates, data selling, opt-out options.
3. "Your Legal Rights" — mandatory arbitration, class-action waivers, jury-trial waivers, dispute procedures, deadlines for disputes.
4. "Payments & Cancellation" — automatic renewal, free trials becoming paid, cancellation requirements, refund restrictions, price changes, additional fees.
5. "Your Content & AI" — licenses granted over uploaded content, whether the user keeps ownership, rights to reproduce/distribute content, AI/model-training permissions.

Strict rules:
- Only make claims that are directly supported by the provided text. Never invent, assume, or generalize beyond what is written.
- For each category, choose a status:
  - "Found": the policy clearly contains relevant terms. You MUST include the exact supporting sentence(s) copied verbatim from the policy in the "clause" field.
  - "Nothing notable found": the policy does not meaningfully address this category. Set "clause" to an empty string.
  - "Unclear": the wording is ambiguous or you cannot confidently interpret it. Include the ambiguous text in "clause" if there is any, otherwise an empty string.
- Write each "summary" in short, plain English that someone with no legal background can understand. Explain what the terms mean for the user. Do not give advice, do not say whether the company is safe/unsafe or trustworthy, and do not claim anything is illegal or harmful.
- Return exactly one result object per category, in the order listed above.
- The "clause" for any "Found" result must be copied word-for-word from the provided policy so the user can verify it.`

export async function analyzePolicy(policyText: string): Promise<AnalysisResult> {
  const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const { output } = await generateText({
    model: openai(MODEL_ID),
    system: SYSTEM_PROMPT,
    prompt: `Analyze the following policy text:\n\n"""\n${policyText}\n"""`,
    output: Output.object({ schema: analysisSchema }),
    // Fail fast on retryable provider errors and stay below the route timeout.
    maxRetries: 1,
    abortSignal: AbortSignal.timeout(50_000),
    // Fail faster and stay under the route's 60s maxDuration: the default
    // retry policy spends ~25s on retryable API errors (quota, overload),
    // which is what made the UI hang before showing an error.
    maxRetries: 1,
    abortSignal: AbortSignal.timeout(50_000),
  })

  return { categories: normalizeCategories(output.categories) }
}

/**
 * Guarantees the UI always receives exactly the five expected categories in
 * order, even if the model omits or reorders some.
 */
function normalizeCategories(categories: CategoryResult[]): CategoryResult[] {
  return CATEGORY_KEYS.map((key) => {
    const match = categories.find((c) => c.category === key)
    if (match) return match
    return {
      category: key,
      status: "Unclear" as const,
      summary: "We couldn't analyze this category from the provided text.",
      clause: "",
    }
  })
}
