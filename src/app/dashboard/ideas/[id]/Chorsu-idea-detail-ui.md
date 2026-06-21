# Chorsu — Idea Detail Page UI Spec (for Claude Code)

> **Audience:** Claude Code. This is the complete visual/UI spec for the idea detail page at `/dashboard/ideas/[id]`.
> **Read this first — the core principle:**
> **The page TEMPLATE is identical for every idea. The CONTENT inside changes per idea.**
> You build ONE `IdeaDetailPage` component. It reads an idea's data object and renders it. Nasiya's roadmap/diagram/pricing differ from Smena's or Savdo's — but the layout, the polish, the interactions are the same. Build the template beautifully once; every idea inherits that beauty. Each idea's specific architecture (ER diagram, screens, roadmap steps, pricing) lives in its DATA, not in the page code.

---

## 0. Build rules

1. **One template, data-driven.** `IdeaDetailPage` renders from an idea data object (`lib/idea-content/[id].ts`). Never hardcode idea-specific content in the page component.
2. **Mock data for now.** Fully fill ONE idea (Nasiya) so the page can be judged. No database yet.
3. **Visual-first.** Market, System Design, Roadmap, Business lead with a visual (chart/diagram/timeline); text supports it.
4. **Match the re-skinned dashboard** — same smooth palette (soft neutral light / warm-charcoal dark, turquoise + terracotta accents), same fonts (serif for titles, sans for body).
5. **Mobile-first + responsive.** Tabs scroll horizontally on mobile; visuals stack.
6. **Premium gating:** stub for now (`// TODO: gate by plan`) — show locked previews, don't enforce.

---

## 1. Overall page anatomy

