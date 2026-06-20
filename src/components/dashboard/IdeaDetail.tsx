"use client";

import { useState } from "react";
import Link from "next/link";
import { getIdea, type Plan } from "@/lib/mock-ideas";
import { getIdeaContent, SECTION_TIER, type IdeaContent } from "@/lib/idea-content";
import { useLang } from "@/components/LanguageProvider";
import { useSaved } from "./SavedProvider";
import { BookmarkIcon, MonoMark } from "./icons";
import {
  FunnelChart,
  PositioningChart,
  ArchitectureDiagram,
  ERDiagram,
  SequenceFlow,
  RoadmapTimeline,
  Wireframe,
  TapFlow,
  BreakevenChart,
  PriceAnchor,
} from "./idea/IdeaVisuals";

type TabKey = "overview" | "market" | "system" | "roadmap" | "design" | "business" | "tech" | "reference";

const TABS: { key: TabKey; label: string; star?: boolean }[] = [
  { key: "overview", label: "Overview" },
  { key: "market", label: "Market", star: true },
  { key: "system", label: "System Design", star: true },
  { key: "roadmap", label: "Roadmap", star: true },
  { key: "design", label: "Design" },
  { key: "business", label: "Business" },
  { key: "tech", label: "Tech Stack" },
  { key: "reference", label: "Reference" },
];

// One-line tease shown on the locked overlay per premium section.
const LOCK_TEASE: Record<TabKey, string> = {
  overview: "",
  market: "See who pays, the TAM/SAM/SOM, and why no competitor owns this yet.",
  system: "Get the architecture, data model, and the tricky part solved.",
  roadmap: "Unlock the build-ready v0→v3 path — always know the next move.",
  design: "See the 3 key screens and the two-tap core flow, mapped out.",
  business: "Concrete so'm pricing, unit economics, and how to land the first 10 shops.",
  tech: "An opinionated, justified stack so you don't lose days choosing tools.",
  reference: "The full DB schema + API, copy-as-JSON.",
};

