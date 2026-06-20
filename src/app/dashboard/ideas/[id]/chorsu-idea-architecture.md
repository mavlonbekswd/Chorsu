Chorsu — Idea Architecture & Detail Spec (for Claude Code)
Audience: Claude Code. This defines what's INSIDE each idea — the content and the idea detail page at /dashboard/ideas/[id]. The core insight: Nobody pays for a 5-line "problem + solution." People pay for a complete 0-to-MVP roadmap they couldn't easily assemble themselves. Each idea must feel like a guided path from zero to a launched product — with visuals, system design, market analysis, and step-by-step build versions. Raw API/JSON is NOT the value (anyone can get that). The VALUE is the thought-through journey.

For now: build this as MOCK content (frontend only, no DB). Use one fully fleshed-out example idea so we can judge whether it feels worth paying for. If it's strong, we wire it to a database later, with each idea at a URL like /dashboard/ideas/24.


0. Build rules
Mock only. One richly detailed example idea in lib/mock-ideas.ts (or a dedicated lib/idea-content/ file). No database yet.
URL pattern: /dashboard/ideas/[id] (e.g. /dashboard/ideas/24). Rename the route from idea/[id] to ideas/[id] to match.
Frontend, visual-first. The point is to SHOW the richness. Use real, specific content for the example idea — no lorem ipsum.
Plan gating (stub for now): mark which sections are Free vs Premium with a // TODO: gate by plan marker. Don't enforce yet — just show the structure. (Full plan logic discussed later.)
Build section by section, stop and show each.


1. What each idea contains (the sections)
Each idea is a structured journey, shown as tabs or stacked sections in this order. This replaces the thin "problem/solution/API" with a real product roadmap.
A. Overview (Free — the teaser)
Only Top 10 Ideas are free can see All Arxitechtures, but others are need to pay for Premium acsess

B. Market Analysis (Premium)
Who is the customer (the specific local business: shops, cafes, clinics…)
Market size / how many such businesses exist locally
Existing alternatives & why they fall short
Why now / the opportunity
A simple visual: market sizing or competitor comparison (chart)
- **The customer** — the specific local business and the person who'd pay
  (owner? manager?), described concretely.
- **Market sizing (TAM / SAM / SOM)** — total businesses of this type →
  realistically reachable → achievable year-one capture. Show the
  reasoning behind each number, not just the figure.
- **"How we estimated this"** — a short note on sources and which numbers
  are assumptions vs. data. Label assumptions honestly.
- **Positioning** — a simple comparison table or 2×2 showing existing
  alternatives and exactly where this idea fills the gap (e.g. local fit
  vs. price).
