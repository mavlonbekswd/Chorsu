// Mock catalog for the dashboard (frontend-first). No DB yet.
// Each idea carries enough to render the grid AND the step-3 unlock view.

export type Sector = "Retail" | "Food" | "Education" | "Health" | "Services";
export type Plan = "free" | "pro" | "team";

export type SchemaField = { name: string; type: string; note?: string };
export type SchemaTable = { name: string; fields: SchemaField[] };
export type Endpoint = { method: "GET" | "POST" | "PATCH" | "DELETE"; path: string; purpose: string };

export type Idea = {
  id: string;
  name: string;
  sector: Sector;
  problem: string; // one line, for cards
  problemLong: string;
  solution: string;
  dbSchema: SchemaTable[];
  apiEndpoints: Endpoint[];
  monetization: string;
  stack: string;
  minPlan: Plan;
  saves: number;
  isTrending?: boolean;
  isNew?: boolean;
};

export const SECTORS: Sector[] = ["Retail", "Food", "Education", "Health", "Services"];
export const PLANS: Plan[] = ["free", "pro", "team"];

export const ideas: Idea[] = [
  {
    id: "nasiya",
    name: "Nasiya",
    sector: "Retail",
    problem: "Digital credit ledger for neighborhood shops. Retire the paper debt notebook.",
    problemLong:
      "Neighborhood shops sell on credit and track it in a paper notebook (daftar). Pages get wet, names blur, disputes start with \"I already paid.\" Owners can't see who's overdue or how much money is frozen in debt.",
    solution:
      "A phone-first ledger: add a customer, record a credit sale in two taps, log repayments. Each customer has a running balance and a one-tap Telegram/SMS reminder; a dashboard shows total outstanding and overdue accounts.",
    dbSchema: [
      { name: "customers", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "shop_id", type: "uuid", note: "→ shops.id" },
        { name: "name", type: "text" },
        { name: "phone", type: "text" },
        { name: "balance", type: "numeric", note: "cached outstanding" },
      ]},
      { name: "ledger_entries", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "customer_id", type: "uuid", note: "→ customers.id" },
        { name: "type", type: "enum", note: "'credit' | 'repayment'" },
        { name: "amount", type: "numeric" },
        { name: "created_at", type: "timestamptz" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/customers", purpose: "Add a customer to the ledger" },
      { method: "POST", path: "/api/customers/:id/entries", purpose: "Record a credit sale or repayment" },
      { method: "POST", path: "/api/customers/:id/remind", purpose: "Send a debt reminder over Telegram/SMS" },
      { method: "GET", path: "/api/dashboard", purpose: "Totals: outstanding, overdue, today's repayments" },
    ],
    monetization:
      "Free for one shop up to 30 customers; Pro ~30,000 so'm/mo for unlimited customers + Telegram reminders. Small fee per automated reminder via Payme/Click.",
    stack: "Telegram mini-app",
    minPlan: "free",
    saves: 412,
    isTrending: true,
  },
  {
    id: "smena",
    name: "Smena",
    sector: "Food",
    problem: "Shift & staff scheduler for cafes, with auto-calculated hours.",
    problemLong:
      "Cafe owners build shift rosters on paper or in group chats, then argue over hours at payday. There's no clean record of who worked when.",
    solution:
      "Drag-and-drop weekly roster, staff confirm shifts on their phone, hours and pay are auto-calculated, and a timesheet exports at month end.",
    dbSchema: [
      { name: "staff", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "venue_id", type: "uuid", note: "→ venues.id" },
        { name: "name", type: "text" },
        { name: "hourly_rate", type: "numeric" },
      ]},
      { name: "shifts", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "staff_id", type: "uuid", note: "→ staff.id" },
        { name: "starts_at", type: "timestamptz" },
        { name: "ends_at", type: "timestamptz" },
        { name: "status", type: "enum", note: "'planned' | 'confirmed' | 'done'" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/shifts", purpose: "Create or assign a shift" },
      { method: "PATCH", path: "/api/shifts/:id", purpose: "Confirm or edit a shift" },
      { method: "GET", path: "/api/timesheet", purpose: "Monthly hours and pay per staff" },
    ],
    monetization: "Per-venue subscription ~50,000 so'm/mo, scaling by headcount. Free for venues under 4 staff.",
    stack: "Next.js + Supabase",
    minPlan: "pro",
    saves: 188,
  },
  {
    id: "davomat",
    name: "Davomat",
    sector: "Education",
    problem: "Attendance + tuition tracker for learning centers, with parent alerts.",
    problemLong:
      "Private learning centers track attendance and tuition in spreadsheets; parents only hear about missed classes or unpaid months too late.",
    solution:
      "Teachers mark attendance in one tap; parents get a Telegram alert when a child misses class or a payment is due. Admins see who has paid at a glance.",
    dbSchema: [
      { name: "students", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "group_id", type: "uuid", note: "→ groups.id" },
        { name: "parent_phone", type: "text" },
        { name: "monthly_fee", type: "numeric" },
      ]},
      { name: "attendance", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "student_id", type: "uuid", note: "→ students.id" },
        { name: "date", type: "date" },
        { name: "present", type: "boolean" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/attendance", purpose: "Mark a group's attendance for a day" },
      { method: "POST", path: "/api/students/:id/invoice", purpose: "Raise a monthly tuition invoice" },
      { method: "GET", path: "/api/groups/:id/report", purpose: "Attendance + payment status for a group" },
    ],
    monetization: "Per-center plan by student count; parent SMS alerts billed as a small add-on.",
    stack: "Telegram bot + Postgres",
    minPlan: "pro",
    saves: 96,
    isNew: true,
  },
  {
    id: "dorixona",
    name: "Dorixona",
    sector: "Health",
    problem: "Inventory + expiry alerts for small pharmacies.",
    problemLong:
      "Small pharmacies lose money to expired stock and run out of fast movers because counting is manual and irregular.",
    solution:
      "Scan-in stock with batch + expiry, get alerts 60/30/7 days before expiry, and a low-stock reorder list ranked by sales velocity.",
    dbSchema: [
      { name: "products", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "name", type: "text" },
        { name: "reorder_level", type: "int" },
      ]},
      { name: "batches", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "product_id", type: "uuid", note: "→ products.id" },
        { name: "qty", type: "int" },
        { name: "expires_on", type: "date" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/batches", purpose: "Receive stock with batch + expiry" },
      { method: "GET", path: "/api/alerts/expiry", purpose: "Items expiring within a window" },
      { method: "GET", path: "/api/alerts/reorder", purpose: "Low stock ranked by velocity" },
    ],
    monetization: "Flat monthly per pharmacy; multi-branch tier for small chains.",
    stack: "Next.js + Supabase",
    minPlan: "pro",
    saves: 74,
  },
  {
    id: "yetkaz",
    name: "Yetkaz",
    sector: "Services",
    problem: "Order & dispatch CRM for cleaning, moving, and repair crews.",
    problemLong:
      "Service crews take jobs over phone and Telegram with no shared board; double-bookings and forgotten jobs are common.",
    solution:
      "A shared job board: intake an order, assign a crew, track status from booked → on the way → done, and message the customer at each step.",
    dbSchema: [
      { name: "jobs", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "customer_phone", type: "text" },
        { name: "crew_id", type: "uuid", note: "→ crews.id" },
        { name: "status", type: "enum", note: "'booked'|'enroute'|'done'" },
        { name: "scheduled_for", type: "timestamptz" },
      ]},
      { name: "crews", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "name", type: "text" },
        { name: "active", type: "boolean" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/jobs", purpose: "Intake a new job" },
      { method: "PATCH", path: "/api/jobs/:id/assign", purpose: "Assign or reassign a crew" },
      { method: "PATCH", path: "/api/jobs/:id/status", purpose: "Advance job status + notify customer" },
    ],
    monetization: "Per-seat for dispatchers; SMS/Telegram notifications metered.",
    stack: "Next.js + Supabase",
    minPlan: "team",
    saves: 203,
    isTrending: true,
  },
  {
    id: "sodiq",
    name: "Sodiq",
    sector: "Retail",
    problem: "Telegram-mini-app loyalty program for local stores.",
    problemLong:
      "Local stores have no easy way to reward repeat customers; paper punch cards get lost and don't tell the owner anything.",
    solution:
      "Customers join via a Telegram mini-app, earn stamps per purchase, and redeem rewards. The owner sees who their regulars are and can push offers.",
    dbSchema: [
      { name: "members", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "telegram_id", type: "bigint" },
        { name: "stamps", type: "int" },
      ]},
      { name: "rewards", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "title", type: "text" },
        { name: "stamp_cost", type: "int" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/members/:id/stamp", purpose: "Add a stamp on purchase" },
      { method: "POST", path: "/api/members/:id/redeem", purpose: "Redeem a reward" },
      { method: "POST", path: "/api/broadcast", purpose: "Push an offer to members" },
    ],
    monetization: "Freemium: free up to 100 members, paid tiers add broadcasts + analytics.",
    stack: "Telegram mini-app",
    minPlan: "free",
    saves: 134,
  },
  {
    id: "osh",
    name: "Osh",
    sector: "Food",
    problem: "QR menu & table ordering for cafes — no waiter app needed.",
    problemLong:
      "Cafes lose table turns waiting for a waiter to take and relay orders; printed menus go stale and can't show what's sold out.",
    solution:
      "Each table has a QR; guests browse the live menu, order, and call the bill from their phone. Orders print to the kitchen instantly; 86'd items hide automatically.",
    dbSchema: [
      { name: "menu_items", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "name", type: "text" },
        { name: "price", type: "numeric" },
        { name: "available", type: "boolean" },
      ]},
      { name: "orders", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "table_no", type: "int" },
        { name: "status", type: "enum", note: "'open'|'sent'|'paid'" },
      ]},
    ],
    apiEndpoints: [
      { method: "GET", path: "/api/menu", purpose: "Live menu for a venue" },
      { method: "POST", path: "/api/orders", purpose: "Place an order from a table" },
      { method: "POST", path: "/api/orders/:id/bill", purpose: "Request the bill" },
    ],
    monetization: "Per-venue monthly; optional Payme/Click pay-at-table take rate.",
    stack: "Next.js + Supabase",
    minPlan: "pro",
    saves: 151,
    isNew: true,
  },
  {
    id: "repetitor",
    name: "Repetitor",
    sector: "Education",
    problem: "Booking & payments for private tutors and their students.",
    problemLong:
      "Private tutors juggle lesson times across chats and chase payments manually, with no record of hours taught.",
    solution:
      "Students book lesson slots from the tutor's calendar, pay per lesson or by package, and both sides see a clean history of sessions and balances.",
    dbSchema: [
      { name: "lessons", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "tutor_id", type: "uuid", note: "→ tutors.id" },
        { name: "student_id", type: "uuid", note: "→ students.id" },
        { name: "starts_at", type: "timestamptz" },
        { name: "paid", type: "boolean" },
      ]},
      { name: "packages", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "student_id", type: "uuid", note: "→ students.id" },
        { name: "lessons_left", type: "int" },
      ]},
    ],
    apiEndpoints: [
      { method: "GET", path: "/api/tutors/:id/slots", purpose: "Open slots for a tutor" },
      { method: "POST", path: "/api/lessons", purpose: "Book a lesson" },
      { method: "POST", path: "/api/lessons/:id/pay", purpose: "Pay for a lesson or package" },
    ],
    monetization: "Take a small percentage of each booking; free for tutors under 5 students.",
    stack: "Next.js + Supabase",
    minPlan: "free",
    saves: 67,
  },
  {
    id: "shifo",
    name: "Shifo",
    sector: "Health",
    problem: "Appointment booking + reminders for small clinics.",
    problemLong:
      "Small clinics book by phone, lose no-shows to forgotten times, and have no waitlist when a slot frees up.",
    solution:
      "Patients book online or by phone into a shared calendar, get reminder messages, and a waitlist auto-fills cancellations.",
    dbSchema: [
      { name: "appointments", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "doctor_id", type: "uuid", note: "→ doctors.id" },
        { name: "patient_phone", type: "text" },
        { name: "starts_at", type: "timestamptz" },
        { name: "status", type: "enum", note: "'booked'|'done'|'no_show'" },
      ]},
      { name: "doctors", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "name", type: "text" },
        { name: "specialty", type: "text" },
      ]},
    ],
    apiEndpoints: [
      { method: "GET", path: "/api/doctors/:id/slots", purpose: "Available slots" },
      { method: "POST", path: "/api/appointments", purpose: "Book an appointment" },
      { method: "POST", path: "/api/appointments/:id/remind", purpose: "Send a reminder" },
    ],
    monetization: "Per-clinic subscription; reminder messages metered.",
    stack: "Next.js + Supabase",
    minPlan: "pro",
    saves: 119,
    isTrending: true,
  },
  {
    id: "usta",
    name: "Usta",
    sector: "Services",
    problem: "On-demand dispatch for electricians, plumbers, and handymen.",
    problemLong:
      "Households can't find a trusted master (usta) quickly, and independent masters have no steady stream of jobs.",
    solution:
      "Customers post a job with photos; nearby vetted masters accept, quote, and complete; ratings build trust over time.",
    dbSchema: [
      { name: "requests", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "category", type: "text", note: "electric/plumbing/…" },
        { name: "district", type: "text" },
        { name: "status", type: "enum", note: "'open'|'taken'|'done'" },
      ]},
      { name: "masters", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "skills", type: "text[]" },
        { name: "rating", type: "numeric" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/requests", purpose: "Post a job request" },
      { method: "POST", path: "/api/requests/:id/accept", purpose: "Master accepts a job" },
      { method: "POST", path: "/api/requests/:id/rate", purpose: "Rate after completion" },
    ],
    monetization: "Lead fee per accepted job, or a master subscription for unlimited leads.",
    stack: "React Native + Supabase",
    minPlan: "team",
    saves: 88,
  },
  {
    id: "ombor",
    name: "Ombor",
    sector: "Retail",
    problem: "Stock counts & supplier reorders for kiosks and minimarkets.",
    problemLong:
      "Kiosk owners reorder by memory, over-buy slow stock, and run out of bestsellers between supplier visits.",
    solution:
      "A fast stock count on the phone builds a reorder list per supplier, with suggested quantities from recent sales.",
    dbSchema: [
      { name: "items", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "name", type: "text" },
        { name: "supplier_id", type: "uuid", note: "→ suppliers.id" },
        { name: "on_hand", type: "int" },
      ]},
      { name: "orders", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "supplier_id", type: "uuid", note: "→ suppliers.id" },
        { name: "placed_at", type: "timestamptz" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/count", purpose: "Submit a stock count" },
      { method: "GET", path: "/api/reorder/:supplierId", purpose: "Suggested reorder for a supplier" },
      { method: "POST", path: "/api/orders", purpose: "Place a supplier order" },
    ],
    monetization: "Monthly per store; chains pay per location.",
    stack: "Telegram mini-app",
    minPlan: "pro",
    saves: 54,
  },
  {
    id: "nonvoy",
    name: "Nonvoy",
    sector: "Food",
    problem: "Daily pre-orders for bakeries — bake to demand, not to waste.",
    problemLong:
      "Bakeries guess how much to bake and either sell out early or throw away unsold bread at night.",
    solution:
      "Regulars reserve tomorrow's bread and pastries by an evening cutoff; the baker sees exact quantities and a pickup list for the morning.",
    dbSchema: [
      { name: "preorders", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "customer_phone", type: "text" },
        { name: "for_date", type: "date" },
        { name: "picked_up", type: "boolean" },
      ]},
      { name: "preorder_items", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "preorder_id", type: "uuid", note: "→ preorders.id" },
        { name: "product", type: "text" },
        { name: "qty", type: "int" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/preorders", purpose: "Reserve items for a date" },
      { method: "GET", path: "/api/bake-list", purpose: "Quantities to bake for tomorrow" },
      { method: "POST", path: "/api/preorders/:id/pickup", purpose: "Mark as collected" },
    ],
    monetization: "Small monthly fee; optional prepay via Payme reduces no-shows.",
    stack: "Telegram bot + Postgres",
    minPlan: "free",
    saves: 41,
    isNew: true,
  },
  {
    id: "maktab",
    name: "Maktab",
    sector: "Education",
    problem: "School–parent comms and fee collection in one channel.",
    problemLong:
      "Schools spread announcements across many parent chats and collect fees in cash with messy records.",
    solution:
      "One official channel per class for announcements and homework, plus tracked fee requests parents can pay online.",
    dbSchema: [
      { name: "classes", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "name", type: "text" },
        { name: "teacher_id", type: "uuid", note: "→ teachers.id" },
      ]},
      { name: "fees", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "student_id", type: "uuid", note: "→ students.id" },
        { name: "amount", type: "numeric" },
        { name: "paid", type: "boolean" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/classes/:id/announce", purpose: "Post an announcement" },
      { method: "POST", path: "/api/fees", purpose: "Raise a fee request" },
      { method: "POST", path: "/api/fees/:id/pay", purpose: "Pay a fee online" },
    ],
    monetization: "Per-school license; payment processing take rate on fees.",
    stack: "Next.js + Supabase",
    minPlan: "team",
    saves: 38,
  },
  {
    id: "tozalik",
    name: "Tozalik",
    sector: "Services",
    problem: "Recurring home-cleaning subscriptions with a fixed crew.",
    problemLong:
      "Households want the same trusted cleaner on a regular schedule, but bookings are one-off and crews lack predictable income.",
    solution:
      "Weekly or biweekly plans assign a consistent cleaner, auto-schedule visits, and bill the subscription each cycle.",
    dbSchema: [
      { name: "subscriptions", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "household_id", type: "uuid", note: "→ households.id" },
        { name: "cadence", type: "enum", note: "'weekly'|'biweekly'" },
        { name: "cleaner_id", type: "uuid", note: "→ cleaners.id" },
      ]},
      { name: "visits", fields: [
        { name: "id", type: "uuid", note: "primary key" },
        { name: "subscription_id", type: "uuid", note: "→ subscriptions.id" },
        { name: "scheduled_for", type: "timestamptz" },
        { name: "status", type: "enum", note: "'planned'|'done'|'skipped'" },
      ]},
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/subscriptions", purpose: "Start a cleaning plan" },
      { method: "GET", path: "/api/visits/upcoming", purpose: "Upcoming visits for a cleaner" },
      { method: "POST", path: "/api/visits/:id/done", purpose: "Mark a visit complete" },
    ],
    monetization: "Margin on each subscription cycle; premium for same-cleaner guarantee.",
    stack: "Next.js + Supabase",
    minPlan: "pro",
    saves: 29,
  },
];

export const STACKS: string[] = Array.from(new Set(ideas.map((i) => i.stack))).sort();

export function getIdea(id: string): Idea | undefined {
  return ideas.find((i) => i.id === id);
}
