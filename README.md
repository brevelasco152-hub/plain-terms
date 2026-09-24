# PlainTerms

**Know what you're agreeing to.** Paste a Terms & Conditions or Privacy Policy and get a quick, plain-English breakdown of what actually matters before you click "I agree."

> PlainTerms explains agreements in simpler language. **It does not provide legal advice.**

## The problem

Almost nobody reads the Terms & Conditions or Privacy Policy before accepting them — they're long, dense, and written for lawyers. That means people routinely agree to arbitration clauses, class-action waivers, auto-renewing subscriptions, broad content licenses, and AI-training permissions without realizing it.

PlainTerms surfaces the sections that tend to matter most, explains them in everyday language, and always shows the original clause so you can verify it yourself. It never scores or labels a company as "safe" or "unsafe" — it just helps you understand the agreement and decide for yourself.


## How It Works

**1. Paste**
Paste a Terms & Conditions or Privacy Policy into the scanner.

**2. Scan**
The app analyzes the agreement for five specific categories.

**3. Understand**
Get a plain-English explanation of what was found and view the original clause for yourself.

## What It Looks For

### 🔒 Your Data

Looks for what personal information the service collects, including things like location, activity, device information, purchase information, data retention, and deletion options.

### 🤝 Data Sharing

Looks for whether information may be shared or sold to advertisers, partners, affiliates, analytics providers, or other third parties.

### ⚖️ Your Legal Rights

Looks for clauses involving mandatory arbitration, class-action waivers, jury-trial waivers, and other dispute requirements.

### 💳 Payments & Cancellation

Looks for automatic renewals, trial-to-paid conversions, cancellation requirements, refund restrictions, fees, and price changes.

### 📸 Your Content & AI

Looks for what rights a service receives over content you upload, whether you keep ownership, and whether your content or data may be used for AI or model training.

## Results

Instead of giving an agreement an arbitrary “safety score,” Terms Scanner uses three simple statuses:

* **Found** — relevant language was identified
* **Nothing notable found** — no relevant language was identified in the provided text
* **Unclear** — the wording could not be confidently interpreted

When something is found, the app also displays the original clause that led to the result.

The goal isn't to decide whether a company is “good” or “bad.” It's to help users find the parts of an agreement they might actually want to read.

## Demo Mode

Don't have a 40-page Terms & Conditions document ready?

The app includes a sample policy so the full scanning experience can be tested immediately.

**[Try the Live Demo]((https://terms-and-conditions-analyzer-mu.vercel.app/))**

## Tech Stack

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* OpenAI API
* Vercel

## Running Locally

Clone the repository:

```bash
git clone YOUR_GITHUB_REPO_URL
cd YOUR_PROJECT_FOLDER
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_api_key_here
```

Then start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.


## Why I Built This

I wanted to explore a problem most people experience but usually ignore: we agree to digital contracts all the time without really knowing what we're agreeing to.

This project started with a simple question:

> **What if you could see the parts that actually matter before clicking “I agree”?**

I built the MVP around that moment instead of trying to summarize every line of an agreement.

## Future Ideas

This is intentionally a small MVP. Some ideas for future versions include:

* Automatically detecting Terms & Conditions during signup
* Browser extension support
* Saving agreements you've accepted
* Detecting when a company changes its terms
* Showing exactly what changed between versions
* Notifications when an agreement you previously accepted changes
* More detailed privacy controls and explanations

## Disclaimer

PlainTerms is an informational tool designed to make Terms & Conditions and Privacy Policies easier to understand.

It does not provide legal advice and should not be treated as a substitute for advice from a qualified legal professional.



Built as a consumer transparency project.

