# Chorsu — Dashboard Specification (for Claude Code)

> **Audience:** Claude Code. This spec covers the authenticated app area (the "ideas marketplace" dashboard) at `/app`.
> **Context:** The landing page is already built (`components/landing/`, `app/page.tsx`). Same single Next.js project. This is the next phase.
> **Approach: FRONTEND FIRST.** Build the full UI with mock data and a STUB sign-in (no real email/password yet). Real auth + database come later. The goal now is to see and feel the dashboard.

---

## 0. Build rules

1. **Single project.** Everything stays in the existing Chorsu Next.js app. Do NOT create a new project.
2. **Frontend only, mock data.** Ideas come from `lib/mock-ideas.ts`. No Supabase, no real database yet.
3. **Stub auth for now.** "Enter the bazaar" and "Log in" should go straight into the dashboard (`/app`) — no email/password form yet. Leave a clear `// TODO: real auth` marker where the real check will go later, so it's easy to add.
4. Stack: **Next.js 14 (App Router) + Tailwind + shadcn/ui**. Reuse the landing's color tokens and fonts for visual consistency.
5. **Mobile-first + responsive.** On mobile the sidebar collapses into a drawer/hamburger.
6. Respect `prefers-reduced-motion`, keyboard focus, contrast.
7. Build section by section, show each working, wait for confirmation.

---

## 1. Routing & file structure

The dashboard lives under a route group with its OWN layout, completely separate from the landing layout.

```
src/app/
├── layout.tsx              # root (fonts, theme) — already exists
├── page.tsx                # LANDING (/) — already exists
│
├── app/                    # DASHBOARD area
│   ├── layout.tsx          # ⭐ sidebar layout (wraps every /app page)
│   ├── page.tsx            # Ideas marketplace (/app)
│   ├── idea/[id]/page.tsx  # Single idea detail + unlock (/app/idea/123)
│   ├── saved/page.tsx      # Saved ideas (/app/saved)
│   └── settings/page.tsx   # Settings (/app/settings)
│
components/
├── landing/                # existing landing components
├── app/                    # NEW dashboard components
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── IdeaGrid.tsx
│   ├── IdeaCard.tsx
│   ├── IdeaDetail.tsx
│   ├── SearchBar.tsx
│   ├── FilterBar.tsx
│   └── QuickTabs.tsx
└── shared/                 # LanguageSwitcher, Button, etc.
```

**Wire up "Enter the bazaar" / "Log in":** for now both simply navigate (`router.push('/app')` or a `<Link href="/app">`). No form. Add `// TODO: replace with real auth` so it's obvious later.

---

## 2. Dashboard layout — VS Code / Power BI style

`app/app/layout.tsx` renders a **persistent left sidebar + top bar**, with the page content on the right. The sidebar and top bar stay fixed; only the right content changes between routes.

```
┌────────┬──────────────────────────────────────┐
│        │  TOP BAR: search · language · user    │
│ SIDE   ├──────────────────────────────────────┤
│ BAR    │                                       │
│        │                                       │
│ (nav)  │         PAGE CONTENT                  │
│        │   (ideas grid / idea detail /         │
│        │    saved / settings)                  │
│        │                                       │
│ ─────  │                                       │
│ ⚙ set  │                                       │
│ 👤 user │                                       │
└────────┴──────────────────────────────────────┘
```

### Sidebar contents (top → bottom)
**Top:**
- Chorsu logo (dome icon + wordmark) → links back to `/app`

**Main nav:**
- 🛍 **Ideas** (`/app`) — the marketplace (default/active)
- 🔖 **Saved** (`/app/saved`)
- 📂 **Sectors** — expandable list to filter by sector (Retail, Food, Education, Health, Services)

**Pinned to bottom (like VS Code):**
- ⚙️ **Settings** (`/app/settings`)
- 👤 **User** — avatar + name (mock: "Guest" for now) + plan badge ("Free")

