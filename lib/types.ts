export const CATEGORY_KEYS = [
  "Your Data",
  "Data Sharing",
  "Your Legal Rights",
  "Payments & Cancellation",
  "Your Content & AI",
] as const

export type CategoryKey = (typeof CATEGORY_KEYS)[number]

export const STATUSES = ["Found", "Nothing notable found", "Unclear"] as const

export type Status = (typeof STATUSES)[number]

export interface CategoryResult {
  category: CategoryKey
  status: Status
  /** Plain-English explanation of what was found (or not). */
  summary: string
  /** Exact supporting text from the provided policy. Empty when nothing was found. */
  clause: string
}

export interface AnalysisResult {
  categories: CategoryResult[]
  /** True when results come from the built-in sample instead of a live model. */
  demo?: boolean
}
