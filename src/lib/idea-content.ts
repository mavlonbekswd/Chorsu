// Rich, build-ready content for an idea's detail page (/dashboard/ideas/[id]).
// Frontend-only mock for now — see chorsu-idea-architecture.md. The VALUE is the
// thought-through 0→MVP journey, not the raw schema. One idea (Nasiya) is fully
// authored as the showcase; others fall back to the thin catalog fields.
// Content is localized — one full IdeaContent per language, keyed in CONTENT.

import type { Lang } from "@/lib/i18n";

export type Tier = "free" | "premium"; // section gating intent

// ── Market ────────────────────────────────────────────────────────────────
export type FunnelStage = { label: string; value: string; sub: string };
export type PositioningRow = { name: string; localFit: 1 | 2 | 3; simplicity: 1 | 2 | 3; gap: string };

export type MarketContent = {
  customer: string;
  sizing: FunnelStage[]; // TAM → SAM → SOM
  howEstimated: string;
  positioning: PositioningRow[];
  demandSignals: string[];
  whyNow: string[];
  verdict: string;
};

// ── System design ───────────────────────────────────────────────────────────
export type ArchNode = { id: string; label: string; kind: "client" | "api" | "data" | "external" };
export type ArchEdge = { from: string; to: string; label?: string };
export type Entity = { name: string; fields: string[]; note?: string };
export type Relation = { from: string; to: string; label: string };
export type FlowStep = { actor: string; to: string; message: string };
export type Decision = { choice: string; why: string; alternative: string };
export type HardPart = { title: string; approach: string };
export type EvolutionStep = { version: string; adds: string };

export type SystemDesignContent = {
  summary: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
  entities: Entity[];
  relations: Relation[];
  requestFlow: { title: string; steps: FlowStep[] };
  decisions: Decision[];
  hardParts: HardPart[];
  evolution: EvolutionStep[];
  scale: string;
};

// ── Roadmap ─────────────────────────────────────────────────────────────────
export type RoadmapVersion = {
  id: "v0" | "v1" | "v2" | "v3";
  title: string;
  goal: string;
  steps: string[];
  doneWhen: string;
  effort: string;
  skip: string;
  tiesTo: string;
};
export type RoadmapContent = { firstMove: string; versions: RoadmapVersion[] };

// ── Design ──────────────────────────────────────────────────────────────────
export type Screen = { name: string; whatsOnIt: string; why: string; elements: string[] };
export type DesignContent = {
  screens: Screen[];
  criticalFlow: { title: string; taps: string[] };
  localUx: { label: string; detail: string }[];
  keepOff: string[];
  lookAndFeel: string;
};

// ── Business ────────────────────────────────────────────────────────────────
export type PriceTier = { name: string; price: string; note: string };
export type EconRow = { label: string; value: string; kind: "data" | "assumption" };
export type BreakevenPoint = { month: string; revenue: number; cost: number };
export type BusinessContent = {
  model: string;
  willingnessToPay: string;
  painCost: string; // anchor: what the problem costs today
  pricing: PriceTier[];
  payment: string;
  unitEconomics: EconRow[];
  howEstimated: string;
  pathToProfit: string;
  gtm: string[];
  verdict: string;
  breakeven: BreakevenPoint[];
};

// ── Tech stack ───────────────────────────────────────────────────────────────
export type StackLayer = { layer: string; choice: string; why: string };
export type TechStackContent = {
  glance: string[];
  layers: StackLayer[];
  integrations: string[];
  monthlyCost: string;
};

export type IdeaContent = {
  id: string;
  hook: string;
  overview: { problem: string; solution: string; whatYouGet: string[] };
  market: MarketContent;
  systemDesign: SystemDesignContent;
  roadmap: RoadmapContent;
  design: DesignContent;
  business: BusinessContent;
  techStack: TechStackContent;
};

// Which sections are free vs premium. // TODO: gate by plan — not enforced yet.
export const SECTION_TIER: Record<string, Tier> = {
  overview: "free",
  market: "premium",
  system: "premium",
  roadmap: "premium",
  design: "premium",
  business: "premium",
  tech: "premium",
  reference: "premium",
};

