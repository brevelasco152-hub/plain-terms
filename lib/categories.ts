import type { LucideIcon } from "lucide-react"
import { Database, Share2, Scale, CreditCard, Sparkles } from "lucide-react"
import type { CategoryKey } from "@/lib/types"

export interface CategoryMeta {
  key: CategoryKey
  icon: LucideIcon
  /** What the analysis looks for in this category — shown as helper text. */
  looksFor: string
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    key: "Your Data",
    icon: Database,
    looksFor:
      "Personal, location, activity, device and purchase information, retention, and deletion options.",
  },
  {
    key: "Data Sharing",
    icon: Share2,
    looksFor:
      "Third-party sharing, advertisers, analytics, partners, affiliates, data selling, and opt-outs.",
  },
  {
    key: "Your Legal Rights",
    icon: Scale,
    looksFor:
      "Mandatory arbitration, class-action or jury-trial waivers, dispute procedures, and deadlines.",
  },
  {
    key: "Payments & Cancellation",
    icon: CreditCard,
    looksFor:
      "Auto-renewal, free trials, cancellation requirements, refunds, price changes, and extra fees.",
  },
  {
    key: "Your Content & AI",
    icon: Sparkles,
    looksFor:
      "Content licenses, ownership, reproduction rights, and AI or model-training permissions.",
  },
]

export function getCategoryMeta(key: CategoryKey): CategoryMeta {
  return CATEGORY_META.find((c) => c.key === key) ?? CATEGORY_META[0]
}
