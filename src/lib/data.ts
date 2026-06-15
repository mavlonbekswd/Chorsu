export type Idea = {
  slug: string;
  name: string;
  sector: "Retail" | "Food" | "Education" | "Health" | "Services";
  problem: string;
};

// Section 3 — Today's stalls (the goods on display)
export const ideas: Idea[] = [
  {
    slug: "nasiya",
    name: "Nasiya",
    sector: "Retail",
    problem: "Digital credit ledger for neighborhood shops. Retire the paper debt notebook.",
  },
  {
    slug: "smena",
    name: "Smena",
    sector: "Food",
    problem: "Shift & staff scheduler for cafes, with auto-calculated hours.",
  },
  {
    slug: "davomat",
    name: "Davomat",
    sector: "Education",
    problem: "Attendance + tuition tracker for learning centers, with parent alerts.",
  },
  {
    slug: "dorixona",
    name: "Dorixona",
    sector: "Health",
    problem: "Inventory + expiry alerts for small pharmacies.",
  },
  {
    slug: "yetkaz",
    name: "Yetkaz",
    sector: "Services",
    problem: "Order & dispatch CRM for cleaning, moving, and repair crews.",
  },
  {
    slug: "sodiq",
    name: "Sodiq",
    sector: "Retail",
    problem: "Telegram-mini-app loyalty program for local stores.",
  },
];

// Section 4 — Inside a stall (Nasiya unlocked). Real, specific content.
export type SchemaTable = {
  name: string;
  fields: { name: string; type: string; note?: string }[];
};

export type Endpoint = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  purpose: string;
};

export const nasiyaDetail = {
  need: [
    "Neighborhood shops sell on credit — \"nasiya\" — and track it in a paper notebook (daftar). Pages get wet, names blur, and disputes start with \"I already paid that.\"",
    "Owners can't see who owes the most, who is overdue, or how much money is frozen in debt at any moment.",
    "When a customer travels or the shop changes hands, the ledger's memory walks out the door.",
  ],
  design: [
    "A phone-first ledger: add a customer, record a sale on credit in two taps, log repayments as they come.",
    "Each customer has a running balance and a history. A one-tap reminder goes out over Telegram or SMS in Uzbek or Russian.",
    "A dashboard shows total outstanding, overdue accounts, and today's repayments — the daftar, but it can do math and never forgets.",
  ],
  schema: [
    {
      name: "customers",
      fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "shop_id", type: "uuid", note: "→ shops.id" },
        { name: "name", type: "text" },
        { name: "phone", type: "text", note: "for reminders" },
        { name: "balance", type: "numeric", note: "cached outstanding" },
        { name: "created_at", type: "timestamptz" },
      ],
    },
    {
      name: "ledger_entries",
      fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "customer_id", type: "uuid", note: "→ customers.id" },
        { name: "type", type: "enum", note: "'credit' | 'repayment'" },
        { name: "amount", type: "numeric" },
        { name: "note", type: "text", note: "e.g. \"2 sacks flour\"" },
        { name: "created_at", type: "timestamptz" },
      ],
    },
    {
      name: "reminders",
      fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "customer_id", type: "uuid", note: "→ customers.id" },
        { name: "channel", type: "enum", note: "'telegram' | 'sms'" },
        { name: "sent_at", type: "timestamptz" },
        { name: "status", type: "enum", note: "'sent' | 'failed'" },
      ],
    },
  ] as SchemaTable[],
  endpoints: [
    { method: "POST", path: "/api/customers", purpose: "Add a customer to the ledger" },
    { method: "GET", path: "/api/customers", purpose: "List customers with running balances" },
    { method: "POST", path: "/api/customers/:id/entries", purpose: "Record a credit sale or a repayment" },
    { method: "GET", path: "/api/customers/:id/entries", purpose: "Full history for one customer" },
    { method: "POST", path: "/api/customers/:id/remind", purpose: "Send a debt reminder over Telegram/SMS" },
    { method: "GET", path: "/api/dashboard", purpose: "Totals: outstanding, overdue, today's repayments" },
  ] as Endpoint[],
  trade: [
    "Free for one shop up to 30 customers — let the owner retire the notebook and feel it work.",
    "Pro at ~30,000 so'm/month: unlimited customers, Telegram reminders, and the overdue dashboard.",
    "Take a small fee per automated reminder delivered, billed through Payme or Click.",
    "Sell shop-to-shop: every owner knows ten others on the same street with the same wet notebook.",
  ],
};

// Section 6 — Choose your caravan (pricing)
export const caravans = [
  {
    name: "Wanderer",
    tagline: "Free",
    price: "0",
    unit: "",
    highlighted: false,
    blurb: "Walk the whole bazaar and open a few stalls in full.",
    features: [
      "Browse all stalls in the catalog",
      "A handful of ideas fully unlocked",
      "Sector & stack filters",
      "Weekly highlights newsletter",
    ],
    cta: "Start wandering",
  },
  {
    name: "Merchant",
    tagline: "Most chosen",
    price: "79,000",
    unit: "so'm / mo",
    highlighted: true,
    blurb: "Every idea open, with fresh goods arriving each week.",
    features: [
      "Every idea fully unlocked",
      "Full architecture: DB, API, monetization",
      "New market-specific ideas weekly",
      "Click & Payme integration blueprints",
      "Save and organize your shortlist",
    ],
    cta: "Become a merchant",
  },
  {
    name: "Caravan",
    tagline: "Team",
    price: "249,000",
    unit: "so'm / mo",
    highlighted: false,
    blurb: "For bootcamps and agencies travelling together.",
    features: [
      "Everything in Merchant",
      "Up to 10 seats",
      "Shared workspace & shortlists",
      "Priority on new-idea requests",
      "Invoice billing",
    ],
    cta: "Assemble a caravan",
  },
];
