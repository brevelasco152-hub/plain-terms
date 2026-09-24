# PlainTerms

**Know what you're agreeing to.** Paste a Terms & Conditions or Privacy Policy and get a quick, plain-English breakdown of what actually matters before you click "I agree."

> PlainTerms explains agreements in simpler language. **It does not provide legal advice.**

## The problem

Almost nobody reads the Terms & Conditions or Privacy Policy before accepting them — they're long, dense, and written for lawyers. That means people routinely agree to arbitration clauses, class-action waivers, auto-renewing subscriptions, broad content licenses, and AI-training permissions without realizing it.

PlainTerms surfaces the sections that tend to matter most, explains them in everyday language, and always shows the original clause so you can verify it yourself. It never scores or labels a company as "safe" or "unsafe" — it just helps you understand the agreement and decide for yourself.

## MVP features

- **Paste → Analyze → Understand** in a single, focused flow.
- Results organized into **five categories**:
  1. **Your Data** — what's collected, retention, deletion options
  2. **Data Sharing** — third parties, advertisers, affiliates, selling, opt-outs
  3. **Your Legal Rights** — arbitration, class-action / jury-trial waivers, deadlines
  4. **Payments & Cancellation** — auto-renewal, trials, refunds, price changes
  5. **Your Content & AI** — content licenses, ownership, AI/model-training
- Each result shows a **status** (`Found`, `Nothing notable found`, or `Unclear`), a short plain-English **summary**, and an expandable **original clause** for verification.
- **Claims are grounded in the provided text only** — every `Found` result includes the supporting clause copied verbatim. No invented clauses.
- **Try a sample policy** button so anyone can test the app instantly.
- **Demo mode**: if no API key is configured, the app still works using a built-in sample policy and realistic pre-written results (clearly labeled as demo data).
- Polished, responsive design for desktop and mobile.

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide](https://lucide.dev) icons
- [AI SDK](https://ai-sdk.dev) with OpenAI for structured analysis + [Zod](https://zod.dev) for validation

## How the AI integration works

- Analysis runs **server-side only** in the `POST /api/analyze` route handler — the API key is never exposed to the client.
- The model call is isolated in [`lib/analyze.ts`](./lib/analyze.ts) so you can swap the model or provider without touching the UI.
- Output is generated as **structured JSON** constrained by a Zod schema and **validated** before it's returned to the client.
- If `OPENAI_API_KEY` is not set, the route returns the built-in **demo** result instead.

## Local setup

Requirements: Node.js 18.18+ and npm (or pnpm).

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# then edit .env.local and add your OpenAI key (optional — leave blank for demo mode)

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable         | Required | Description                                                                 |
| ---------------- | -------- | --------------------------------------------------------------------------- |
| `OPENAI_API_KEY` | No       | Server-side OpenAI key. If omitted, the app runs in demo mode with samples. |

`.env.local` is git-ignored — never commit your real key.

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. (Optional) Add `OPENAI_API_KEY` as an Environment Variable in the project settings to enable live analysis. Without it, the deployed app still loads and works in demo mode.
4. Deploy.

## Disclaimer

PlainTerms is an educational transparency tool. It summarizes and highlights portions of the text you provide and **does not provide legal advice**. Always consult a qualified professional for legal questions.