export default function IdeaDetail({ id }: { id?: string }) {
  const { t } = useLang();
  const { isSaved, toggle } = useSaved();
  const [tab, setTab] = useState<TabKey>("overview");
  const [copied, setCopied] = useState<string | null>(null);
  // Stub plan switcher so we can preview both the unlocked depth and the
  // locked state. // TODO: gate by plan — replace with real auth/plan later.
  const [asPlan, setAsPlan] = useState<"pro" | "free">("pro");

  const idea = id ? getIdea(id) : undefined;
  const content = id ? getIdeaContent(id) : undefined;
  const d = t.dash.detail;

  if (!idea) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
        <MonoMark className="mx-auto h-10 w-10 text-d-faint" />
        <h2 className="mt-4 font-display text-xl font-semibold text-d-ink">{d.notFound}</h2>
        <Link href="/dashboard" className="mt-6 inline-block rounded-full border border-d-border bg-d-surface px-5 py-2 text-sm font-semibold text-d-ink shadow-soft transition-colors hover:bg-d-hover">
          {d.back}
        </Link>
      </div>
    );
  }

  const saved = isSaved(idea.id);
  const planText: Record<Plan, string> = { free: t.dash.plan.free, pro: t.dash.plan.pro, team: t.dash.plan.team };

  const copy = (key: string, data: unknown) => {
    try {
      navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  const locked = (key: TabKey) => asPlan === "free" && SECTION_TIER[key] === "premium";

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-d-muted transition-colors hover:text-d-ink">
        ← {d.back}
      </Link>

      {/* header */}
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-d-border px-2.5 py-0.5 text-[11px] font-medium text-d-muted">
              {t.sectors[idea.sector]}
            </span>
            <span className="text-xs text-d-faint">{idea.stack}</span>
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${idea.minPlan === "free" ? "border-d-border text-d-faint" : "border-d-gold/40 text-d-gold"}`}>
              {idea.minPlan === "free" ? t.dash.plan.open : planText[idea.minPlan]}
            </span>
          </div>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-d-ink">{idea.name}</h2>
          {content && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-d-muted">{content.hook}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggle(idea.id)}
            aria-pressed={saved}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium shadow-soft transition-colors ${
              saved
                ? "border-d-accent bg-d-accent text-white"
                : "border-d-border bg-d-surface text-d-muted hover:border-d-border-strong hover:text-d-ink"
            }`}
          >
            <BookmarkIcon className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            {saved ? d.saved : d.save}
          </button>
          <button
            onClick={() => copy("json", { ...idea, content })}
            className="rounded-full border border-d-border bg-d-surface px-3.5 py-2 text-sm font-medium text-d-muted shadow-soft transition-colors hover:border-d-border-strong hover:text-d-ink"
          >
            {copied === "json" ? d.copied : d.copyJson}
          </button>
        </div>
      </div>

      {content && (
        <>
          {/* plan preview switcher — stub. // TODO: gate by plan */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-d-border bg-d-surface p-1 text-xs shadow-soft">
            <span className="pl-2 text-d-faint">Preview as</span>
            {(["pro", "free"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setAsPlan(p)}
                className={`rounded-full px-3 py-1 font-medium capitalize transition-colors ${
                  asPlan === p ? "bg-d-accent text-white" : "text-d-muted hover:text-d-ink"
                }`}
              >
                {p === "pro" ? "Pro (unlocked)" : "Free"}
              </button>
            ))}
          </div>

          {/* tab bar */}
          <div className="mt-5 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div className="inline-flex min-w-full gap-1 rounded-xl border border-d-border bg-d-surface p-1 shadow-soft sm:min-w-0">
              {TABS.map((tb) => {
                const active = tab === tb.key;
                const isLocked = locked(tb.key);
                return (
                  <button
                    key={tb.key}
                    onClick={() => setTab(tb.key)}
                    aria-pressed={active}
                    className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      active ? "bg-d-elev text-d-ink shadow-soft" : "text-d-muted hover:text-d-ink"
                    }`}
                  >
                    {tb.label}
                    {tb.star && <span className="text-[10px] text-d-gold">★</span>}
                    {isLocked && <LockGlyph className="h-3 w-3 text-d-faint" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* content */}
          <div className="mt-6 min-h-[320px]">
            {locked(tab) ? (
              <LockedPreview tease={LOCK_TEASE[tab]} onUnlock={() => setAsPlan("pro")}>
                <TabBody tab={tab} idea={idea} content={content} copy={copy} copied={copied} />
              </LockedPreview>
            ) : (
              <TabBody tab={tab} idea={idea} content={content} copy={copy} copied={copied} />
            )}
          </div>
        </>
      )}

      {/* Fallback for ideas whose full architecture isn't authored yet. */}
      {!content && (
        <div className="mt-6 space-y-6">
          <Section title="Problem">
            <p className="max-w-2xl text-base leading-relaxed text-d-muted">{idea.problemLong}</p>
          </Section>
          <Section title="Solution">
            <p className="max-w-2xl text-base leading-relaxed text-d-muted">{idea.solution}</p>
          </Section>
          <Reference idea={idea} copy={copy} copied={copied} d={d} />
          <p className="rounded-xl border border-dashed border-d-border bg-d-surface px-4 py-3 text-sm text-d-faint">
            Full 0→MVP architecture for this idea is being authored. Nasiya is the fully built showcase.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Tab dispatcher ───────────────────────────────────────────────────────────
function TabBody({
  tab,
  idea,
  content,
  copy,
  copied,
}: {
  tab: TabKey;
  idea: ReturnType<typeof getIdea> & object;
  content: IdeaContent;
  copy: (k: string, d: unknown) => void;
  copied: string | null;
}) {
  const { t } = useLang();
  const d = t.dash.detail;
  switch (tab) {
    case "overview":
      return <Overview content={content} />;
    case "market":
      return <Market content={content} />;
    case "system":
      return <SystemDesign content={content} />;
    case "roadmap":
      return <Roadmap content={content} />;
    case "design":
      return <Design content={content} />;
    case "business":
      return <Business content={content} />;
    case "tech":
      return <TechStack content={content} />;
    case "reference":
      return <Reference idea={idea} copy={copy} copied={copied} d={d} />;
  }
}

// ── A. Overview (free) ──────────────────────────────────────────────────────
function Overview({ content }: { content: IdeaContent }) {
  const o = content.overview;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label="The problem" tone="text-d-primary">
          <p className="text-sm leading-relaxed text-d-muted">{o.problem}</p>
        </Card>
        <Card label="The solution" tone="text-d-accent">
          <p className="text-sm leading-relaxed text-d-muted">{o.solution}</p>
        </Card>
      </div>
      <div className="rounded-2xl border border-d-gold/30 bg-d-elev p-5 shadow-soft">
        <h3 className="font-display text-lg font-semibold text-d-ink">What you&apos;ll get</h3>
        <p className="mt-1 text-xs text-d-faint">The full 0→MVP journey behind this idea — not a 5-line problem/solution.</p>
        <ul className="mt-4 space-y-2.5">
          {o.whatYouGet.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-d-muted">
              <CheckGlyph className="mt-0.5 h-4 w-4 shrink-0 text-d-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── B. Market (premium) ─────────────────────────────────────────────────────
function Market({ content }: { content: IdeaContent }) {
  const m = content.market;
  return (
    <div className="space-y-6">
      <Visual title="Market sizing — TAM / SAM / SOM">
        <FunnelChart stages={m.sizing} />
      </Visual>
      <Card label="The customer" tone="text-d-accent">
        <p className="text-sm leading-relaxed text-d-muted">{m.customer}</p>
      </Card>
      <Visual title="Positioning — where this fills the gap">
        <PositioningChart rows={m.positioning} />
        <ul className="mt-4 space-y-1.5">
          {m.positioning.map((p) => (
            <li key={p.name} className="text-xs text-d-muted">
              <span className="font-semibold text-d-ink">{p.name}:</span> {p.gap}
            </li>
          ))}
        </ul>
      </Visual>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label="Demand signals" tone="text-d-accent">
          <Bullets items={m.demandSignals} />
        </Card>
        <Card label="Why now" tone="text-d-gold">
          <Bullets items={m.whyNow} />
        </Card>
      </div>
      <Note label="How we estimated this">{m.howEstimated}</Note>
      <Verdict>{m.verdict}</Verdict>
    </div>
  );
}

// ── C. System Design (premium) ──────────────────────────────────────────────
function SystemDesign({ content }: { content: IdeaContent }) {
  const s = content.systemDesign;
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm leading-relaxed text-d-muted">{s.summary}</p>
      <Visual title="High-level architecture">
        <ArchitectureDiagram nodes={s.nodes} edges={s.edges} />
      </Visual>
      <Visual title="Data model (ER)">
        <ERDiagram entities={s.entities} relations={s.relations} />
      </Visual>
      <Visual title={`Request flow — ${s.requestFlow.title}`}>
        <SequenceFlow steps={s.requestFlow.steps} />
      </Visual>
      <Card label="Key technical decisions & trade-offs" tone="text-d-accent">
        <div className="space-y-4">
          {s.decisions.map((dec, i) => (
            <div key={i} className="border-l-2 border-d-accent/40 pl-3">
              <p className="text-sm font-medium text-d-ink">{dec.choice}</p>
              <p className="mt-1 text-xs text-d-muted"><span className="font-semibold text-d-accent">Why:</span> {dec.why}</p>
              <p className="mt-0.5 text-xs text-d-faint"><span className="font-semibold">Alternative:</span> {dec.alternative}</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label="The hard parts" tone="text-d-primary">
          <div className="space-y-3">
            {s.hardParts.map((h, i) => (
              <div key={i}>
                <p className="text-sm font-medium text-d-ink">{h.title}</p>
                <p className="mt-0.5 text-xs text-d-muted">{h.approach}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card label="How the architecture evolves" tone="text-d-gold">
          <ul className="space-y-2">
            {s.evolution.map((e) => (
              <li key={e.version} className="flex gap-2 text-xs">
                <span className="font-mono font-semibold text-d-gold">{e.version}</span>
                <span className="text-d-muted">{e.adds}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Note label="Scale & limits">{s.scale}</Note>
    </div>
  );
}

// ── D. Roadmap (premium — the centerpiece) ──────────────────────────────────
function Roadmap({ content }: { content: IdeaContent }) {
  const r = content.roadmap;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-d-accent/40 bg-d-accent/5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-d-accent">First move — today</p>
        <p className="mt-1 text-sm text-d-ink">{r.firstMove}</p>
      </div>
      <Visual title="The 0→MVP roadmap — v0 to v3">
        <RoadmapTimeline versions={r.versions} />
      </Visual>
    </div>
  );
}

// ── E. Design (medium) ──────────────────────────────────────────────────────
function Design({ content }: { content: IdeaContent }) {
  const d = content.design;
  return (
    <div className="space-y-6">
      <Visual title="Key screens">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {d.screens.map((sc) => (
            <Wireframe key={sc.name} screen={sc} />
          ))}
        </div>
        <div className="mt-5 space-y-2">
          {d.screens.map((sc) => (
            <p key={sc.name} className="text-xs text-d-muted">
              <span className="font-semibold text-d-ink">{sc.name}:</span> {sc.whatsOnIt} <span className="text-d-faint">— {sc.why}</span>
            </p>
          ))}
        </div>
      </Visual>
      <Visual title={`Critical flow — ${d.criticalFlow.title}`}>
        <TapFlow taps={d.criticalFlow.taps} />
      </Visual>
      <Card label="Local UX decisions" tone="text-d-accent">
        <div className="space-y-2.5">
          {d.localUx.map((u) => (
            <p key={u.label} className="text-xs text-d-muted">
              <span className="font-semibold text-d-ink">{u.label}:</span> {u.detail}
            </p>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label="Keep off the screen" tone="text-d-primary">
          <Bullets items={d.keepOff} />
        </Card>
        <Card label="Look & feel" tone="text-d-gold">
          <p className="text-sm leading-relaxed text-d-muted">{d.lookAndFeel}</p>
        </Card>
      </div>
    </div>
  );
}

// ── F. Business (premium) ───────────────────────────────────────────────────
function Business({ content }: { content: IdeaContent }) {
  const b = content.business;
  return (
    <div className="space-y-6">
      <Visual title="Path to break-even">
        <BreakevenChart points={b.breakeven} />
      </Visual>
      <Visual title="Price anchored to the pain">
        <PriceAnchor painLabel="Cost of the problem today" painValue={150000} priceLabel="Pro subscription" priceValue={40000} />
        <p className="mt-2 text-xs text-d-muted">{b.painCost}</p>
      </Visual>
      <Card label="Monetization model" tone="text-d-accent">
        <p className="text-sm leading-relaxed text-d-muted">{b.model}</p>
        <p className="mt-2 text-sm leading-relaxed text-d-muted"><span className="font-semibold text-d-ink">Willingness to pay:</span> {b.willingnessToPay}</p>
      </Card>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-d-faint">Suggested pricing</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {b.pricing.map((p) => (
            <div key={p.name} className="rounded-xl border border-d-border bg-d-elev p-4 shadow-soft">
              <p className="font-display text-base font-semibold text-d-ink">{p.name}</p>
              <p className="mt-1 text-lg font-semibold text-d-accent">{p.price}</p>
              <p className="mt-1 text-xs text-d-muted">{p.note}</p>
            </div>
          ))}
        </div>
      </div>
      <Card label="Unit economics" tone="text-d-accent">
        <ul className="space-y-1.5">
          {b.unitEconomics.map((e) => (
            <li key={e.label} className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-d-muted">{e.label} {e.kind === "assumption" && <span className="text-d-faint">(assumption)</span>}</span>
              <span className="font-mono font-medium text-d-ink">{e.value}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Note label="How we estimated this">{b.howEstimated}</Note>
      <Card label="Local payment reality" tone="text-d-gold">
        <p className="text-sm leading-relaxed text-d-muted">{b.payment}</p>
      </Card>
      <Card label="Path to profitability" tone="text-d-accent">
        <p className="text-sm leading-relaxed text-d-muted">{b.pathToProfit}</p>
      </Card>
      <Card label="Go-to-market — the first 10 shops" tone="text-d-primary">
        <Bullets items={b.gtm} />
      </Card>
      <Verdict>{b.verdict}</Verdict>
    </div>
  );
}

// ── G. Tech Stack (medium) ──────────────────────────────────────────────────
function TechStack({ content }: { content: IdeaContent }) {
  const ts = content.techStack;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {ts.glance.map((g) => (
          <span key={g} className="rounded-full border border-d-accent/40 bg-d-accent/10 px-3 py-1 text-xs font-semibold text-d-accent">
            {g}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-d-border shadow-soft">
        {ts.layers.map((l, i) => (
          <div key={l.layer} className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 ${i % 2 ? "bg-d-surface" : "bg-d-elev"}`}>
            <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-d-faint">{l.layer}</span>
            <span className="w-56 shrink-0 text-sm font-medium text-d-ink">{l.choice}</span>
            <span className="text-xs text-d-muted">{l.why}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label="Integrations" tone="text-d-accent">
          <Bullets items={ts.integrations} />
        </Card>
        <Card label="Estimated monthly cost" tone="text-d-gold">
          <p className="text-sm leading-relaxed text-d-muted">{ts.monthlyCost}</p>
        </Card>
      </div>
    </div>
  );
}

// ── Reference (understated, last) ───────────────────────────────────────────
function Reference({
  idea,
  copy,
  copied,
  d,
}: {
  idea: NonNullable<ReturnType<typeof getIdea>>;
  copy: (k: string, d: unknown) => void;
  copied: string | null;
  d: ReturnType<typeof useLang>["t"]["dash"]["detail"];
}) {
  return (
    <div>
      <p className="mb-4 text-xs text-d-faint">
        The DB schema and API are the easy part — anyone can generate these. The value is the thinking in the sections above. Kept here for reference.
      </p>
      <div className="mb-3 flex flex-wrap justify-end gap-2">
        <SmallBtn onClick={() => copy("db", idea.dbSchema)} label={copied === "db" ? d.copied : d.copyDb} />
        <SmallBtn onClick={() => copy("api", idea.apiEndpoints)} label={copied === "api" ? d.copied : d.copyApi} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {idea.dbSchema.map((tbl) => (
          <div key={tbl.name} className="rounded-2xl border border-d-border bg-d-elev p-4 shadow-soft">
            <p className="mb-3 font-mono text-sm font-semibold text-d-accent">{tbl.name}</p>
            <ul className="space-y-2">
              {tbl.fields.map((f) => (
                <li key={f.name} className="flex flex-wrap items-baseline gap-x-2 text-xs">
                  <span className="font-mono text-d-ink">{f.name}</span>
                  <span className="font-mono text-d-muted">{f.type}</span>
                  {f.note && <span className="text-[11px] text-d-faint">· {f.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-d-border shadow-soft">
        {idea.apiEndpoints.map((e, i) => (
          <div key={i} className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${i % 2 ? "bg-d-surface" : "bg-d-elev"}`}>
            <span className="w-16 shrink-0 font-mono text-xs font-semibold text-d-accent">{e.method}</span>
            <span className="shrink-0 font-mono text-xs text-d-ink sm:w-72">{e.path}</span>
            <span className="text-xs text-d-muted">{e.purpose}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Shared bits ──────────────────────────────────────────────────────────────
function LockedPreview({ tease, onUnlock, children }: { tease: string; onUnlock: () => void; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-d-border">
      <div className="pointer-events-none max-h-[460px] select-none overflow-hidden opacity-50 blur-[3px]" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-d-bg/30 to-d-bg/85 px-6 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-d-gold/40 bg-d-surface shadow-soft">
          <LockGlyph className="h-5 w-5 text-d-gold" />
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold text-d-ink">Unlock with Pro</h3>
        <p className="mt-1 max-w-sm text-sm text-d-muted">{tease}</p>
        <button
          onClick={onUnlock}
          className="mt-4 rounded-full bg-d-gold px-5 py-2 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-90"
        >
          Unlock with Pro
        </button>
        <p className="mt-2 text-[11px] text-d-faint">Preview only — plan gating is a stub for now.</p>
      </div>
    </div>
  );
}

function Card({ label, tone, children }: { label: string; tone: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-d-border bg-d-elev p-5 shadow-soft">
      <p className={`mb-2.5 text-[11px] font-semibold uppercase tracking-wide ${tone}`}>{label}</p>
      {children}
    </div>
  );
}

function Visual({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-d-border bg-d-elev p-5 shadow-soft">
      <h3 className="mb-4 font-display text-base font-semibold text-d-ink">{title}</h3>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2 text-sm text-d-muted">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-d-faint" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-d-border bg-d-surface px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-d-faint">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-d-muted">{children}</p>
    </div>
  );
}

function Verdict({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-d-accent/40 bg-d-accent/5 px-4 py-3">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-d-accent">Verdict</span>
      <p className="text-sm font-medium text-d-ink">{children}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 font-display text-lg font-semibold text-d-ink">{title}</h3>
      {children}
    </div>
  );
}

function SmallBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-d-border bg-d-surface px-3 py-1.5 text-xs font-medium text-d-muted shadow-soft transition-colors hover:border-d-border-strong hover:text-d-ink"
    >
      {label}
    </button>
  );
}

function LockGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