### Sidebar behavior
- Active route highlighted (turquoise accent bar on the left edge of the active item).
- Collapsible: a toggle shrinks it to icons-only (like VS Code). Remember the collapsed state in React state (not localStorage — that's not supported here).
- Mobile: sidebar hidden by default, opens as a drawer via a hamburger in the top bar.

### Top bar contents
- Left: page title / breadcrumb (e.g. "Ideas", or "Ideas › Nasiya").
- Center/right: global search (can mirror the in-page search), language switcher (reuse the landing's `EN` switcher), user menu.

### Visual style
- Reuse the landing palette but in a calmer, more "workspace" register: warm cream/neutral surfaces, turquoise accents, terracotta for primary actions. Keep the heritage feel but lighter on ornament — this is a working tool, not a hero.
- A very faint girih pattern can sit in the sidebar footer or empty states as a quiet brand thread.

---

## 3. Ideas marketplace page (`/app`) — the heart

This is what the user sees first after entering. Layout order is psychologically tuned: orient → enable → show.

```
┌─────────────────────────────────────────────────┐
│ 1. HEADER: "Ideas" · "30+ ready-to-build ideas"  │
├─────────────────────────────────────────────────┤
│ 2. SEARCH BAR (wide)        🔍 Search ideas...   │
├─────────────────────────────────────────────────┤
│ 3. FILTER + SORT (one row)                        │
│    [Sector ▾] [Stack ▾] [Plan ▾]      Sort [▾]   │
├─────────────────────────────────────────────────┤
│ 4. QUICK TABS                                     │
│    [ All ] [ 🔥 Trending ] [ ✨ New ] [ 🔖 Saved ]│
├─────────────────────────────────────────────────┤
│ 5. RESULT COUNT + active filters                  │
│    Showing 24 ideas · Retail ✕                   │
├─────────────────────────────────────────────────┤
│ 6. IDEA GRID                                      │
│    [card] [card] [card]                          │
│    [card] [card] [card]                          │
├─────────────────────────────────────────────────┤
│ 7. Load more                                      │
└─────────────────────────────────────────────────┘
```

### Order rationale (build it in this order)
1. **Header with count first** — shows the bazaar is full of value, builds trust, never looks empty.
2. **Search** — for users who know what they want.
3. **Filter + Sort** — for browsers narrowing down (sector, stack, plan; sort by Newest / Trending / Most saved).
4. **Quick tabs** — Trending & New first to guide undecided users (social proof + FOMO); Saved on the right for returning users.
5. **Result count** — keeps the user oriented.
6. **Grid** — show the goods. **Put the strongest ideas first** — the first card sets the impression of the whole marketplace.

### Idea card (`IdeaCard.tsx`)
Each card shows:
- Sector tag (colored pill)
- Idea name (bold)
- One-line problem statement
- Small meta row: stack hint + a lock/lantern badge if the plan doesn't include it
- 🔖 Save toggle (top-right corner) — toggles saved state (mock state for now)
- Hover (desktop): gentle lift + warm glow + lattice shimmer on the locked part
- Click → `/app/idea/[id]`

---

## 4. Idea detail page (`/app/idea/[id]`) — the unlock

When a user opens an idea, they see its full blueprint. This is the paid value.

Layout:
- **Header:** idea name, sector tag, Save toggle, "Copy as JSON" button.
- **Switchable views** (tabs or stacked sections):
  - **Problem** — the local pain point
  - **Solution** — the product concept
  - **Database** — tables + fields, cleanly rendered (monospace blocks or a simple table view)
  - **API** — endpoints: method · path · purpose
  - **Monetization** — how to sell it locally (Click/Payme/subscription)
- **Access state:** for now everything is unlocked (mock). Leave a `// TODO: gate by plan` marker where the paywall will go (show Problem + Solution free, lock the rest) — so it's easy to add after auth.
- **Copy/Export:** "Copy database schema" and "Copy API" buttons copy clean JSON to clipboard.

---

## 5. Saved page (`/app/saved`)
- Same grid as the marketplace, filtered to saved ideas (mock state).
- Empty state: a friendly, on-brand message with a faint girih motif — "No saved ideas yet. Wander the stalls and bookmark the ones you like." + a button back to `/app`.

---

## 6. Settings page (`/app/settings`)
Keep it simple for now (mostly placeholders, since no real auth/DB yet):
- **Profile:** name, email (read-only placeholder).
- **Language:** EN / RU / UZ toggle (reuse the language system).
- **Plan:** current plan badge + "Upgrade" button (routes to pricing, no payment yet).
- **Appearance:** light/dark toggle (optional, only if quick).
- Mark non-functional bits with `// TODO` so they're easy to wire later.

---

## 7. Mock data (`lib/mock-ideas.ts`)
Define ~12–15 mock ideas (so the grid, filters, and tabs feel real). Each idea object:
```ts
{
  id: string,
  name: string,           // e.g. "Nasiya"
  sector: string,         // Retail | Food | Education | Health | Services
  problem: string,        // one line + longer version
  solution: string,
  dbSchema: object,       // tables/fields (for the Database view + Copy JSON)
  apiEndpoints: object,   // method/path/purpose list
  monetization: string,
  stack?: string,         // hint e.g. "Next.js + Supabase"
  minPlan: 'free' | 'pro' | 'team',
  isTrending?: boolean,
  isNew?: boolean,
}
```
Seed at least these (reuse landing's six + add more): Nasiya, Smena, Davomat, Dorixona, Yetkaz, Sodiq, plus ~6 more across the sectors. Make them genuinely specific, not generic.

---

## 8. Build order (stop after each)
1. **Dashboard layout** — sidebar + top bar shell, with `/app` showing a placeholder. Wire "Enter the bazaar" / "Log in" to navigate here (stub auth). **🛑 Show it.**
2. **Ideas marketplace page** — header, search, filter, sort, quick tabs, result count, idea grid with cards. **🛑 Show it.**
3. **Idea detail page** — full unlock view with tabs + Copy JSON. **🛑 Show it.**
4. **Saved page** — saved grid + empty state. **🛑 Show it.**
5. **Settings page** — placeholders. **🛑 Show it.**

---

## 9. Done checklist
- [ ] `/app` has a persistent VS Code-style sidebar (nav top, Settings + user pinned bottom).
- [ ] Sidebar collapses to icons; mobile drawer works.
- [ ] "Enter the bazaar" and "Log in" navigate straight to `/app` (stub auth, `// TODO` left for real auth).
- [ ] Ideas page follows the tuned order: header → search → filter/sort → tabs → count → grid.
- [ ] Idea cards: save toggle, lock badge, hover, click to detail.
- [ ] Idea detail: Problem/Solution/Database/API/Monetization views + Copy JSON, `// TODO` for plan gating.
- [ ] Saved page + friendly empty state.
- [ ] Settings placeholders with `// TODO`s.
- [ ] Mobile-first, keyboard focus, reduced-motion respected.
- [ ] Visual style consistent with the landing (heritage palette, lighter ornament).

**🛑 Frontend first. No real auth, no database yet — those come in the next phase. Show each step before moving on.**
