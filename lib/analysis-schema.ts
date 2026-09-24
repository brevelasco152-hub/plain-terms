import { z } from "zod"
import { CATEGORY_KEYS, STATUSES } from "@/lib/types"

/**
 * Schema used both to constrain the model's structured output and to validate
 * whatever comes back before it is shown to the user.
 */
export const categoryResultSchema = z.object({
  category: z.enum(CATEGORY_KEYS),
  status: z.enum(STATUSES),
  summary: z.string(),
  clause: z.string(),
})

export const analysisSchema = z.object({
  categories: z.array(categoryResultSchema),
})

export type AnalysisSchema = z.infer<typeof analysisSchema>