- **Demand signals** — real evidence: what owners say, what they pay today
  for workarounds, observed pain. (Sourced from customer interviews — the
  thing competitors can't fake.)
- **Why now** — what changed (smartphone penetration, Click/Payme, Telegram
  adoption) that makes this viable today.
- **Verdict** — an honest one-line call: is this market worth building for?
- **Visuals:** a TAM/SAM/SOM funnel + a positioning chart.


C. System Design (Medium) — the centerpiece
- **High-level architecture diagram** — client → API → DB → integrations,
  drawn visually. Clean boxes-and-arrows.
- **The data model (ER diagram)** — the core entities and their
  relationships, drawn as a proper entity-relationship visual. For most
  ideas this IS the heart of the system.
- **Request flow** — walk one key action end to end (e.g. "shop owner
  records a debt" → API → DB → confirmation → Telegram reminder), shown as
  a simple sequence so the builder sees how the pieces talk.
- **Key technical decisions + trade-offs** — for each major choice, the
  plain-language "why," and what the alternative would have cost. This is
  the expert layer ChatGPT won't give you.
- **The hard parts** — name the 1–2 genuinely tricky challenges in this
  system (e.g. notification reliability, offline use, handling money) and
  how to approach them.
- **How the architecture evolves** — what the MINIMAL v0 architecture is,
  and what gets added at v1/v2/v3 (e.g. "add a queue when notifications
  scale," "add caching when reads grow"). Ties directly to the Roadmap.
- **Scale & limits** — roughly how far this design holds before it needs
  rework (good enough to 1k users? 10k?).
- **Visuals:** architecture diagram + ER diagram + one request-flow
  sequence.


D. The 0→MVP Roadmap (Premium) — the thing they pay for
A clear, step-by-step path broken into versions:

A precise, build-ready path from nothing to a launched product, broken
into versions. The goal: the builder always knows the exact next move and
never has to guess.

For EACH version (v0, v1, v2, v3):
- **Goal** — one line: what this version proves or unlocks.
- **Build steps** — concrete, ordered, actionable. Each step is a thing
  you can start now, not a category. (Bad: "set up auth." Good: "add phone-
  OTP login via Supabase Auth; store shop profile on first login.")
- **Done when** — the finish line for this version, so the builder knows
  when to ship and move on.
- **Rough effort** — a realistic time estimate (e.g. "v1 ≈ 1 week solo").
- **Skip for now** — what NOT to build yet, and why. (Scope discipline is
  the most valuable guidance here.)
- **Ties to** — references the relevant entities (from System Design) and
  tools (from Tech Stack), so the roadmap is a path through the whole idea.

Version intent:
- **v0 — Foundation:** auth, data model, base screens. Goal: a logged-in
  user sees an empty but real app.
- **v1 — Core MVP:** the ONE must-have feature, fully specified. Goal: the
  single thing that makes this useful, working end to end. Ship this to
  first users.
- **v2 — Sellable:** the 2–3 features that make someone pay. Goal: worth
  money, not just worth using.
- **v3 — Growth:** what to add once it has paying users (reports, scale,
  multi-user). Goal: retain and expand.

- **First move** — call out the literal first thing to do today (so there's
  zero "where do I start" friction).
- **Visual:** a roadmap timeline showing v0→v3 with each version's goal,
  effort, and "done when" — not a wall of text.


E. Design & Screens (Medium)


- **Key screens breakdown** — the essential screens (login, main dashboard,
  the core action flow), each with what's on it and why. Wireframe-level,
  not pixel-perfect.
- **The critical user flow** — the ONE path that must be effortless (e.g.
  "record a debt" or "mark attendance"), mapped tap-by-tap. Show the
  shortest possible path and defend it.
- **Local UX decisions** — design calls specific to THIS user and market:
  - device reality (cheap Android, small screens, one-handed use)
  - literacy / tech-comfort (big targets, icons + words, minimal typing,
    numbers not text where possible)
  - language (UZ/RU/EN, right-to-left considerations if any, number/date
    formats)
  - offline / poor-connection handling if relevant
- **What to keep OFF the screen** — the features/clutter to resist, so the
  core action stays instant. (Restraint = usability here.)
- **Look & feel** — a short, concrete direction (tone, color logic,
  typography intent) — enough to brief a designer or guide an AI tool, not
  a full brand system.
- **Note:** wireframes + described flows for now. Actual Figma files are a
  later add-on, not part of the core idea.
- **Visuals:** simple wireframes of the key screens + a tap-by-tap flow
  diagram of the critical action.


F. Business & Pricing (Medium)
### F. Business & Pricing (Premium)


- **Monetization model** — the recommended model (subscription / per-seat /
  one-time) and WHY it fits this customer's behavior, not just a list.
- **Willingness to pay** — anchor pricing to the pain: what does the
  problem cost the customer today (lost debts, wasted hours, missed
  bookings)? Price as a fraction of that pain, so it's an easy yes.
- **Suggested pricing** — concrete local price points (in so'm), with the
  reasoning and a tier structure if relevant. State what it's anchored to.
- **Local payment reality** — how money actually changes hands here:
  Click / Payme / cash / bank transfer, and the friction of each.
- **Unit economics** — cost vs. revenue per customer, with EVERY assumption
  labeled (acquisition cost, monthly cost to serve, expected churn). Show
  the math, not just the conclusion.
- **"How we estimated this"** — flag which numbers are data vs. assumptions.
  Honesty here = credibility.
- **Path to profitability** — roughly how many paying customers to break
  even, and how long that realistically takes.
- **Go-to-market** — how to reach the FIRST 10 paying customers in this
  specific market (channels, who to talk to, what to say). The hardest part,
  and the most valuable.
- **Verdict** — honest one-liner: is the money here real and reachable?
- **Visuals:** a break-even chart (customers → profitability) + a simple
  price-anchoring visual (cost of pain vs. price).
A chart (revenue/cost over time)




G— Tech Stack & Tools (Medium)
Purpose: For each idea, give the builder a complete, opinionated technology recommendation — so they don't waste days choosing tools. This is the "what to build it with" answer: language, database, frameworks, open-source libraries, services, and dev tools. Like the rest of the idea, the VALUE is the curated, justified choice (not a generic list anyone could google).
What this section contains
For the specific idea, recommend a concrete stack across these layers. Each pick includes a one-line "why" (why this fits THIS idea + the local market), not just a name.
Language(s) — primary language(s) for frontend and backend (e.g. TypeScript for both).
Frontend framework — e.g. Next.js / React Native (if mobile-first), with a reason.
Backend / API — framework or approach (e.g. Next.js API routes, Node + Express, or serverless functions).
Database — the DB choice (e.g. PostgreSQL via Supabase, or SQLite for offline-first), with why it fits the data shape.
Auth — how users log in (e.g. Supabase Auth, Clerk, or phone-OTP — important for the local market where phone > email).
Open-source libraries — the key libraries that save real time for this idea (e.g. a table/grid lib, a charting lib, a PDF/export lib, a date lib). List 3–6, each with what it's for.
Integrations — local services this idea needs (e.g. Click / Payme for payments, Telegram Bot API for notifications, SMS gateway).
Hosting / deploy — where it runs (e.g. Vercel for web, Supabase for DB, a cheap VPS if needed) + rough cost.
Dev tools — what speeds up building (e.g. the IDE/agent, a UI kit like shadcn/ui, an ORM like Prisma/Drizzle, a design tool like Figma).
Estimated monthly running cost — a realistic figure at MVP scale (free tier vs paid), so the builder knows the real overhead.
Database schema and API endpoints — present, but framed as a reference, NOT the headline. Make clear in copy that this is the easy part; the value above is the thinking.
Copy-as-JSON available here.

Order of importance (reflect this in the UI emphasis): Roadmap (D) + System Design (C) + Market (B) are the stars. DB/API (G) is a footnote, intentionally last and understated.
Display in the UI
Render as a clean stack list grouped by layer (Language → Frontend → Backend → Database → Auth → Libraries → Integrations → Hosting → Tools), each row showing the tool name + its one-line "why".
Optionally a small "stack at a glance" badge row at the top (the 4–5 headline choices) before the detailed list.
Keep it skimmable — a builder should grasp the whole stack in 15 seconds, then read the "why"s if they want.
Mark Premium with // TODO: gate by plan.
Mock data shape (add to the idea object)
techStack: {
  glance: string[],            // ["TypeScript", "Next.js", "Supabase", "Telegram Bot API"]
  layers: [
    { layer: string,           // e.g. "Database"
      choice: string,          // e.g. "PostgreSQL (Supabase)"
      why: string }            // e.g. "Relational debt/payment data + free tier + built-in auth"
  ],
  integrations: string[],      // ["Click / Payme", "Telegram Bot API"]
  monthlyCost: string,         // e.g. "$0 at MVP (free tiers), ~$25/mo at scale"
}

Example (for the Nasiya idea — fill it like this)
Glance: TypeScript · Next.js · Supabase · Telegram Bot API
Language: TypeScript — one language across frontend + backend, fewer context switches.
Frontend: Next.js (mobile-first PWA) — shop owners use phones; a PWA avoids app-store friction.
Backend: Next.js API routes — no separate server to manage at MVP scale.
Database: PostgreSQL via Supabase — relational data (shops → customers → debts → payments) + free tier.
Auth: Supabase Auth with phone OTP — local shop owners trust phone numbers over email.
Libraries: TanStack Table (debt lists), Recharts (simple totals chart), date-fns (due dates), zod (validation).
Integrations: Telegram Bot API (debt reminders), Click/Payme (later, for collecting subscription).
Hosting: Vercel (web) + Supabase (DB) — both have free tiers.
Dev tools: shadcn/ui (UI components), Drizzle ORM (type-safe DB access), Figma (screens).
Monthly cost: $0 at MVP on free tiers; ~$25/mo once past Supabase/Vercel free limits.
Done checklist (for this section)
[ ] Section H added to the tab bar (after Business, before Reference — or wherever fits the flow).
[ ] Stack grouped by layer, each with a one-line "why".
[ ] "Stack at a glance" badge row present.
[ ] Integrations + monthly cost shown.
[ ] Nasiya example fully filled.
[ ] Premium-gated (// TODO: gate by plan).



2. The detail page UI (/dashboard/ideas/[id])
┌──────────────────────────────────────────────────┐

│ ← Back to ideas                                    │

│ [Sector] [Stack] [PRO]          [Save] [Copy JSON] │

│ Idea Name (large serif)                            │

│ One-line hook                                      │

├──────────────────────────────────────────────────┤

│ TABS:  Overview · Market · System Design ·         │

│        Roadmap · Design · Business · Reference     │

├──────────────────────────────────────────────────┤

│                                                    │

│   [Active section content — visual-rich]           │

│                                                    │

└──────────────────────────────────────────────────┘

Visual-first sections: Market, System Design, Roadmap, and Business each lead with a visual (chart / diagram / timeline) rendered in-app (use a charting/diagram approach — e.g. simple SVG/React diagrams, or a lib like Recharts for charts and a custom layout for the architecture/roadmap). Text supports the visual, not the other way around.
Free vs Premium: Overview is fully visible. The premium sections show a blurred/locked preview with an "Unlock with Pro" state (stub for now, // TODO: gate by plan). The preview should reveal enough to make the user want it (e.g. show the roadmap has v0–v3, but lock the details).
The "what you'll get" list in Overview is the conversion driver — it lists every premium section so the visitor understands the depth they're paying for.


3. Example idea to build fully (use this as the showcase)
Build ONE idea completely so we can judge the experience. Suggested: Nasiya (the credit/debt ledger for small shops) — it's the most relatable. Fill EVERY section with real, specific, thoughtful content:

Overview: the paper-notebook problem, the digital solution, + "what you'll get" list.
Market: how many small shops run informal credit, why the paper notebook fails, no real local competitor.
System Design: a diagram — phone app → API → database → Telegram notifications. Entities: shops, customers, debts, payments.
Roadmap: v0 (auth + shop setup) → v1 (add customer, record debt, see list) → v2 (mark paid, Telegram reminder) → v3 (reports, multi-staff), as a visual timeline.
Design: wireframes of the 3 key screens.
Business: price ~30–50k so'm/mo, who pays, when it's profitable, a small revenue chart.
Reference: the DB schema + API, understated, with Copy JSON.

Make this example genuinely impressive — it's the proof of the whole product. If THIS idea makes someone think "I'd pay for that," the model works.


4. Mock data shape (extend the existing idea type)
{

  id: string,              // "24" → URL /dashboard/ideas/24

  name: string,

  sector: string,

  stack: string,

  minPlan: 'free' | 'pro' | 'team',

  hook: string,            // one-liner

  overview: { problem, solution, whatYouGet: string[] },

  market: { customer, size, alternatives, opportunity, chartData },

  systemDesign: { summary, entities, diagram },   // diagram = structured data to render

  roadmap: { v0, v1, v2, v3 },                    // each = { title, steps: string[] }

  design: { screens: [{ name, description }] },

  business: { model, pricing, unitEconomics, chartData },

  reference: { dbSchema: object, apiEndpoints: object },  // understated

  isTrending?: boolean,

  isNew?: boolean,

}


5. Build order (stop after each)
Route + page shell at /dashboard/ideas/[id] with header (name, tags, Save, Copy JSON) and the tab bar. 🛑 Show it.
Overview tab (free) with the "what you'll get" list. 🛑 Show it.
Roadmap tab as a visual v0→v3 timeline (the centerpiece). 🛑 Show it.
System Design tab with an architecture diagram. 🛑 Show it.
Market + Business tabs with charts. 🛑 Show it.
Design tab (wireframes) + Reference tab (understated DB/API + Copy JSON). 🛑 Show it.
Locked-preview state for premium tabs (blur + "Unlock with Pro", // TODO: gate by plan). 🛑 Show it.


6. Done checklist
URL is /dashboard/ideas/[id] (e.g. /dashboard/ideas/24).
Tabs: Overview · Market · System Design · Roadmap · Design · Business · Reference.
Roadmap shown as a visual v0→v3 timeline, not plain text.
System Design shown as a real diagram.
Market & Business lead with charts.
DB/API is present but intentionally understated (last tab).
Overview has a "what you'll get" list that sells the premium depth.
Premium sections show a tempting locked preview (// TODO: gate by plan).
One example idea (Nasiya) is fully, impressively filled in.
Visual style matches the re-skinned dashboard.

🛑 Mock first. If the experience feels worth paying for, we wire it to a database next, with real ideas.

