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

// i18n shape for the detail page chrome.
type IDStrings = ReturnType<typeof useLang>["t"]["dash"]["ideaDetail"];

const TAB_ORDER: { key: TabKey; star?: boolean }[] = [
  { key: "overview" },
  { key: "market", star: true },
  { key: "system", star: true },
  { key: "roadmap", star: true },
  { key: "design" },
  { key: "business" },
  { key: "tech" },
  { key: "reference" },
];

export default function IdeaDetail({ id }: { id?: string }) {
  const { t, lang } = useLang();
  const { isSaved, toggle } = useSaved();
  const [tab, setTab] = useState<TabKey>("overview");
  const [copied, setCopied] = useState<string | null>(null);
  // Stub plan switcher so we can preview both the unlocked depth and the
  // locked state. // TODO: gate by plan — replace with real auth/plan later.
  const [asPlan, setAsPlan] = useState<"pro" | "free">("pro");

  const idea = id ? getIdea(id) : undefined;
  const content = id ? getIdeaContent(id, lang) : undefined;
  const d = t.dash.detail;
  const i = t.dash.ideaDetail;

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

      {/* header card */}
      <div className="mt-4 rounded-2xl border border-d-border bg-d-surface p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-d-accent/30 bg-d-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-d-accent">
                {t.sectors[idea.sector]}
              </span>
              <span className="inline-flex items-center rounded-md border border-d-border px-2.5 py-0.5 text-[11px] font-medium text-d-muted">{idea.stack}</span>
              <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${idea.minPlan === "free" ? "border-d-border text-d-faint" : "border-d-primary/40 bg-d-primary/10 text-d-primary"}`}>
                {idea.minPlan === "free" ? t.dash.plan.open : planText[idea.minPlan]}
              </span>
            </div>
            <h2 className="mt-2.5 font-display text-4xl font-semibold tracking-tight text-d-ink">{idea.name}</h2>
            {content && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-d-muted">{content.hook}</p>}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggle(idea.id)}
              aria-pressed={saved}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium shadow-soft transition-colors ${
                saved ? "border-d-accent bg-d-accent text-white" : "border-d-border bg-d-elev text-d-muted hover:border-d-border-strong hover:text-d-ink"
              }`}
            >
              <BookmarkIcon className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
              {saved ? d.saved : d.save}
            </button>
            <button
              onClick={() => copy("json", { ...idea, content })}
              className="rounded-full border border-d-border bg-d-elev px-3.5 py-2 text-sm font-medium text-d-muted shadow-soft transition-colors hover:border-d-border-strong hover:text-d-ink"
            >
              {copied === "json" ? d.copied : d.copyJson}
            </button>
          </div>
        </div>
      </div>

      {content && (
        <>
          {/* plan preview switcher — stub. // TODO: gate by plan */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-d-border bg-d-surface p-1 text-xs shadow-soft">
            <span className="pl-2 text-d-faint">{i.previewAs}</span>
            <button
              onClick={() => setAsPlan("pro")}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${asPlan === "pro" ? "bg-d-accent text-white" : "text-d-muted hover:text-d-ink"}`}
            >
              {i.proUnlocked}
            </button>
            <button
              onClick={() => setAsPlan("free")}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${asPlan === "free" ? "bg-d-accent text-white" : "text-d-muted hover:text-d-ink"}`}
            >
              {i.free}
            </button>
          </div>

          {/* sticky tab bar */}
          <div className="sticky top-0 z-10 mt-4 -mx-5 bg-d-bg/85 px-5 py-2 backdrop-blur sm:mx-0 sm:px-0">
            <div className="overflow-x-auto">
              <div className="inline-flex min-w-full gap-1 rounded-xl border border-d-border bg-d-surface p-1 shadow-soft sm:min-w-0">
                {TAB_ORDER.map((tb) => {
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
                      {i.tabs[tb.key]}
                      {tb.star && <span className="text-[10px] text-d-gold">★</span>}
                      {isLocked && <LockGlyph className="h-3 w-3 text-d-faint" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* content (cross-fade on tab change, reduced-motion safe) */}
          <div key={tab} className="idea-fade mt-6 min-h-[320px]">
            {locked(tab) ? (
              <LockedPreview tease={i.tease[tab as Exclude<TabKey, "overview">]} unlock={i.unlock} note={i.unlockNote} onUnlock={() => setAsPlan("pro")}>
                <TabBody tab={tab} idea={idea} content={content} i={i} copy={copy} copied={copied} d={d} />
              </LockedPreview>
            ) : (
              <TabBody tab={tab} idea={idea} content={content} i={i} copy={copy} copied={copied} d={d} />
            )}
          </div>
        </>
      )}

      {/* Fallback for ideas whose full architecture isn't authored yet. */}
      {!content && (
        <div className="mt-6 space-y-6">
          <Section title={i.problem}>
            <p className="max-w-2xl text-base leading-relaxed text-d-muted">{idea.problemLong}</p>
          </Section>
          <Section title={i.solution}>
            <p className="max-w-2xl text-base leading-relaxed text-d-muted">{idea.solution}</p>
          </Section>
          <Reference idea={idea} copy={copy} copied={copied} d={d} i={i} />
          <p className="rounded-xl border border-dashed border-d-border bg-d-surface px-4 py-3 text-sm text-d-faint">{i.fallbackNote}</p>
        </div>
      )}
    </div>
  );
}

type DStrings = ReturnType<typeof useLang>["t"]["dash"]["detail"];

// ── Tab dispatcher ───────────────────────────────────────────────────────────
function TabBody({
  tab,
  idea,
  content,
  i,
  copy,
  copied,
  d,
}: {
  tab: TabKey;
  idea: NonNullable<ReturnType<typeof getIdea>>;
  content: IdeaContent;
  i: IDStrings;
  copy: (k: string, d: unknown) => void;
  copied: string | null;
  d: DStrings;
}) {
  switch (tab) {
    case "overview":
      return <Overview content={content} i={i} />;
    case "market":
      return <Market content={content} i={i} />;
    case "system":
      return <SystemDesign content={content} i={i} />;
    case "roadmap":
      return <Roadmap content={content} i={i} />;
    case "design":
      return <Design content={content} i={i} />;
    case "business":
      return <Business content={content} i={i} />;
    case "tech":
      return <TechStack content={content} i={i} />;
    case "reference":
      return <Reference idea={idea} copy={copy} copied={copied} d={d} i={i} />;
  }
}

// ── Overview (free) ──────────────────────────────────────────────────────────
function Overview({ content, i }: { content: IdeaContent; i: IDStrings }) {
  const o = content.overview;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label={i.problem} tone="text-d-primary">
          <p className="text-sm leading-relaxed text-d-muted">{o.problem}</p>
        </Card>
        <Card label={i.solution} tone="text-d-accent">
          <p className="text-sm leading-relaxed text-d-muted">{o.solution}</p>
        </Card>
      </div>
      <div className="rounded-2xl border border-d-gold/30 bg-d-elev p-5 shadow-soft">
        <h3 className="font-display text-lg font-semibold text-d-ink">{i.whatYouGet}</h3>
        <p className="mt-1 text-xs text-d-faint">{i.whatYouGetSub}</p>
        <ul className="mt-4 space-y-2.5">
          {o.whatYouGet.map((item, idx) => (
            <li key={idx} className="flex gap-2.5 text-sm text-d-muted">
              <CheckGlyph className="mt-0.5 h-4 w-4 shrink-0 text-d-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Market (premium) ─────────────────────────────────────────────────────────
function Market({ content, i }: { content: IdeaContent; i: IDStrings }) {
  const m = content.market;
  return (
    <div className="space-y-6">
      <Visual title={i.mkt.sizing}>
        <FunnelChart stages={m.sizing} />
      </Visual>
      <Card label={i.mkt.customer} tone="text-d-accent">
        <p className="text-sm leading-relaxed text-d-muted">{m.customer}</p>
      </Card>
      <Visual title={i.mkt.positioning}>
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
        <Card label={i.mkt.demand} tone="text-d-accent">
          <Bullets items={m.demandSignals} />
        </Card>
        <Card label={i.mkt.whyNow} tone="text-d-gold">
          <Bullets items={m.whyNow} />
        </Card>
      </div>
      <Note label={i.howEstimated}>{m.howEstimated}</Note>
      <Verdict label={i.verdict}>{m.verdict}</Verdict>
    </div>
  );
}

// ── System Design (premium) ──────────────────────────────────────────────────
function SystemDesign({ content, i }: { content: IdeaContent; i: IDStrings }) {
  const s = content.systemDesign;
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm leading-relaxed text-d-muted">{s.summary}</p>
      <Visual title={i.sys.architecture}>
        <ArchitectureDiagram nodes={s.nodes} edges={s.edges} />
      </Visual>
      <Visual title={i.sys.erModel}>
        <ERDiagram entities={s.entities} relations={s.relations} />
      </Visual>
      <Visual title={`${i.sys.requestFlow} — ${s.requestFlow.title}`}>
        <SequenceFlow steps={s.requestFlow.steps} />
      </Visual>
      <Card label={i.sys.decisions} tone="text-d-accent">
        <div className="space-y-4">
          {s.decisions.map((dec, idx) => (
            <div key={idx} className="border-l-2 border-d-accent/40 pl-3">
              <p className="text-sm font-medium text-d-ink">{dec.choice}</p>
              <p className="mt-1 text-xs text-d-muted"><span className="font-semibold text-d-accent">{i.sys.whyLabel}</span> {dec.why}</p>
              <p className="mt-0.5 text-xs text-d-faint"><span className="font-semibold">{i.sys.altLabel}</span> {dec.alternative}</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label={i.sys.hardParts} tone="text-d-primary">
          <div className="space-y-3">
            {s.hardParts.map((h, idx) => (
              <div key={idx}>
                <p className="text-sm font-medium text-d-ink">{h.title}</p>
                <p className="mt-0.5 text-xs text-d-muted">{h.approach}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card label={i.sys.evolution} tone="text-d-gold">
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
      <Note label={i.sys.scale}>{s.scale}</Note>
    </div>
  );
}

// ── Roadmap (premium — the centerpiece) ──────────────────────────────────────
function Roadmap({ content, i }: { content: IdeaContent; i: IDStrings }) {
  const r = content.roadmap;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-d-accent/40 bg-d-accent/5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-d-accent">{i.road.firstMove}</p>
        <p className="mt-1 text-sm text-d-ink">{r.firstMove}</p>
      </div>
      <Visual title={i.road.timeline}>
        <RoadmapTimeline versions={r.versions} />
      </Visual>
    </div>
  );
}

// ── Design (medium) ───────────────────────────────────────────────────────────
function Design({ content, i }: { content: IdeaContent; i: IDStrings }) {
  const dz = content.design;
  return (
    <div className="space-y-6">
      <Visual title={i.des.screens}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {dz.screens.map((sc) => (
            <Wireframe key={sc.name} screen={sc} />
          ))}
        </div>
        <div className="mt-5 space-y-2">
          {dz.screens.map((sc) => (
            <p key={sc.name} className="text-xs text-d-muted">
              <span className="font-semibold text-d-ink">{sc.name}:</span> {sc.whatsOnIt} <span className="text-d-faint">— {sc.why}</span>
            </p>
          ))}
        </div>
      </Visual>
      <Visual title={`${i.des.criticalFlow} — ${dz.criticalFlow.title}`}>
        <TapFlow taps={dz.criticalFlow.taps} />
      </Visual>
      <Card label={i.des.localUx} tone="text-d-accent">
        <div className="space-y-2.5">
          {dz.localUx.map((u) => (
            <p key={u.label} className="text-xs text-d-muted">
              <span className="font-semibold text-d-ink">{u.label}:</span> {u.detail}
            </p>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label={i.des.keepOff} tone="text-d-primary">
          <Bullets items={dz.keepOff} />
        </Card>
        <Card label={i.des.lookFeel} tone="text-d-gold">
          <p className="text-sm leading-relaxed text-d-muted">{dz.lookAndFeel}</p>
        </Card>
      </div>
    </div>
  );
}

// ── Business (premium) ────────────────────────────────────────────────────────
function Business({ content, i }: { content: IdeaContent; i: IDStrings }) {
  const b = content.business;
  return (
    <div className="space-y-6">
      <Visual title={i.biz.breakeven}>
        <BreakevenChart points={b.breakeven} />
      </Visual>
      <Visual title={i.biz.priceAnchor}>
        <PriceAnchor painLabel={i.biz.painLabel} painValue={150000} priceLabel={i.biz.priceLabel} priceValue={40000} />
        <p className="mt-2 text-xs text-d-muted">{b.painCost}</p>
      </Visual>
      <Card label={i.biz.model} tone="text-d-accent">
        <p className="text-sm leading-relaxed text-d-muted">{b.model}</p>
        <p className="mt-2 text-sm leading-relaxed text-d-muted"><span className="font-semibold text-d-ink">{i.biz.willingness}</span> {b.willingnessToPay}</p>
      </Card>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-d-faint">{i.biz.pricing}</p>
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
      <Card label={i.biz.unitEcon} tone="text-d-accent">
        <ul className="space-y-1.5">
          {b.unitEconomics.map((e) => (
            <li key={e.label} className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-d-muted">{e.label} {e.kind === "assumption" && <span className="text-d-faint">{i.biz.assumption}</span>}</span>
              <span className="font-mono font-medium text-d-ink">{e.value}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Note label={i.howEstimated}>{b.howEstimated}</Note>
      <Card label={i.biz.payment} tone="text-d-gold">
        <p className="text-sm leading-relaxed text-d-muted">{b.payment}</p>
      </Card>
      <Card label={i.biz.profit} tone="text-d-accent">
        <p className="text-sm leading-relaxed text-d-muted">{b.pathToProfit}</p>
      </Card>
      <Card label={i.biz.gtm} tone="text-d-primary">
        <Bullets items={b.gtm} />
      </Card>
      <Verdict label={i.verdict}>{b.verdict}</Verdict>
    </div>
  );
}

// ── Tech Stack (medium) ───────────────────────────────────────────────────────
function TechStack({ content, i }: { content: IdeaContent; i: IDStrings }) {
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
        {ts.layers.map((l, idx) => (
          <div key={l.layer} className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 ${idx % 2 ? "bg-d-surface" : "bg-d-elev"}`}>
            <span className="w-28 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-d-faint">{l.layer}</span>
            <span className="w-56 shrink-0 text-sm font-medium text-d-ink">{l.choice}</span>
            <span className="text-xs text-d-muted">{l.why}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card label={i.tch.integrations} tone="text-d-accent">
          <Bullets items={ts.integrations} />
        </Card>
        <Card label={i.tch.monthlyCost} tone="text-d-gold">
          <p className="text-sm leading-relaxed text-d-muted">{ts.monthlyCost}</p>
        </Card>
      </div>
    </div>
  );
}

// ── Reference (understated, last) ─────────────────────────────────────────────
function Reference({
  idea,
  copy,
  copied,
  d,
  i,
}: {
  idea: NonNullable<ReturnType<typeof getIdea>>;
  copy: (k: string, d: unknown) => void;
  copied: string | null;
  d: DStrings;
  i: IDStrings;
}) {
  return (
    <div>
      <p className="mb-4 text-xs text-d-faint">{i.ref.intro}</p>
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
        {idea.apiEndpoints.map((e, idx) => (
          <div key={idx} className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${idx % 2 ? "bg-d-surface" : "bg-d-elev"}`}>
            <span className="w-16 shrink-0 font-mono text-xs font-semibold text-d-accent">{e.method}</span>
            <span className="shrink-0 font-mono text-xs text-d-ink sm:w-72">{e.path}</span>
            <span className="text-xs text-d-muted">{e.purpose}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Shared bits ────────────────────────────────────────────────────────────────
function LockedPreview({
  tease,
  unlock,
  note,
  onUnlock,
  children,
}: {
  tease: string;
  unlock: string;
  note: string;
  onUnlock: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-d-border">
      <div className="pointer-events-none max-h-[460px] select-none overflow-hidden opacity-50 blur-[3px]" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-d-bg/30 to-d-bg/85 px-6 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-d-gold/40 bg-d-surface shadow-soft">
          <LockGlyph className="h-5 w-5 text-d-gold" />
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold text-d-ink">{unlock}</h3>
        <p className="mt-1 max-w-sm text-sm text-d-muted">{tease}</p>
        <button onClick={onUnlock} className="mt-4 rounded-full bg-d-gold px-5 py-2 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-90">
          {unlock}
        </button>
        <p className="mt-2 text-[11px] text-d-faint">{note}</p>
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
      {items.map((it, idx) => (
        <li key={idx} className="flex gap-2 text-sm text-d-muted">
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

function Verdict({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-d-accent/40 bg-d-accent/5 px-4 py-3">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-d-accent">{label}</span>
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
    <button onClick={onClick} className="rounded-full border border-d-border bg-d-surface px-3 py-1.5 text-xs font-medium text-d-muted shadow-soft transition-colors hover:border-d-border-strong hover:text-d-ink">
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
