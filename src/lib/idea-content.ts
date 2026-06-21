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

const nasiyaRu: IdeaContent = {
  id: "nasiya",
  hook: "Похороните бумажную тетрадь долгов. Книга долгов в два касания: не намокнет, ничего не забудет и сама напомнит клиенту.",

  overview: {
    problem:
      "Зайдите в любой махаллинский магазин — и вы найдёте дафтар, бумажную тетрадь, где владелец записывает, кто взял в долг (насия). Страницы намокают, имена расплываются, и каждый месяц спор начинается с «я уже тебе заплатил». Владелец не видит с одного взгляда, кто просрочил и сколько его денег заморожено в чужих карманах. Когда магазин меняет хозяина, память тетради уходит вместе с ней.",
    solution:
      "Книга долгов в телефоне, под один большой палец. Добавьте клиента один раз; запишите продажу в долг или платёж в два касания; у каждого клиента — текущий баланс и полная история. Одно касание отправляет вежливое напоминание в Telegram или по SMS на узбекском или русском. Главный экран показывает общий долг, кто просрочил и что поступило сегодня — тот же дафтар, только умеющий считать, ничего не забывающий и взыскивающий долги, пока владелец обслуживает следующего покупателя.",
    whatYouGet: [
      "Анализ рынка — кто платит, сколько таких магазинов и почему этим до сих пор никто всерьёз не занял",
      "Системный дизайн — архитектура + модель данных + решённая единственная сложная часть (надёжность напоминаний)",
      "Дорожная карта 0→MVP — готовый к сборке путь v0→v3; вы всегда знаете точный следующий шаг",
      "Дизайн и экраны — вайрфреймы 3 ключевых экранов + поток «записать долг» в два касания",
      "Бизнес и цены — конкретные цены в сумах, привязанные к боли, юнит-экономика и как заполучить первые 10 платящих магазинов",
      "Технологический стек — продуманный, обоснованный стек, чтобы не терять дни на выбор инструментов",
      "Справочник — полная схема БД + API, копирование в JSON (самое простое, оставлено напоследок)",
    ],
  },

  market: {
    customer:
      "Владелец одного махаллинского магазина (oziq-ovqat / продукты) — человек за прилавком, обычно 30–55 лет, который уже даёт в долг 20–60 постоянным клиентам и лично чувствует боль дафтара. Он и покупатель, и пользователь. Не сети и не супермаркеты: независимый магазин у дома, где владелец знает клиентов по именам.",
    sizing: [
      { label: "TAM", value: "~210 000", sub: "Зарегистрированные мелкие розничные / продуктовые точки по Узбекистану, которые вероятно продают в долг." },
      { label: "SAM", value: "~70 000", sub: "Владельцы со смартфоном, реально ведущие книгу насия — достижимая доля." },
      { label: "SOM", value: "~2 500", sub: "Цель первого года: магазины, до которых можно дойти «от двери к двери» в Ташкенте + 3 областных городах через сарафан." },
    ],
    howEstimated:
      "TAM привязан к официальной статистике розничных точек (данные). Доля продающих в долг (~70%) и владение смартфоном среди владельцев (~85%+) — допущения из интервью с клиентами и отчётов по проникновению смартфонов в регионах, помеченные как допущения, а не факты. SOM намеренно консервативен: то, до чего один основатель дойдёт ногами и через рекомендации за 12 месяцев, а не фантазия «1% сверху».",
    positioning: [
      { name: "Бумажный дафтар", localFit: 3, simplicity: 3, gap: "Бесплатный и привычный, но не умеет считать, напоминать и не переживёт пролитый чай. Настоящий конкурент." },
      { name: "Excel / заметки", localFit: 1, simplicity: 1, gap: "Слишком муторно для занятого прилавка; нет напоминаний; владельцы бросают за неделю." },
      { name: "Полные POS-системы", localFit: 1, simplicity: 1, gap: "Сделаны под склад + чеки, по цене и форме под супермаркеты — избыточно и дорого." },
      { name: "Nasiya (это)", localFit: 3, simplicity: 3, gap: "Та самая ниша: быстро как бумага, но считает, помнит и напоминает — на узбекском, на дешёвом телефоне." },
    ],
    demandSignals: [
      "В интервью владельцы рассказывают, как переписывают размокший дафтар от руки и всё равно теряют деньги в спорах «я заплатил».",
      "Некоторые уже фотографируют страницы тетради или ведут кривой Excel — доказательство, что боль реальна настолько, что вокруг неё импровизируют.",
      "Неявная цена проблемы конкретна: владельцы называют конкретные долги (200 тыс.–2 млн сум), которые списали, потому что не смогли доказать или взыскать.",
      "Напоминания — волшебный момент на демо: владельцы загораются от «оно само пишет клиенту», того, что они ненавидят делать в лицо.",
    ],
    whyNow: [
      "Смартфоны теперь стандарт даже у пожилых владельцев — барьер устройства исчез.",
      "Telegram — канал по умолчанию; напоминание в Telegram воспринимается нормально, а не как спам.",
      "Click и Payme сделали цифровые деньги повседневностью, поэтому владелец доверяет приложению в денежных делах.",
    ],
    verdict:
      "Стоит строить. Боль всеобщая, названная и сейчас «решена» тетрадью, которая, по общему признанию, не работает — широкая открытая ниша, где единственный серьёзный конкурент — бумага.",
  },

  systemDesign: {
    summary:
      "Тонкий, скучный, надёжный стек: телефонный PWA общается с API-маршрутами Next.js поверх Postgres. Фоновый воркер отвечает за единственное, что не должно молча отказывать — отправку напоминаний. Здесь нет ничего нового; мастерство — в модели данных и в том, чтобы уведомления были надёжными.",
    nodes: [
      { id: "pwa", label: "Телефон PWA\n(владелец)", kind: "client" },
      { id: "api", label: "Next.js API\nмаршруты", kind: "api" },
      { id: "db", label: "PostgreSQL\n(Supabase)", kind: "data" },
      { id: "worker", label: "Воркер\nнапоминаний", kind: "api" },
      { id: "tg", label: "Telegram\nBot API", kind: "external" },
      { id: "sms", label: "SMS-шлюз\n(резерв)", kind: "external" },
    ],
    edges: [
      { from: "pwa", to: "api", label: "HTTPS / JSON" },
      { from: "api", to: "db", label: "SQL" },
      { from: "api", to: "worker", label: "поставить в очередь" },
      { from: "worker", to: "tg", label: "отправка" },
      { from: "worker", to: "sms", label: "резерв" },
      { from: "worker", to: "db", label: "лог доставки" },
    ],
    entities: [
      { name: "shops", fields: ["id", "owner_phone", "name", "created_at"], note: "по одному на владельца" },
      { name: "customers", fields: ["id", "shop_id →", "name", "phone", "balance"], note: "баланс кэшируется" },
      { name: "ledger_entries", fields: ["id", "customer_id →", "type (credit/repayment)", "amount", "created_at"], note: "источник истины" },
      { name: "reminders", fields: ["id", "customer_id →", "channel", "status", "sent_at"], note: "лог доставки" },
    ],
    relations: [
      { from: "shops", to: "customers", label: "1 → много" },
      { from: "customers", to: "ledger_entries", label: "1 → много" },
      { from: "customers", to: "reminders", label: "1 → много" },
    ],
    requestFlow: {
      title: "Владелец записывает продажу в долг, затем отправляет напоминание",
      steps: [
        { actor: "Владелец", to: "PWA", message: "Жмёт клиента → «Добавить долг» → 50 000" },
        { actor: "PWA", to: "API", message: "POST /entries { type: credit, amount }" },
        { actor: "API", to: "БД", message: "INSERT записи, UPDATE кэш-баланса (одна транзакция)" },
        { actor: "БД", to: "API", message: "новый баланс: 50 000" },
        { actor: "API", to: "PWA", message: "200 — интерфейс мгновенно показывает баланс" },
        { actor: "Владелец", to: "PWA", message: "Позже: жмёт «Напомнить»" },
        { actor: "API", to: "Воркер", message: "ставит задачу напоминания в очередь" },
        { actor: "Воркер", to: "Telegram", message: "отправка; при ошибке → SMS; лог результата" },
      ],
    },
    decisions: [
      {
        choice: "Только добавляемые ledger_entries как источник истины; баланс — кэшированная колонка.",
        why: "Деньгам нужен аудит-след — нужно уметь доказать каждое изменение при споре с клиентом. Кэш баланса держит список быстрым.",
        alternative: "Хранить только текущий баланс проще, но тогда нельзя восстановить историю или разрешить спор — смертельно для приложения о долгах.",
      },
      {
        choice: "PWA, а не нативное приложение из стора.",
        why: "Владельцы ничего не устанавливают, вы выкатываете обновления мгновенно, нет трения ревью и комиссии стора. Книге долгов не нужны нативные API.",
        alternative: "Нативное приложение — это аккаунты сторов, задержки ревью и шаг загрузки, который убивает распространение «от магазина к магазину».",
      },
      {
        choice: "Авторизация по телефону (OTP), без паролей и email.",
        why: "Владельцы доверяют и помнят номера телефонов; email редок и заброшен. OTP совпадает с тем, как они входят во все остальные приложения.",
        alternative: "Email+пароль добавляет поле, которое опечатают, и сброс пароля, который никогда не пройдут до конца.",
      },
      {
        choice: "Напоминания идут через очередь/воркер, а не внутри запроса.",
        why: "Telegram может тормозить или лежать; касание владельца должно вернуться мгновенно, а отправка — повторяться, не блокируя интерфейс.",
        alternative: "Отправка внутри запроса заморозит экран и потеряет напоминание, если вызов API упадёт по таймауту.",
      },
    ],
    hardParts: [
      {
        title: "Надёжность напоминаний",
        approach:
          "Рассматривайте каждое напоминание как стойкую задачу с явными состояниями (в очереди → отправлено → ошибка). Повтор с задержкой, переход с Telegram на SMS и всегда лог результата, чтобы владелец видел «доставлено» против «ошибка». Никогда не отправляйте денежные сообщения «выстрелил и забыл».",
      },
      {
        title: "Целостность баланса при плохой связи",
        approach:
          "Пишите запись и обновляйте кэш-баланс в одной транзакции и делайте запись идемпотентной (id записи, сгенерированный клиентом), чтобы повторное касание на нестабильном 3G не списало с клиента дважды.",
      },
    ],
    evolution: [
      { version: "v0", adds: "PWA + API + Postgres. Воркера ещё нет — напоминания через ручные ссылки." },
      { version: "v1", adds: "Добавить воркер напоминаний + Telegram Bot API, когда «напомнить» станет в одно касание." },
      { version: "v2", adds: "Добавить SMS-резерв + лог доставки; лёгкая очередь, когда объём напоминаний вырастет." },
      { version: "v3", adds: "Добавить реплики для чтения / кэш для отчётов и роли, когда в магазинах появятся сотрудники." },
    ],
    scale:
      "Этот дизайн спокойно держит ~10 000 магазинов на одном инстансе Postgres — данных мало (текст + числа), запись редкая. Первым упрётся воркер напоминаний, поэтому он изолирован рано. Больше ничего переделывать до этого не придётся.",
  },

  roadmap: {
    firstMove:
      "Сегодня: разверните приложение Next.js и подключите вход по телефону (OTP) через Supabase. Как только сможете войти и увидеть пустой магазин, весь путь раскрывается.",
    versions: [
      {
        id: "v0",
        title: "Фундамент",
        goal: "Вошедший владелец видит свой собственный пустой, но настоящий магазин.",
        steps: [
          "Создайте приложение Next.js (PWA) и выложите пустой каркас на Vercel.",
          "Добавьте вход по телефону (OTP) через Supabase Auth; создавайте строку магазина при первом входе.",
          "Создайте схему: shops, customers, ledger_entries.",
          "Соберите пустой главный экран (общий долг = 0) и пустой список клиентов.",
        ],
        doneWhen: "Можно войти по номеру телефона и попасть на свою пустую панель.",
        effort: "≈ 3–4 дня в одиночку",
        skip: "Без напоминаний, отчётов и нескольких сотрудников. Пока не оформляйте — сначала докажите костяк.",
        tiesTo: "Сущности: shops, customers · Стек: Next.js, Supabase Auth",
      },
      {
        id: "v1",
        title: "Базовый MVP",
        goal: "Единственное обязательное: записать долг и видеть, кто сколько должен. Отдайте первым магазинам.",
        steps: [
          "Добавьте клиента (имя + телефон) на одном экране.",
          "Запишите продажу в долг в два касания: выбрать клиента → ввести сумму.",
          "Запишите платёж так же; баланс обновляется в одной транзакции.",
          "Список клиентов по убыванию долга; нажмите на одного, чтобы увидеть всю историю.",
          "Главный экран показывает общий долг по всем клиентам.",
        ],
        doneWhen: "Владелец может полностью заменить бумажный дафтар на один день торговли.",
        effort: "≈ 1 неделя в одиночку",
        skip: "Пока без автоматических напоминаний — пусть пишут вручную. Без экспорта.",
        tiesTo: "Сущности: ledger_entries · Поток: «продажа в долг» · Стек: TanStack Table, zod",
      },
      {
        id: "v2",
        title: "Готово к продаже",
        goal: "Функции, за которые владелец платит: напоминания + ясность по просрочке.",
        steps: [
          "Напоминание в одно касание через Telegram (Bot API) на узбекском/русском.",
          "Добавьте воркер напоминаний + лог доставки (отправлено / ошибка).",
          "SMS-резерв, когда у клиента нет Telegram.",
          "Помечайте счета просроченными через N дней; выведите список «Просрочка» на главный.",
          "Добавьте заглушку Pro-пейволла (// TODO: gate by plan) вокруг напоминаний.",
        ],
        doneWhen: "Владелец отправляет напоминание о долге, не печатая его, и видит, что доставлено.",
        effort: "≈ 1,5 недели в одиночку",
        skip: "Без нескольких сотрудников и аналитических панелей. Не стройте здесь отчёты.",
        tiesTo: "Сложная часть: надёжность напоминаний · Интеграции: Telegram Bot API, SMS",
      },
      {
        id: "v3",
        title: "Рост",
        goal: "Удерживать и расширять, когда магазины уже платят.",
        steps: [
          "Месячная сводка: всего выдано, собрано, списано.",
          "Несколько сотрудников на магазин с ролями (владелец / помощник).",
          "Экспорт книги в PDF/Excel для отчётности владельца.",
          "Сбор подписки через Click/Payme внутри приложения.",
        ],
        doneWhen: "У платящего магазина есть причина остаться после третьего месяца.",
        effort: "≈ 2–3 недели в одиночку",
        skip: "Без сетей магазинов и франшиз, пока одиночные магазины явно не удерживаются.",
        tiesTo: "Эволюция: реплики чтения, роли · Интеграции: Click/Payme",
      },
    ],
  },

  design: {
    screens: [
      {
        name: "Главная (панель)",
        whatsOnIt: "Одно большое число — общий долг — затем сегодняшние платежи и список просрочки.",
        why: "Первый вопрос владельца каждое утро — «сколько там денег на улице?». Ответьте на него прежде всего.",
        elements: ["Общий долг (крупно)", "Сегодняшние платежи", "Просроченные клиенты", "+ Добавить клиента"],
      },
      {
        name: "Карточка клиента",
        whatsOnIt: "Текущий баланс клиента, история долгов/платежей и две большие кнопки.",
        why: "Этот экран владелец открывает у прилавка — баланс и история должны читаться с одного взгляда, кнопки под палец.",
        elements: ["Имя + баланс", "Список истории", "Добавить долг", "Записать платёж", "Напомнить"],
      },
      {
        name: "Записать долг (шторка)",
        whatsOnIt: "Цифровая клавиатура и подтверждение — больше ничего.",
        why: "Самое частое действие в приложении. Должно быть в два касания и переживать занятой момент одной рукой.",
        elements: ["Сумма (клавиатура)", "Заметка (необязательно)", "Подтвердить"],
      },
    ],
    criticalFlow: {
      title: "Записать продажу в долг (действие, которое должно быть без усилий)",
      taps: [
        "Нажмите имя клиента в списке",
        "Нажмите «Добавить долг»",
        "Введите сумму на клавиатуре",
        "Нажмите «Подтвердить» — баланс обновлён, назад к списку",
      ],
    },
    localUx: [
      { label: "Реальность устройства", detail: "Под дешёвый Android на 3G: крупные цели, минимум картинок, мгновенные оптимистичные обновления, чтобы плохая связь не блокировала продажу." },
      { label: "Грамотность и привычки", detail: "Числа важнее текста, иконки рядом со словами, почти без печати — основное действие это клавиатура, а не форма." },
      { label: "Язык", detail: "Узбекский (латиница) и русский повсюду, включая шаблоны напоминаний. Форматирование сумов пробелами (50 000), без копеек." },
      { label: "Доверие", detail: "Каждое изменение баланса видно в истории — владелец всегда покажет клиенту точно когда и сколько, что убивает споры." },
    ],
    keepOff: [
      "Склад / каталог товаров — это книга долгов, а не POS.",
      "Графики и аналитика на главном экране — одного числа достаточно.",
      "Мультивалюта, налоги, чеки — неважны для махаллинской книги долгов.",
      "Социальные / клиентские аккаунты — на MVP входит только владелец.",
    ],
    lookAndFeel:
      "Спокойно, доверительно, серьёзно к деньгам, но дружелюбно. Один тёплый акцент для положительного (платёж) и приглушённый тревожный тон для просрочки. Крупные читаемые цифры, щедрые отступы, почти без декора — должно ощущаться как чистый дафтар, а не финтех-панель.",
  },

  business: {
    model:
      "Месячная подписка на магазин. Подходит, потому что ценность повторяющаяся (каждый день торговли создаёт долги для учёта), а владельцы уже мыслят месяцами для аренды и коммуналки. Не за место (владелец один) и не разовая (напоминания стоят вам денег).",
    willingnessToPay:
      "Привяжите цену к боли, а не к своим затратам. Владелец, списывающий хотя бы один долг в 100 000 сум в месяц, потому что не смог доказать или взыскать, теряет куда больше подписки. Назначайте цену как малую долю одного возвращённого долга, чтобы «да» было очевидным.",
    painCost:
      "Владельцы сообщают о списании 100 000–500 000 сум/мес невозвратной или спорной насии. Подписка ~40 000 сум/мес — меньше половины самой малой из них; она окупается возвратом одного долга.",
    pricing: [
      { name: "Бесплатно", price: "0 сум", note: "Один магазин, до 30 клиентов, ручные напоминания. Съезд с бумаги." },
      { name: "Pro", price: "~40 000 сум/мес", note: "Без лимита клиентов, напоминания Telegram/SMS в одно касание, список просрочки." },
      { name: "Plus", price: "~70 000 сум/мес", note: "Добавляет аккаунты сотрудников, месячные отчёты и экспорт PDF/Excel." },
    ],
    payment:
      "Сбор через Click или Payme — оба повседневны и привычны. Наличные/перевод подходят для первых проданных вручную клиентов, но не масштабируются; подключите Click/Payme к v3. Трение: владельцам удобно платить через Click ежемесячно, как пополнять телефон или коммуналку.",
    unitEconomics: [
      { label: "Цена за Pro-магазин", value: "40 000 сум/мес", kind: "data" },
      { label: "Стоимость напоминания (Telegram)", value: "≈ 0 сум", kind: "data" },
      { label: "Стоимость напоминания (SMS-резерв)", value: "~50 сум за шт., ~30/мес", kind: "assumption" },
      { label: "Эквайринг платежей", value: "~2% через Click/Payme", kind: "assumption" },
      { label: "Стоимость обслуживания / магазин", value: "~3 000 сум/мес", kind: "assumption" },
      { label: "Валовая маржа / Pro-магазин", value: "~90%", kind: "assumption" },
    ],
    howEstimated:
      "Цена и стоимость Telegram реальны. Объём SMS, ставка эквайринга и стоимость обслуживания — допущения по аналогичным приложениям; считайте их честными догадками, пока не будет 50 платящих магазинов.",
    pathToProfit:
      "При почти нулевой предельной стоимости на магазин точка безубыточности — это покрыть скромный месячный расход одного основателя, примерно 150–250 платящих Pro-магазинов. Это достижимо в первый год при таком SOM и реально занимает 6–9 месяцев продаж «от магазина к магазину».",
    gtm: [
      "Пройдите один базар/махаллю ногами. Покажите «напоминание» 10 владельцам на их же телефоне — этот момент и продаёт.",
      "Подключите первые магазины бесплатно, лично, и заведите им первых 5 клиентов, чтобы дафтар уже был наполовину заменён.",
      "Дайте работать рекомендациям: каждый владелец знает десяток других на той же улице с такой же размокшей тетрадью.",
      "Засейте Telegram-группы владельцев коротким демо-видео на узбекском про запись долга в два касания.",
    ],
    verdict:
      "Деньги реальны и достижимы. Почти нулевая стоимость обслуживания, цена сильно ниже месячной боли и клиент, до которого можно дойти ногами — здоровый, пусть и негламурный, бизнес.",
    breakeven: [
      { month: "М1", revenue: 10, cost: 80 },
      { month: "М2", revenue: 24, cost: 82 },
      { month: "М3", revenue: 45, cost: 85 },
      { month: "М4", revenue: 72, cost: 88 },
      { month: "М5", revenue: 96, cost: 92 },
      { month: "М6", revenue: 130, cost: 100 },
      { month: "М7", revenue: 168, cost: 108 },
      { month: "М8", revenue: 210, cost: 116 },
    ],
  },

  techStack: {
    glance: ["TypeScript", "Next.js (PWA)", "Supabase", "Telegram Bot API"],
    layers: [
      { layer: "Язык", choice: "TypeScript", why: "Один язык на фронтенде и бэкенде — меньше переключений для соло-разработчика." },
      { layer: "Фронтенд", choice: "Next.js (mobile-first PWA)", why: "Владельцы пользуются телефонами; PWA избегает трения сторов и ставится в одно касание." },
      { layer: "Бэкенд", choice: "Next.js API-маршруты", why: "Нет отдельного сервера на MVP-масштабе; рядом с фронтендом." },
      { layer: "База данных", choice: "PostgreSQL через Supabase", why: "Реляционные данные (shops → customers → entries) ложатся идеально; щедрый бесплатный тариф." },
      { layer: "Авторизация", choice: "Supabase Auth — телефон OTP", why: "Владельцы доверяют номерам телефонов больше, чем email; совпадает с их привычным входом." },
      { layer: "Библиотеки", choice: "TanStack Table · Recharts · date-fns · zod", why: "Списки долгов, график итогов, сроки и валидация ввода — каждая экономит дни." },
      { layer: "Интеграции", choice: "Telegram Bot API · Click/Payme", why: "Напоминания в канале, где владельцы и так живут; местные платёжные рельсы, которым доверяют." },
      { layer: "Хостинг", choice: "Vercel (веб) + Supabase (БД)", why: "У обоих бесплатные тарифы, которых хватит далеко за первую сотню магазинов." },
      { layer: "Инструменты", choice: "shadcn/ui · Drizzle ORM · Figma", why: "Быстрые доступные компоненты, типобезопасный доступ к БД и место для эскизов 3 экранов." },
    ],
    integrations: ["Telegram Bot API (напоминания)", "Click / Payme (подписки)", "SMS-шлюз (резерв)"],
    monthlyCost: "$0 на MVP на бесплатных тарифах; ~$25/мес после лимитов Supabase/Vercel.",
  },
};