// ───────────────────────────────────────────────────────────────────────────
// The showcase idea, fully authored. If THIS makes someone think "I'd pay for
// that," the model works.
// ───────────────────────────────────────────────────────────────────────────
const nasiyaEn: IdeaContent = {
  id: "nasiya",
  hook: "Retire the paper debt notebook. A two-tap credit ledger that never gets wet, never forgets, and reminds customers for you.",

  overview: {
    problem:
      "Walk into any mahalla shop and you'll find a daftar — a paper notebook where the owner records who bought on credit (nasiya). Pages get wet, names blur, and every month a dispute starts with \"I already paid you.\" The owner has no idea, at a glance, who is overdue or how much of their cash is frozen in other people's pockets. When the shop changes hands, the memory in that notebook walks out the door.",
    solution:
      "A phone-first ledger built for one thumb. Add a customer once; record a credit sale or a repayment in two taps; every customer carries a running balance and a full history. One tap sends a polite reminder over Telegram or SMS in Uzbek or Russian. The home screen shows total outstanding, who's overdue, and what came in today — the same daftar, but one that can add, never forgets, and chases debts while the owner serves the next customer.",
    whatYouGet: [
      "Market analysis — who pays, how many shops there are, and why no real competitor owns this yet",
      "System design — architecture + data model + the one tricky part (reminder reliability) solved",
      "0→MVP roadmap — a build-ready v0→v3 path; you always know the exact next move",
      "Design & screens — wireframes of the 3 key screens + the two-tap 'record a debt' flow",
      "Business & pricing — concrete so'm price points anchored to the pain, unit economics, and how to land the first 10 paying shops",
      "Tech stack — an opinionated, justified stack so you don't lose days choosing tools",
      "Reference — the full DB schema + API, copy-as-JSON (the easy part, kept last)",
    ],
  },

  market: {
    customer:
      "The owner of a single mahalla shop (oziq-ovqat / produkti) — the person standing behind the counter, usually 30–55, who already extends credit to 20–60 regulars and feels the pain of the daftar personally. They are the buyer and the user. Not chains, not supermarkets: the independent corner shop where the owner knows customers by name.",
    sizing: [
      { label: "TAM", value: "~210,000", sub: "Registered small retail / grocery outlets across Uzbekistan that plausibly sell on credit." },
      { label: "SAM", value: "~70,000", sub: "Owners with a smartphone who actively run a nasiya book — the realistically reachable slice." },
      { label: "SOM", value: "~2,500", sub: "Year-one target: shops reachable shop-to-shop in Tashkent + 3 regional cities via word of mouth." },
    ],
    howEstimated:
      "TAM is anchored to official retail-outlet counts (data). The share that sells on credit (~70%) and smartphone ownership among owners (~85%+) are assumptions from customer interviews and regional smartphone-penetration reports — labelled as assumptions, not facts. SOM is deliberately conservative: what one founder can reach by foot and referral in 12 months, not a top-down 1% fantasy.",
    positioning: [
      { name: "Paper daftar", localFit: 3, simplicity: 3, gap: "Free and trusted, but can't add, remind, or survive a spill. The real competitor." },
      { name: "Excel / notes app", localFit: 1, simplicity: 1, gap: "Too fiddly for a busy counter; no reminders; owners abandon it in a week." },
      { name: "Full POS systems", localFit: 1, simplicity: 1, gap: "Built for inventory + receipts, priced and shaped for supermarkets — overkill, costly." },
      { name: "Nasiya (this)", localFit: 3, simplicity: 3, gap: "The gap: as fast as paper, but it sums, remembers, and reminds — in Uzbek, on a cheap phone." },
    ],
    demandSignals: [
      "In interviews, owners describe re-copying a soaked daftar by hand and still losing money to \"I paid you\" disputes.",
      "Several already photograph notebook pages or keep a messy Excel — proof the pain is real enough to improvise around.",
      "The implicit price of the problem is concrete: owners name specific debts (200k–2M so'm) they wrote off because they couldn't prove or chase them.",
      "Reminders are the magic moment in demos — owners light up at \"it texts the customer for me,\" the thing they hate doing face to face.",
    ],
    whyNow: [
      "Smartphones are now standard even for older shop owners — the device barrier is gone.",
      "Telegram is the default channel; a reminder over Telegram feels normal, not spammy.",
      "Click and Payme made digital money everyday, so an owner trusts a phone app with money matters.",
    ],
    verdict:
      "Worth building. The pain is universal, named, and currently 'solved' by a notebook that everyone admits fails — a wide-open gap with the only serious competitor being paper.",
  },

  systemDesign: {
    summary:
      "A thin, boring, reliable stack: a phone-first PWA talks to Next.js API routes backed by Postgres. A background worker handles the one thing that must never silently fail — sending reminders. Nothing here is novel; the craft is in the data model and in making notifications trustworthy.",
    nodes: [
      { id: "pwa", label: "Phone PWA\n(shop owner)", kind: "client" },
      { id: "api", label: "Next.js API\nroutes", kind: "api" },
      { id: "db", label: "PostgreSQL\n(Supabase)", kind: "data" },
      { id: "worker", label: "Reminder\nworker / queue", kind: "api" },
      { id: "tg", label: "Telegram\nBot API", kind: "external" },
      { id: "sms", label: "SMS gateway\n(fallback)", kind: "external" },
    ],
    edges: [
      { from: "pwa", to: "api", label: "HTTPS / JSON" },
      { from: "api", to: "db", label: "SQL" },
      { from: "api", to: "worker", label: "enqueue reminder" },
      { from: "worker", to: "tg", label: "send" },
      { from: "worker", to: "sms", label: "fallback" },
      { from: "worker", to: "db", label: "log delivery" },
    ],
    entities: [
      { name: "shops", fields: ["id", "owner_phone", "name", "created_at"], note: "one per owner" },
      { name: "customers", fields: ["id", "shop_id →", "name", "phone", "balance"], note: "balance is cached" },
      { name: "ledger_entries", fields: ["id", "customer_id →", "type (credit/repayment)", "amount", "created_at"], note: "source of truth" },
      { name: "reminders", fields: ["id", "customer_id →", "channel", "status", "sent_at"], note: "delivery log" },
    ],
    relations: [
      { from: "shops", to: "customers", label: "1 → many" },
      { from: "customers", to: "ledger_entries", label: "1 → many" },
      { from: "customers", to: "reminders", label: "1 → many" },
    ],
    requestFlow: {
      title: "Shop owner records a credit sale, then sends a reminder",
      steps: [
        { actor: "Owner", to: "PWA", message: "Taps customer → 'Add debt' → 50,000" },
        { actor: "PWA", to: "API", message: "POST /entries { type: credit, amount }" },
        { actor: "API", to: "DB", message: "INSERT entry, UPDATE cached balance (one txn)" },
        { actor: "DB", to: "API", message: "new balance: 50,000" },
        { actor: "API", to: "PWA", message: "200 — UI shows updated balance instantly" },
        { actor: "Owner", to: "PWA", message: "Later: taps 'Remind'" },
        { actor: "API", to: "Worker", message: "enqueue reminder job" },
        { actor: "Worker", to: "Telegram", message: "send message; on fail → SMS; log result" },
      ],
    },
    decisions: [
      {
        choice: "Append-only ledger_entries as the source of truth; balance is a cached column.",
        why: "Money needs an audit trail — you must be able to prove every change when a customer disputes. Caching the balance keeps the list fast.",
        alternative: "Storing only a running balance would be simpler but you could never reconstruct history or settle a dispute — fatal for a debt app.",
      },
      {
        choice: "PWA, not a native app-store app.",
        why: "Owners install nothing, you ship updates instantly, and there's no review friction or store cut. A debt ledger doesn't need native APIs.",
        alternative: "A native app means store accounts, review delays, and a download step that kills shop-to-shop adoption.",
      },
      {
        choice: "Phone-OTP auth, no passwords or email.",
        why: "Shop owners trust and remember phone numbers; email is rare and abandoned. OTP matches how every other app they use logs in.",
        alternative: "Email+password adds a field they'll mistype and a reset flow they'll never complete.",
      },
      {
        choice: "Reminders go through a queue/worker, not inline in the request.",
        why: "Telegram can be slow or down; the owner's tap must return instantly and the send must retry without blocking the UI.",
        alternative: "Sending inline would freeze the screen and lose the reminder if the API call times out.",
      },
    ],
    hardParts: [
      {
        title: "Reminder reliability",
        approach:
          "Treat every reminder as a durable job with explicit states (queued → sent → failed). Retry with backoff, fall back from Telegram to SMS, and always log the outcome so the owner can see 'delivered' vs 'failed'. Never fire-and-forget money-related messages.",
      },
      {
        title: "Balance integrity under bad connections",
        approach:
          "Write the entry and update the cached balance in a single transaction, and make the write idempotent (client-generated entry id) so a retried tap on a flaky 3G connection can't double-charge a customer.",
      },
    ],
    evolution: [
      { version: "v0", adds: "PWA + API + Postgres. No worker yet — reminders are manual share-links." },
      { version: "v1", adds: "Add the reminder worker + Telegram Bot API once 'remind' becomes one-tap." },
      { version: "v2", adds: "Add SMS fallback + delivery log; add a lightweight queue when reminder volume grows." },
      { version: "v3", adds: "Add read replicas / caching for reports, and roles when shops add staff." },
    ],
    scale:
      "This design comfortably holds to ~10,000 shops on a single Postgres instance — the data is tiny (text + numbers) and writes are low-frequency. The first thing to outgrow is the reminder worker, which is why it's isolated early. You'd rework nothing else before that.",
  },

  roadmap: {
    firstMove:
      "Today: scaffold the Next.js app and wire Supabase phone-OTP login. The moment you can log in and see an empty shop, the whole path opens up.",
    versions: [
      {
        id: "v0",
        title: "Foundation",
        goal: "A logged-in owner sees their own empty but real shop.",
        steps: [
          "Create the Next.js (PWA) app and deploy a blank shell to Vercel.",
          "Add phone-OTP login via Supabase Auth; create a shop row on first login.",
          "Create the schema: shops, customers, ledger_entries.",
          "Build the empty home screen (total outstanding = 0) and an empty customer list.",
        ],
        doneWhen: "You can log in with a phone number and land on your own empty dashboard.",
        effort: "≈ 3–4 days solo",
        skip: "No reminders, no reports, no multi-staff. Don't theme it yet — prove the spine first.",
        tiesTo: "Entities: shops, customers · Stack: Next.js, Supabase Auth",
      },
      {
        id: "v1",
        title: "Core MVP",
        goal: "The one must-have: record a debt and see who owes what. Ship to first shops.",
        steps: [
          "Add a customer (name + phone) in one screen.",
          "Record a credit sale in two taps: pick customer → enter amount.",
          "Record a repayment the same way; balance updates in one transaction.",
          "Customer list sorted by outstanding balance; tap one to see full history.",
          "Home screen shows total outstanding across all customers.",
        ],
        doneWhen: "An owner can replace their paper daftar end to end for one day of trading.",
        effort: "≈ 1 week solo",
        skip: "Still no automated reminders — let owners message manually for now. No exports.",
        tiesTo: "Entities: ledger_entries · Flow: 'record a credit sale' · Stack: TanStack Table, zod",
      },
      {
        id: "v2",
        title: "Sellable",
        goal: "The features that make an owner pay: reminders + overdue clarity.",
        steps: [
          "One-tap reminder over Telegram (Bot API) in Uzbek/Russian.",
          "Add the reminder worker + delivery log (sent / failed).",
          "SMS fallback when the customer has no Telegram.",
          "Mark accounts overdue after N days; surface an 'Overdue' list on home.",
          "Add the Pro paywall stub (// TODO: gate by plan) around reminders.",
        ],
        doneWhen: "An owner sends a debt reminder without typing it, and sees it was delivered.",
        effort: "≈ 1.5 weeks solo",
        skip: "No multi-staff, no analytics dashboards. Resist building reports here.",
        tiesTo: "Hard part: reminder reliability · Integrations: Telegram Bot API, SMS",
      },
      {
        id: "v3",
        title: "Growth",
        goal: "Retain and expand once shops are paying.",
        steps: [
          "Monthly summary: total lent, collected, written off.",
          "Multiple staff per shop with roles (owner vs assistant).",
          "Export ledger to PDF/Excel for the owner's records.",
          "Collect subscription via Click/Payme inside the app.",
        ],
        doneWhen: "A paying shop has a reason to stay past month three.",
        effort: "≈ 2–3 weeks solo",
        skip: "No multi-shop chains or franchise features until single shops clearly retain.",
        tiesTo: "Evolution: read replicas, roles · Integrations: Click/Payme",
      },
    ],
  },

  design: {
    screens: [
      {
        name: "Home (dashboard)",
        whatsOnIt: "One big number — total outstanding — then today's repayments and an Overdue list.",
        why: "The owner's first question every morning is 'how much is out there?'. Answer it before anything else.",
        elements: ["Total outstanding (large)", "Today's repayments", "Overdue customers", "+ Add customer button"],
      },
      {
        name: "Customer detail",
        whatsOnIt: "The customer's running balance, a history of credits/repayments, and two fat buttons.",
        why: "This is the screen the owner opens at the counter — balance and history must be glanceable, actions thumb-sized.",
        elements: ["Name + balance", "Entry history list", "Add debt", "Record payment", "Remind"],
      },
      {
        name: "Record debt (sheet)",
        whatsOnIt: "A number pad and a confirm — nothing else.",
        why: "The most-used action in the app. It must be two taps and survive a busy, one-handed moment.",
        elements: ["Amount (number pad)", "Optional note", "Confirm"],
      },
    ],
    criticalFlow: {
      title: "Record a credit sale (the action that must be effortless)",
      taps: [
        "Tap the customer's name in the list",
        "Tap 'Add debt'",
        "Type the amount on the number pad",
        "Tap Confirm — balance updates, back to the list",
      ],
    },
    localUx: [
      { label: "Device reality", detail: "Built for a cheap Android on 3G: large tap targets, minimal images, instant optimistic updates so a flaky connection never blocks a sale." },
      { label: "Literacy & comfort", detail: "Numbers over text, icons paired with words, almost no typing — the core action is a number pad, not a form." },
      { label: "Language", detail: "Uzbek (Latin) and Russian throughout, including the reminder message templates. So'm formatting with spaces (50 000), not decimals." },
      { label: "Trust", detail: "Every balance change is visible in history — the owner can always show a customer exactly when and how much, which kills disputes." },
    ],
    keepOff: [
      "Inventory / product catalog — this is a debt book, not a POS.",
      "Charts and analytics on the home screen — the one number is enough.",
      "Multi-currency, tax, receipts — irrelevant to a mahalla credit book.",
      "Social / customer-facing accounts — only the owner logs in at MVP.",
    ],
    lookAndFeel:
      "Calm, trustworthy, money-serious but friendly. One warm accent for positive (repayment) and a muted alert tone for overdue. Big readable numerals, generous spacing, almost no chrome — it should feel like a cleaner daftar, not a fintech dashboard.",
  },

  business: {
    model:
      "Monthly subscription per shop. It fits because the value is recurring (every day of trading creates debts to track) and owners already think in monthly terms for rent and utilities. Not per-seat (one owner) and not one-time (the reminders cost you money to send).",
    willingnessToPay:
      "Anchor the price to the pain, not to your costs. An owner who writes off even one 100,000 so'm debt a month because they couldn't prove or chase it is losing far more than a subscription. Price as a small fraction of a single recovered debt, so saying yes is obvious.",
    painCost:
      "Owners report writing off 100,000–500,000 so'm/month in unrecoverable or disputed nasiya. A ~40,000 so'm/mo subscription is under half of the smallest of those — it pays for itself by recovering one debt.",
    pricing: [
      { name: "Free", price: "0 so'm", note: "One shop, up to 30 customers, manual reminders. The on-ramp off paper." },
      { name: "Pro", price: "~40,000 so'm/mo", note: "Unlimited customers, one-tap Telegram/SMS reminders, overdue list." },
      { name: "Plus", price: "~70,000 so'm/mo", note: "Adds staff accounts, monthly reports, and PDF/Excel export." },
    ],
    payment:
      "Collect via Click or Payme — both are everyday and trusted. Cash/bank transfer works for the first hand-sold customers but doesn't scale; wire Click/Payme in by v3. Friction: owners are comfortable paying via Click monthly, the same way they top up phone or utilities.",
    unitEconomics: [
      { label: "Price per Pro shop", value: "40,000 so'm/mo", kind: "data" },
      { label: "Reminder cost (Telegram)", value: "≈ 0 so'm", kind: "data" },
      { label: "Reminder cost (SMS fallback)", value: "~50 so'm each, ~30/mo", kind: "assumption" },
      { label: "Payment processing", value: "~2% via Click/Payme", kind: "assumption" },
      { label: "Cost to serve / shop", value: "~3,000 so'm/mo", kind: "assumption" },
      { label: "Gross margin / Pro shop", value: "~90%", kind: "assumption" },
    ],
    howEstimated:
      "Price and Telegram cost are real. SMS volume, processing rate, and cost-to-serve are assumptions from comparable apps — treat them as the honest guesses they are until you have 50 paying shops.",
    pathToProfit:
      "At a near-zero marginal cost per shop, break-even is about covering one founder's modest monthly burn — roughly 150–250 paying Pro shops. That's reachable inside year one given the SOM, and realistically takes 6–9 months of shop-to-shop selling.",
    gtm: [
      "Walk one bazaar/mahalla on foot. Demo the 'remind' feature to 10 owners on their own phone — that moment sells it.",
      "Sign up the first shops free, in person, and set up their first 5 customers for them so the daftar is already half-replaced.",
      "Let referral do the work: every owner knows a dozen others on the same street with the same soaked notebook.",
      "Seed Telegram shop-owner groups with a short demo video in Uzbek showing two-tap debt entry.",
    ],
    verdict:
      "The money is real and reachable. Near-zero serving cost, a price anchored well below the monthly pain, and a customer who can be reached on foot — a healthy, if unglamorous, business.",
    breakeven: [
      { month: "M1", revenue: 10, cost: 80 },
      { month: "M2", revenue: 24, cost: 82 },
      { month: "M3", revenue: 45, cost: 85 },
      { month: "M4", revenue: 72, cost: 88 },
      { month: "M5", revenue: 96, cost: 92 },
      { month: "M6", revenue: 130, cost: 100 },
      { month: "M7", revenue: 168, cost: 108 },
      { month: "M8", revenue: 210, cost: 116 },
    ],
  },

  techStack: {
    glance: ["TypeScript", "Next.js (PWA)", "Supabase", "Telegram Bot API"],
    layers: [
      { layer: "Language", choice: "TypeScript", why: "One language across frontend + backend — fewer context switches for a solo builder." },
      { layer: "Frontend", choice: "Next.js (mobile-first PWA)", why: "Shop owners use phones; a PWA avoids app-store friction and installs in one tap." },
      { layer: "Backend", choice: "Next.js API routes", why: "No separate server to run at MVP scale; collocated with the frontend." },
      { layer: "Database", choice: "PostgreSQL via Supabase", why: "Relational data (shops → customers → entries) fits perfectly; generous free tier." },
      { layer: "Auth", choice: "Supabase Auth — phone OTP", why: "Owners trust phone numbers over email; matches how they log into everything else." },
      { layer: "Libraries", choice: "TanStack Table · Recharts · date-fns · zod", why: "Debt lists, the totals chart, due dates, and input validation — each saves real days." },
      { layer: "Integrations", choice: "Telegram Bot API · Click/Payme", why: "Reminders over the channel owners already live in; local payment rails they trust." },
      { layer: "Hosting", choice: "Vercel (web) + Supabase (DB)", why: "Both have free tiers that carry you well past the first hundred shops." },
      { layer: "Dev tools", choice: "shadcn/ui · Drizzle ORM · Figma", why: "Fast accessible components, type-safe DB access, and a place to sketch the 3 screens." },
    ],
    integrations: ["Telegram Bot API (reminders)", "Click / Payme (subscriptions)", "SMS gateway (fallback)"],
    monthlyCost: "$0 at MVP on free tiers; ~$25/mo once past Supabase/Vercel free limits.",
  },
};

const CONTENT: Record<string, IdeaContent> = { nasiya };

export function getIdeaContent(id: string): IdeaContent | undefined {
  return CONTENT[id];
}