```
┌──────────────────────────────────────────────────────────┐
│ ← Back to ideas                                            │
│ ┌─ HEADER BLOCK ───────────────────────────────────────┐  │
│ │ [Sector] [Stack] [PRO]              [Save] [Copy JSON]│  │
│ │ Idea Name  (large serif)                             │  │
│ │ One-line hook (muted)                                │  │
│ └──────────────────────────────────────────────────────┘  │
│ ┌─ TAB BAR (sticky) ───────────────────────────────────┐  │
│ │ Overview · Market · System · Roadmap · Design ·      │  │
│ │ Business · Tech Stack · Reference                    │  │
│ └──────────────────────────────────────────────────────┘  │
│ ┌─ ACTIVE SECTION ─────────────────────────────────────┐  │
│ │  [Visual leads]                                      │  │
│ │  [Supporting text]                                   │  │
│ └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Header block (visual detail)
- **Back link** — small, muted, with a left-arrow icon. Top of the page.
- **Tag row** — sector pill (colored by sector), stack pill (neutral), plan pill (PRO = warm/terracotta tint). Pills are small, rounded-md, subtle backgrounds with same-family dark text.
- **Idea name** — large elegant serif (~28px), the visual anchor of the page.
- **Hook** — one muted line under the name (~15px secondary text).
- **Actions (right side):** "Save" (bookmark icon, toggles filled state) and "Copy JSON" (copy icon). Outline buttons, calm.
- Header sits in a soft surface card with a fine border and generous padding.

### Tab bar (visual detail)
- Horizontal, **sticky** under the header on scroll.
- Active tab: solid accent (dark pill in light mode / light pill in dark mode) OR an underline accent in turquoise — pick one and stay consistent.
- Locked premium tabs: show a tiny lock icon after the label, slightly muted.
- Free tab (Overview): no lock.
- On mobile: horizontally scrollable, no wrapping chaos; current tab auto-scrolls into view.
- Smooth content cross-fade when switching tabs (respect reduced-motion).

---

## 2. Section-by-section visual design

Each section leads with its hero visual, then supporting text. All visuals are rendered in-app (SVG/React diagrams; Recharts for charts).

### Overview (Free)
- **Hero:** a clean summary card — problem in one sentence, solution in one sentence, set side by side or stacked with a subtle divider.
- **"What you'll get" list** — the conversion driver. A vertical list of every premium section with a one-line value each, each row with an icon and a small lock badge. This shows the depth before paywall.
- Tone: inviting, confident. This is the only fully-open section, so it must sell the rest.

### Market (Premium)
- **Hero visual:** a TAM/SAM/SOM funnel (three nested/stacked bars shrinking down) + optionally a small positioning chart.
- Below: customer description, sizing reasoning, demand signals (quotes), "why now," honest verdict.
- Use 2 color stops max; label assumptions visibly.

### System Design (Premium) — centerpiece
- **Hero visual 1:** architecture diagram — clean boxes-and-arrows (client → API → DB → integrations). Generous spacing, rounded boxes, labeled arrows.
- **Hero visual 2:** ER diagram — entities as boxes with their fields, relationship lines between them.
- Below: request-flow sequence, key decisions + trade-offs, "the hard parts," how it evolves v0→v3.
- This is the richest section — give it room.

### Roadmap (Premium) — the thing they pay for
- **Hero visual:** a vertical timeline, v0 → v1 → v2 → v3. Each version is a node (circle with version label) connected by a line, with a card beside it.
- Each version card shows: goal, build steps (ordered), "done when," rough effort, "skip for now."
- Completed/early versions can use a filled accent node; later ones outlined.
- This is the most important visual on the page — make the timeline feel like a clear path, not a list.

### Design & Screens (Premium)
- **Hero visual:** wireframe thumbnails of the key screens (login, dashboard, core flow) in a row — simple framed boxes representing each screen layout.
- **Critical-flow strip:** the tap-by-tap path of the core action (e.g. "record a debt in 3 taps") as a small left-to-right step sequence.
- Below: local UX decisions, "what to keep off screen," look & feel note.

### Business & Pricing (Premium)
- **Hero visual:** a break-even chart (customers on x, profit crossing zero) via Recharts + a small price-anchoring visual (cost-of-pain bar vs. price bar).
- Below: monetization model, willingness-to-pay anchoring, pricing tiers, labeled-assumption unit economics, first-10-customers GTM, verdict.

### Tech Stack (Premium)
- **Hero:** "stack at a glance" badge row (4–5 headline choices as pills).
- Below: stack grouped by layer (Language → Frontend → Backend → DB → Auth → Libraries → Integrations → Hosting → Tools), each row = tool name + one-line "why." Monthly cost line at the end.

### Reference (Premium — understated, last)
- DB schema + API endpoints in clean monospace blocks. Framed as "the easy part." Copy-as-JSON buttons. Intentionally plainer than the sections above.

---

## 3. Premium locked-preview state (visual)

For premium sections when not unlocked:
- Show the **hero visual partially** — e.g. the roadmap shows v0–v3 nodes exist, but the step details are blurred/faded.
- Overlay a centered lock card: lock icon + "Unlock with Pro" + one line on what's inside + a button.
- The preview must reveal *enough to create desire* (the structure) but withhold the *substance* (the specifics).
- Keep it tasteful — a soft blur and a calm overlay, not an aggressive wall.

---

## 4. The data contract (how content stays per-idea)

The page renders entirely from one object. Each idea supplies its own:

```ts
// lib/idea-content/nasiya.ts  (and smena.ts, savdo.ts, ...)
export const nasiya: IdeaContent = {
  id: "24",
  name: "Nasiya",
  sector: "Chakana",
  stack: "Next.js + Supabase",
  minPlan: "pro",
  hook: "...",
  overview: { problem, solution, whatYouGet: [...] },
  market: { customer, tamSamSom, demandSignals, whyNow, verdict, chart },
  systemDesign: { architecture, erDiagram, requestFlow, decisions, hardParts, evolution },
  roadmap: { v0, v1, v2, v3 },   // each: { goal, steps[], doneWhen, effort, skip }
  design: { screens[], criticalFlow[], localUx[], lookAndFeel },
  business: { model, willingnessToPay, pricing, unitEconomics, gtm, verdict, chart },
  techStack: { glance[], layers[], integrations[], monthlyCost },
  reference: { dbSchema, apiEndpoints },
}
```

> **This is the key:** the page component reads `nasiya` vs `smena` vs `savdo` and renders whichever is passed. Nasiya's ER diagram (shops → debts → payments) and Smena's (staff → shifts → hours) are completely different data, drawn by the same diagram component. ONE beautiful template, infinite distinct ideas.

The diagram/chart components are **generic renderers**: an `<ArchitectureDiagram nodes={...} edges={...} />`, an `<ERDiagram entities={...} />`, a `<RoadmapTimeline versions={...} />`, a `<BreakEvenChart data={...} />`. Each idea feeds them its own data.

---

## 5. Build order (stop after each)
1. **Template shell** — header block + sticky tab bar + section switcher, reading from the Nasiya data object. **🛑 Show it.**
2. **Overview** (free) with "what you'll get". **🛑 Show it.**
3. **Roadmap** — `RoadmapTimeline` component, fed Nasiya's v0–v3. **🛑 Show it.**
4. **System Design** — `ArchitectureDiagram` + `ERDiagram`, fed Nasiya's data. **🛑 Show it.**
5. **Market + Business** — funnel + break-even charts (Recharts). **🛑 Show it.**
6. **Design + Tech Stack + Reference**. **🛑 Show it.**
7. **Locked-preview state** for premium sections. **🛑 Show it.**

---

## 6. Done checklist
- [ ] ONE `IdeaDetailPage` template, fully data-driven — no idea-specific content hardcoded.
- [ ] Generic, reusable visual components (architecture, ER, roadmap timeline, charts) that accept per-idea data.
- [ ] Header block: serif name, tag pills, Save + Copy JSON.
- [ ] Sticky tab bar with locks on premium tabs; mobile-scrollable.
- [ ] Each premium section leads with its hero visual.
- [ ] Roadmap timeline is the standout visual.
- [ ] Locked previews reveal structure, withhold substance.
- [ ] Nasiya fully filled as the showcase; data shape ready for Smena/Savdo/etc.
- [ ] Smooth, premium styling consistent with the dashboard; mobile-first; reduced-motion respected.

**🛑 Build the template beautifully with Nasiya. Once it feels worth paying for, adding a new idea = adding one data file, no new page code.**