const nasiyaUz: IdeaContent = {
  id: "nasiya",
  hook: "Qog'oz qarz daftarini yopib qo'ying. Ikki teginishli qarz daftari: ho'l bo'lmaydi, hech narsani unutmaydi va mijozga o'zi eslatma yuboradi.",

  overview: {
    problem:
      "Istalgan mahalla do'koniga kiring — daftar topasiz: do'kon egasi kim nasiyaga olganini yozadigan qog'oz daftar. Sahifalar ho'l bo'ladi, ismlar o'chadi, va har oy janjal «men allaqachon to'lаganman» deydan boshlanadi. Egasi bir qarashda kim muddatini o'tkazganini yoki qancha puli o'zganing cho'ntagida muzlab qolganini ko'rmaydi. Do'kon egasi o'zgarsa, daftarning xotirasi u bilan ketadi.",
    solution:
      "Telefondagi qarz daftari, bitta bosh barmoq uchun. Mijozni bir marta qo'shing; nasiya savdosi yoki to'lovni ikki teginishda yozing; har bir mijozda joriy balans va to'liq tarix bor. Bir teginish Telegram yoki SMS orqali o'zbek yoki rus tilida xushmuomala eslatma yuboradi. Bosh ekran umumiy qarzni, kim muddatini o'tkazganini va bugun nima tushganini ko'rsatadi — o'sha daftar, ammo hisoblay oladigan, hech narsani unutmaydigan va egasi keyingi xaridorga xizmat qilayotganda qarzlarni undirib turadigan.",
    whatYouGet: [
      "Bozor tahlili — kim to'laydi, bunday do'konlar qancha va nega buni hali hech kim jiddiy egallamagan",
      "Tizim dizayni — arxitektura + ma'lumotlar modeli + yagona qiyin qism (eslatma ishonchliligi) hal qilingan",
      "0→MVP yo'l xaritasi — yig'ishga tayyor v0→v3 yo'li; siz har doim aniq keyingi qadamni bilasiz",
      "Dizayn va ekranlar — 3 ta asosiy ekran vayrfreymlari + ikki teginishli «qarz yozish» oqimi",
      "Biznes va narx — og'riqqa bog'langan aniq so'm narxlar, birlik iqtisodi va birinchi 10 to'lovchi do'konni qanday qo'lga kiritish",
      "Texnologiya steki — o'ylangan, asoslangan stek, vositalarni tanlashga kunlar yo'qotmaslik uchun",
      "Ma'lumotnoma — to'liq DB sxemasi + API, JSON nusxalash (eng oson qism, oxiriga qoldirilgan)",
    ],
  },

  market: {
    customer:
      "Bitta mahalla do'koni egasi (oziq-ovqat / produkti) — peshtaxta ortidagi odam, odatda 30–55 yosh, allaqachon 20–60 doimiy mijozga nasiya beradigan va daftar og'rig'ini shaxsan his qiladigan. U ham xaridor, ham foydalanuvchi. Tarmoqlar va supermarketlar emas: egasi mijozlarni ismi bilan biladigan mustaqil mahalla do'koni.",
    sizing: [
      { label: "TAM", value: "~210 000", sub: "O'zbekiston bo'ylab nasiyaga sotishi ehtimoli bor ro'yxatga olingan mayda chakana / oziq-ovqat nuqtalari." },
      { label: "SAM", value: "~70 000", sub: "Smartfoni bor va nasiya daftarini faol yuritadigan egalar — real erishiladigan ulush." },
      { label: "SOM", value: "~2 500", sub: "Birinchi yil maqsadi: Toshkent + 3 viloyat shahrida og'izdan-og'izga yetib boriladigan do'konlar." },
    ],
    howEstimated:
      "TAM rasmiy chakana nuqta statistikasiga (ma'lumot) bog'langan. Nasiyaga sotuvchilar ulushi (~70%) va egalar orasida smartfon egaligi (~85%+) — mijoz suhbatlari va mintaqaviy smartfon hisobotlaridan olingan taxminlar bo'lib, fakt emas, taxmin deb belgilangan. SOM ataylab ehtiyotkor: bitta asoschi 12 oyda oyoq va tavsiya bilan yetib boradigan narsa, «yuqoridan 1%» xayoli emas.",
    positioning: [
      { name: "Qog'oz daftar", localFit: 3, simplicity: 3, gap: "Bepul va ishonchli, ammo hisoblay olmaydi, eslatmaydi va to'kilgan choyni ko'tarmaydi. Asl raqib." },
      { name: "Excel / eslatmalar", localFit: 1, simplicity: 1, gap: "Band peshtaxta uchun juda mayda-chuyda; eslatma yo'q; egalar bir haftada tashlab qo'yadi." },
      { name: "To'liq POS tizimlar", localFit: 1, simplicity: 1, gap: "Ombor + cheklar uchun qilingan, narxi va shakli supermarketga — ortiqcha va qimmat." },
      { name: "Nasiya (bu)", localFit: 3, simplicity: 3, gap: "O'sha bo'shliq: qog'ozdek tez, ammo hisoblaydi, eslaydi va eslatadi — o'zbekcha, arzon telefonda." },
    ],
    demandSignals: [
      "Suhbatlarda egalar ho'l bo'lgan daftarni qo'lda qayta ko'chirib, baribir «to'lаdim» janjallarida pul yo'qotishini aytadi.",
      "Ba'zilari allaqachon daftar sahifalarini suratga oladi yoki chala Excel yuritadi — og'riq atrofida improvizatsiya qilinadigan darajada real ekanligining isboti.",
      "Muammoning yashirin narxi aniq: egalar isbotlay yoki undira olmagani uchun hisobdan chiqargan aniq qarzlarni (200 ming–2 mln so'm) aytadi.",
      "Eslatmalar demoda sehrli lahza — egalar «mijozga o'zi yozadi»dan yonib ketadi, yuzma-yuz qilishni yomon ko'rgan ish.",
    ],
    whyNow: [
      "Smartfonlar endi keksa egalarda ham standart — qurilma to'sig'i yo'qoldi.",
      "Telegram — asosiy kanal; Telegramdagi eslatma spam emas, normal his qilinadi.",
      "Click va Payme raqamli pulni kundalik qildi, shuning uchun ega pul masalasida ilovaga ishonadi.",
    ],
    verdict:
      "Qurishga arziydi. Og'riq umumiy, nomi bor va hozir hamma «ishlamaydi» deb tan oladigan daftar bilan «hal qilingan» — yagona jiddiy raqibi qog'oz bo'lgan keng ochiq bo'shliq.",
  },

  systemDesign: {
    summary:
      "Yupqa, zerikarli, ishonchli stek: telefon PWA Postgres ustidagi Next.js API yo'llari bilan gaplashadi. Fon ishchisi jim qolib ishdan chiqmasligi kerak bo'lgan yagona narsa — eslatma yuborish bilan shug'ullanadi. Bu yerda yangilik yo'q; mahorat ma'lumotlar modelida va bildirishnomalarni ishonchli qilishda.",
    nodes: [
      { id: "pwa", label: "Telefon PWA\n(do'kon egasi)", kind: "client" },
      { id: "api", label: "Next.js API\nyo'llari", kind: "api" },
      { id: "db", label: "PostgreSQL\n(Supabase)", kind: "data" },
      { id: "worker", label: "Eslatma\nishchisi", kind: "api" },
      { id: "tg", label: "Telegram\nBot API", kind: "external" },
      { id: "sms", label: "SMS shlyuz\n(zaxira)", kind: "external" },
    ],
    edges: [
      { from: "pwa", to: "api", label: "HTTPS / JSON" },
      { from: "api", to: "db", label: "SQL" },
      { from: "api", to: "worker", label: "navbatga qo'yish" },
      { from: "worker", to: "tg", label: "yuborish" },
      { from: "worker", to: "sms", label: "zaxira" },
      { from: "worker", to: "db", label: "yetkazish logi" },
    ],
    entities: [
      { name: "shops", fields: ["id", "owner_phone", "name", "created_at"], note: "har egaga bitta" },
      { name: "customers", fields: ["id", "shop_id →", "name", "phone", "balance"], note: "balans keshlanadi" },
      { name: "ledger_entries", fields: ["id", "customer_id →", "type (credit/repayment)", "amount", "created_at"], note: "haqiqat manbai" },
      { name: "reminders", fields: ["id", "customer_id →", "channel", "status", "sent_at"], note: "yetkazish logi" },
    ],
    relations: [
      { from: "shops", to: "customers", label: "1 → ko'p" },
      { from: "customers", to: "ledger_entries", label: "1 → ko'p" },
      { from: "customers", to: "reminders", label: "1 → ko'p" },
    ],
    requestFlow: {
      title: "Ega nasiya savdosini yozadi, so'ng eslatma yuboradi",
      steps: [
        { actor: "Ega", to: "PWA", message: "Mijozni bosadi → «Qarz qo'shish» → 50 000" },
        { actor: "PWA", to: "API", message: "POST /entries { type: credit, amount }" },
        { actor: "API", to: "DB", message: "INSERT yozuv, UPDATE kesh-balans (bitta tranzaksiya)" },
        { actor: "DB", to: "API", message: "yangi balans: 50 000" },
        { actor: "API", to: "PWA", message: "200 — interfeys balansni darhol ko'rsatadi" },
        { actor: "Ega", to: "PWA", message: "Keyinroq: «Eslatish»ni bosadi" },
        { actor: "API", to: "Ishchi", message: "eslatma vazifasini navbatga qo'yadi" },
        { actor: "Ishchi", to: "Telegram", message: "yuborish; xato bo'lsa → SMS; natijani logga yozish" },
      ],
    },
    decisions: [
      {
        choice: "Faqat qo'shiladigan ledger_entries haqiqat manbai sifatida; balans — keshlangan ustun.",
        why: "Pulga audit izi kerak — mijoz nizolashganda har bir o'zgarishni isbotlay olishingiz shart. Balansni keshlash ro'yxatni tez saqlaydi.",
        alternative: "Faqat joriy balansni saqlash osonroq, ammo tarixni tiklab yoki nizoni hal qilib bo'lmaydi — qarz ilovasi uchun halokatli.",
      },
      {
        choice: "PWA, do'kondagi mahalliy ilova emas.",
        why: "Egalar hech narsa o'rnatmaydi, yangilanishlarni darhol chiqarasiz, ko'rib chiqish ishqalanishi va do'kon ulushi yo'q. Qarz daftariga mahalliy API kerak emas.",
        alternative: "Mahalliy ilova — do'kon hisoblari, ko'rib chiqish kechikishlari va yuklab olish qadami, bu do'kondan-do'konga tarqalishni o'ldiradi.",
      },
      {
        choice: "Telefon-OTP autentifikatsiyasi, parol yoki email yo'q.",
        why: "Egalar telefon raqamlariga ishonadi va eslab qoladi; email kam va tashlandiq. OTP ular boshqa ilovalarga kiradigan usulga mos.",
        alternative: "Email+parol — xato teriladigan maydon va hech qachon oxirigacha o'tilmaydigan tiklash oqimini qo'shadi.",
      },
      {
        choice: "Eslatmalar so'rov ichida emas, navbat/ishchi orqali o'tadi.",
        why: "Telegram sekin yoki o'chiq bo'lishi mumkin; eganing teginishi darhol qaytishi, yuborish esa interfeysni bloklamasdan qayta urinishi kerak.",
        alternative: "So'rov ichida yuborish ekranni muzlatadi va API chaqiruvi taymautga uchrasa eslatmani yo'qotadi.",
      },
    ],
    hardParts: [
      {
        title: "Eslatma ishonchliligi",
        approach:
          "Har bir eslatmani aniq holatlarga ega bardoshli vazifa sifatida ko'ring (navbatda → yuborildi → xato). Kechikish bilan qayta urinish, Telegramdan SMSga o'tish va har doim natijani logga yozish — ega «yetkazildi»ni «xato»dan ko'rsin. Pulga oid xabarlarni hech qachon «otib unutma» qilmang.",
      },
      {
        title: "Yomon aloqada balans yaxlitligi",
        approach:
          "Yozuvni yozing va kesh-balansni bitta tranzaksiyada yangilang, hamda yozuvni idempotent qiling (mijoz tomonidan yaratilgan yozuv id), shunda beqaror 3G'da qayta teginish mijozdan ikki marta yechmaydi.",
      },
    ],
    evolution: [
      { version: "v0", adds: "PWA + API + Postgres. Hali ishchi yo'q — eslatmalar qo'lda havolalar orqali." },
      { version: "v1", adds: "«Eslatish» bir teginishga aylanganda eslatma ishchisi + Telegram Bot API qo'shing." },
      { version: "v2", adds: "SMS zaxira + yetkazish logi qo'shing; eslatma hajmi o'sganda yengil navbat qo'shing." },
      { version: "v3", adds: "Hisobotlar uchun o'qish replikalari / kesh va do'konlarda xodim paydo bo'lganda rollar qo'shing." },
    ],
    scale:
      "Bu dizayn bitta Postgres nusxasida ~10 000 do'konni bemalol ko'taradi — ma'lumot oz (matn + raqam), yozuv kam. Birinchi bo'lib eslatma ishchisi yetmay qoladi, shuning uchun u erta ajratilgan. Undan oldin boshqa hech narsani qayta ishlamaysiz.",
  },

  roadmap: {
    firstMove:
      "Bugun: Next.js ilovasini yarating va Supabase telefon-OTP kirishini ulang. Kirib, bo'sh do'konni ko'rishingiz bilan butun yo'l ochiladi.",
    versions: [
      {
        id: "v0",
        title: "Poydevor",
        goal: "Kirgan ega o'zining bo'sh, ammo haqiqiy do'konini ko'radi.",
        steps: [
          "Next.js (PWA) ilovasini yarating va bo'sh qobiqni Vercelga joylang.",
          "Supabase Auth orqali telefon-OTP kirishni qo'shing; birinchi kirishda do'kon qatorini yarating.",
          "Sxemani yarating: shops, customers, ledger_entries.",
          "Bo'sh bosh ekran (umumiy qarz = 0) va bo'sh mijozlar ro'yxatini quring.",
        ],
        doneWhen: "Telefon raqami bilan kirib, o'zingizning bo'sh panelingizga tushasiz.",
        effort: "≈ 3–4 kun yakka",
        skip: "Eslatma, hisobot, ko'p xodim yo'q. Hali bezamang — avval o'zakni isbotlang.",
        tiesTo: "Obyektlar: shops, customers · Stek: Next.js, Supabase Auth",
      },
      {
        id: "v1",
        title: "Asosiy MVP",
        goal: "Yagona zarur narsa: qarz yozish va kim qancha qarzdorligini ko'rish. Birinchi do'konlarga bering.",
        steps: [
          "Mijozni (ism + telefon) bitta ekranda qo'shing.",
          "Nasiya savdosini ikki teginishda yozing: mijozni tanlang → summani kiriting.",
          "To'lovni xuddi shunday yozing; balans bitta tranzaksiyada yangilanadi.",
          "Qarz bo'yicha saralangan mijozlar ro'yxati; birini bosib to'liq tarixni ko'ring.",
          "Bosh ekran barcha mijozlar bo'yicha umumiy qarzni ko'rsatadi.",
        ],
        doneWhen: "Ega bir kunlik savdoda qog'oz daftarni to'liq almashtira oladi.",
        effort: "≈ 1 hafta yakka",
        skip: "Hali avtomatik eslatma yo'q — qo'lda yozsin. Eksport yo'q.",
        tiesTo: "Obyektlar: ledger_entries · Oqim: «nasiya savdosi» · Stek: TanStack Table, zod",
      },
      {
        id: "v2",
        title: "Sotiladigan",
        goal: "Ega to'laydigan funksiyalar: eslatmalar + muddati o'tgan aniqligi.",
        steps: [
          "Telegram (Bot API) orqali o'zbek/rus tilida bir teginishli eslatma.",
          "Eslatma ishchisi + yetkazish logi (yuborildi / xato) qo'shing.",
          "Mijozda Telegram bo'lmasa SMS zaxira.",
          "N kundan keyin hisoblarni muddati o'tgan deb belgilang; bosh ekranda «Muddati o'tgan» ro'yxatini ko'rsating.",
          "Eslatmalar atrofiga Pro to'lov devori zaxirasini (// TODO: gate by plan) qo'shing.",
        ],
        doneWhen: "Ega qarz eslatmasini termasdan yuboradi va yetkazilganini ko'radi.",
        effort: "≈ 1,5 hafta yakka",
        skip: "Ko'p xodim va tahlil panellari yo'q. Bu yerda hisobot qurmang.",
        tiesTo: "Qiyin qism: eslatma ishonchliligi · Integratsiyalar: Telegram Bot API, SMS",
      },
      {
        id: "v3",
        title: "O'sish",
        goal: "Do'konlar to'lay boshlagach ushlab qolish va kengaytirish.",
        steps: [
          "Oylik xulosа: jami berilgan, yig'ilgan, hisobdan chiqarilgan.",
          "Har do'konga rolli bir nechta xodim (ega / yordamchi).",
          "Eganing hisoboti uchun daftarni PDF/Excelga eksport qilish.",
          "Ilova ichida Click/Payme orqali obunani yig'ish.",
        ],
        doneWhen: "To'lovchi do'konda uchinchi oydan keyin qolish uchun sabab bor.",
        effort: "≈ 2–3 hafta yakka",
        skip: "Yakka do'konlar aniq ushlanmaguncha do'kon tarmoqlari va franshiza yo'q.",
        tiesTo: "Evolyutsiya: o'qish replikalari, rollar · Integratsiyalar: Click/Payme",
      },
    ],
  },

  design: {
    screens: [
      {
        name: "Bosh (panel)",
        whatsOnIt: "Bitta katta raqam — umumiy qarz — so'ng bugungi to'lovlar va muddati o'tganlar ro'yxati.",
        why: "Eganing har tongdagi birinchi savoli — «tashqarida qancha pul bor?». Avvalo shunga javob bering.",
        elements: ["Umumiy qarz (yirik)", "Bugungi to'lovlar", "Muddati o'tgan mijozlar", "+ Mijoz qo'shish"],
      },
      {
        name: "Mijoz kartasi",
        whatsOnIt: "Mijozning joriy balansi, qarz/to'lov tarixi va ikki katta tugma.",
        why: "Bu ekranni ega peshtaxtada ochadi — balans va tarix bir qarashda o'qilishi, tugmalar barmoq bo'yi bo'lishi kerak.",
        elements: ["Ism + balans", "Tarix ro'yxati", "Qarz qo'shish", "To'lov yozish", "Eslatish"],
      },
      {
        name: "Qarz yozish (parda)",
        whatsOnIt: "Raqam klaviaturasi va tasdiqlash — boshqa hech narsa.",
        why: "Ilovada eng ko'p ishlatiladigan amal. Ikki teginishda bo'lishi va band, bir qo'l lahzasini ko'tarishi kerak.",
        elements: ["Summa (klaviatura)", "Izoh (ixtiyoriy)", "Tasdiqlash"],
      },
    ],
    criticalFlow: {
      title: "Nasiya savdosini yozish (qiyinchiliksiz bo'lishi kerak bo'lgan amal)",
      taps: [
        "Ro'yxatda mijoz ismini bosing",
        "«Qarz qo'shish»ni bosing",
        "Klaviaturada summani kiriting",
        "«Tasdiqlash»ni bosing — balans yangilandi, ro'yxatga qaytdik",
      ],
    },
    localUx: [
      { label: "Qurilma haqiqati", detail: "3G'dagi arzon Android uchun: katta nishonlar, kam rasm, darhol optimistik yangilanishlar — yomon aloqa savdoni bloklamaydi." },
      { label: "Savodxonlik va qulaylik", detail: "Matndan ko'ra raqamlar, so'zlar yonida ikonkalar, deyarli yozuvsiz — asosiy amal forma emas, raqam klaviaturasi." },
      { label: "Til", detail: "Hamma joyda o'zbek (lotin) va rus, jumladan eslatma shablonlari. So'mlar bo'sh joy bilan (50 000), tiyinsiz." },
      { label: "Ishonch", detail: "Har bir balans o'zgarishi tarixda ko'rinadi — ega mijozga aniq qachon va qancha ekanini ko'rsatadi, bu nizolarni o'ldiradi." },
    ],
    keepOff: [
      "Ombor / tovar katalogi — bu POS emas, qarz daftari.",
      "Bosh ekranda grafiklar va tahlil — bitta raqam yetarli.",
      "Ko'p valyuta, soliq, cheklar — mahalla qarz daftariga aloqasiz.",
      "Ijtimoiy / mijoz hisoblari — MVPda faqat ega kiradi.",
    ],
    lookAndFeel:
      "Sokin, ishonchli, pulga jiddiy, ammo do'stona. Ijobiy (to'lov) uchun bitta iliq urg'u va muddati o'tgan uchun bosiq ogohlantirish ohangi. Yirik o'qiladigan raqamlar, keng oraliq, deyarli bezaksiz — fintex panel emas, tozaroq daftardek his qilinishi kerak.",
  },

  business: {
    model:
      "Do'konga oylik obuna. Mos keladi, chunki qiymat takrorlanuvchi (har savdo kuni hisobga olinadigan qarz yaratadi), egalar esa ijara va kommunal uchun allaqachon oylab o'ylaydi. O'rin bo'yicha emas (ega bitta) va bir martalik emas (eslatmalar sizga pul turadi).",
    willingnessToPay:
      "Narxni xarajatingizga emas, og'riqqa bog'lang. Isbotlay yoki undira olmagani uchun oyiga atigi bitta 100 000 so'mlik qarzni hisobdan chiqaradigan ega obunadan ko'p yo'qotadi. Narxni bitta qaytarilgan qarzning kichik ulushi sifatida belgilang, «ha» aniq bo'lsin.",
    painCost:
      "Egalar oyiga 100 000–500 000 so'm undirib bo'lmaydigan yoki nizoli nasiyani hisobdan chiqarishini aytadi. ~40 000 so'm/oy obuna ularning eng kichigidan ham yarmidan kam — bitta qarzni qaytarib o'zini oqlaydi.",
    pricing: [
      { name: "Bepul", price: "0 so'm", note: "Bitta do'kon, 30 mijozgacha, qo'lda eslatmalar. Qog'ozdan tushish yo'li." },
      { name: "Pro", price: "~40 000 so'm/oy", note: "Cheksiz mijoz, bir teginishli Telegram/SMS eslatma, muddati o'tganlar ro'yxati." },
      { name: "Plus", price: "~70 000 so'm/oy", note: "Xodim hisoblari, oylik hisobotlar va PDF/Excel eksportini qo'shadi." },
    ],
    payment:
      "Click yoki Payme orqali yig'ish — ikkalasi kundalik va ishonchli. Naqd/o'tkazma birinchi qo'lda sotilgan mijozlarga yaraydi, ammo masshtablanmaydi; Click/Payme'ni v3'gacha ulang. Ishqalanish: egalar Click orqali oylik to'lashga, xuddi telefon yoki kommunal to'ldirgandek, qulay.",
    unitEconomics: [
      { label: "Pro do'kon narxi", value: "40 000 so'm/oy", kind: "data" },
      { label: "Eslatma narxi (Telegram)", value: "≈ 0 so'm", kind: "data" },
      { label: "Eslatma narxi (SMS zaxira)", value: "~50 so'm dona, ~30/oy", kind: "assumption" },
      { label: "To'lov ekvayringi", value: "~2% Click/Payme orqali", kind: "assumption" },
      { label: "Xizmat narxi / do'kon", value: "~3 000 so'm/oy", kind: "assumption" },
      { label: "Yalpi marja / Pro do'kon", value: "~90%", kind: "assumption" },
    ],
    howEstimated:
      "Narx va Telegram narxi real. SMS hajmi, ekvayring stavkasi va xizmat narxi — o'xshash ilovalardan olingan taxminlar; 50 ta to'lovchi do'kon bo'lguncha ularni halol taxminlar deb biling.",
    pathToProfit:
      "Do'konga deyarli nol qo'shimcha xarajatda zararsizlik nuqtasi — bitta asoschining oddiy oylik xarajatini qoplash, taxminan 150–250 to'lovchi Pro do'kon. Bunday SOMda birinchi yilda erishiladi va real 6–9 oy «do'kondan-do'konga» sotuvni oladi.",
    gtm: [
      "Bitta bozor/mahallani oyoq bilan aylaning. «Eslatish»ni 10 ta egaga o'z telefonida ko'rsating — o'sha lahza sotadi.",
      "Birinchi do'konlarni bepul, shaxsan ulang va ularning birinchi 5 mijozini o'zingiz kiriting, daftar yarmi almashgan bo'lsin.",
      "Tavsiya ishlasin: har bir ega bir ko'cha bo'yidagi xuddi shunday ho'l daftarli o'nlab boshqasini biladi.",
      "Egalarning Telegram guruhlariga ikki teginishli qarz yozuvini ko'rsatadigan qisqa o'zbekcha demo videoni tashlang.",
    ],
    verdict:
      "Pul real va erishiladigan. Deyarli nol xizmat narxi, oylik og'riqdan ancha past narx va oyoq bilan yetib boriladigan mijoz — sog'lom, garchi jozibasiz bo'lsa-da, biznes.",
    breakeven: [
      { month: "1-oy", revenue: 10, cost: 80 },
      { month: "2-oy", revenue: 24, cost: 82 },
      { month: "3-oy", revenue: 45, cost: 85 },
      { month: "4-oy", revenue: 72, cost: 88 },
      { month: "5-oy", revenue: 96, cost: 92 },
      { month: "6-oy", revenue: 130, cost: 100 },
      { month: "7-oy", revenue: 168, cost: 108 },
      { month: "8-oy", revenue: 210, cost: 116 },
    ],
  },

  techStack: {
    glance: ["TypeScript", "Next.js (PWA)", "Supabase", "Telegram Bot API"],
    layers: [
      { layer: "Til", choice: "TypeScript", why: "Frontend va backendda bitta til — yakka quruvchi uchun kamroq kontekst almashinuvi." },
      { layer: "Frontend", choice: "Next.js (mobile-first PWA)", why: "Egalar telefon ishlatadi; PWA do'kon ishqalanishini chetlab, bir teginishda o'rnatiladi." },
      { layer: "Backend", choice: "Next.js API yo'llari", why: "MVP masshtabida alohida server yo'q; frontend bilan birga." },
      { layer: "Ma'lumotlar bazasi", choice: "Supabase orqali PostgreSQL", why: "Relyatsion ma'lumot (shops → customers → entries) mukammal yotadi; saxiy bepul tarif." },
      { layer: "Autentifikatsiya", choice: "Supabase Auth — telefon OTP", why: "Egalar telefon raqamlariga emaildan ko'ra ko'proq ishonadi; odatdagi kirishlariga mos." },
      { layer: "Kutubxonalar", choice: "TanStack Table · Recharts · date-fns · zod", why: "Qarz ro'yxatlari, jami grafigi, muddatlar va kirish tekshiruvi — har biri kunlarni tejaydi." },
      { layer: "Integratsiyalar", choice: "Telegram Bot API · Click/Payme", why: "Egalar yashaydigan kanaldagi eslatmalar; ular ishonadigan mahalliy to'lov tizimlari." },
      { layer: "Hosting", choice: "Vercel (veb) + Supabase (DB)", why: "Ikkalasida ham birinchi yuzlab do'kondan o'tkazadigan bepul tariflar bor." },
      { layer: "Vositalar", choice: "shadcn/ui · Drizzle ORM · Figma", why: "Tez, qulay komponentlar, tipga xavfsiz DB kirish va 3 ekran eskizi uchun joy." },
    ],
    integrations: ["Telegram Bot API (eslatmalar)", "Click / Payme (obunalar)", "SMS shlyuz (zaxira)"],
    monthlyCost: "MVPda bepul tariflarda $0; Supabase/Vercel limitidan keyin ~$25/oy.",
  },
};

const CONTENT: Record<Lang, Record<string, IdeaContent>> = {
  en: { nasiya: nasiyaEn },
  ru: { nasiya: nasiyaRu },
  uz: { nasiya: nasiyaUz },
};

export function getIdeaContent(id: string, lang: Lang = "en"): IdeaContent | undefined {
  return CONTENT[lang]?.[id] ?? CONTENT.en[id];
}
