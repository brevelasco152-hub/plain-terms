"use client"

import { useEffect, useState } from "react"
import { ScanSearch } from "lucide-react"

const MESSAGES = [
  "Checking how your data is used…",
  "Looking for legal waivers…",
  "Checking subscription terms…",
  "Reviewing content and AI policies…",
]

export function AnalyzingState() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length)
    }, 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-3xl border border-border bg-card px-6 py-16 text-center">
      <span className="relative flex size-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <span className="relative flex size-16 items-center justify-center rounded-full bg-accent text-primary">
          <ScanSearch className="size-7" />
        </span>
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">Reading the fine print…</p>
        <p key={index} className="animate-in fade-in text-sm text-muted-foreground">
          {MESSAGES[index]}
        </p>
      </div>

      <div className="flex gap-1.5" aria-hidden="true">
        {MESSAGES.map((_, i) => (
          <span
            key={i}
            className={
              i === index
                ? "size-1.5 rounded-full bg-primary transition-colors"
                : "size-1.5 rounded-full bg-border transition-colors"
            }
          />
        ))}
      </div>
    </div>
  )
}
