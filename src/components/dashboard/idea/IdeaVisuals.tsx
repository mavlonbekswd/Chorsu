"use client";

// Visual-first building blocks for the idea detail page. Everything renders
// in-app with plain SVG + divs (no chart lib runtime needed) and reads the
// velvet-slate theme through CSS variables so it tracks light/dark.
// Generic renderers: each takes per-idea data + pulls its chrome labels from
// i18n, so the same component draws Nasiya, Smena, Savdo… in any language.

import { useLang } from "@/components/LanguageProvider";
import type {
  FunnelStage,
  PositioningRow,
  ArchNode,
  ArchEdge,
  Entity,
  Relation,
  FlowStep,
  RoadmapVersion,
  Screen,
  BreakevenPoint,
} from "@/lib/idea-content";

const accent = "rgb(var(--d-accent))";
const primary = "rgb(var(--d-primary))";
const gold = "rgb(var(--d-gold))";
const ink = "rgb(var(--d-ink))";
const muted = "rgb(var(--d-muted))";
const border = "rgb(var(--d-border-strong))";

// ── TAM / SAM / SOM funnel ──────────────────────────────────────────────────
export function FunnelChart({ stages }: { stages: FunnelStage[] }) {
  const widths = [100, 64, 32];
  const tones = [accent, primary, gold];
  return (
    <div className="space-y-3">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-4">
          <div className="flex flex-1 justify-center">
            <div
              className="flex flex-col items-center justify-center rounded-lg px-4 py-3 text-center text-white shadow-soft"
              style={{ width: `${widths[i]}%`, background: tones[i] }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide opacity-90">{s.label}</span>
              <span className="font-display text-xl font-semibold leading-tight">{s.value}</span>
            </div>
          </div>
          <p className="hidden flex-1 text-xs leading-relaxed text-d-muted sm:block">{s.sub}</p>
        </div>
      ))}
      <div className="space-y-1.5 sm:hidden">
        {stages.map((s) => (
          <p key={s.label} className="text-xs leading-relaxed text-d-muted">
            <span className="font-semibold text-d-ink">{s.label}:</span> {s.sub}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── Positioning 2×2 (local fit × simplicity) ────────────────────────────────
export function PositioningChart({ rows }: { rows: PositioningRow[] }) {
  const { t } = useLang();
  const v = t.dash.ideaDetail.vis;
  const W = 360, H = 300, pad = 36;
  const x = (val: number) => pad + ((val - 0.5) / 2.5) * (W - pad * 2);
  const y = (val: number) => H - pad - ((val - 0.5) / 2.5) * (H - pad * 2);
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" role="img" aria-label="Positioning chart">
        <line x1={W / 2} y1={pad} x2={W / 2} y2={H - pad} stroke={border} strokeDasharray="3 4" />
        <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} stroke={border} strokeDasharray="3 4" />
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke={border} />
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke={border} />
        <text x={W - pad} y={H - pad + 22} textAnchor="end" fontSize="10" fill={muted}>
          {v.localFit}
        </text>
        <text x={pad - 8} y={pad - 12} fontSize="10" fill={muted}>
          {v.simplicity}
        </text>
        {rows.map((r, i) => {
          const isThis = i === rows.length - 1;
          return (
            <g key={r.name}>
              <circle
                cx={x(r.localFit)}
                cy={y(r.simplicity)}
                r={isThis ? 9 : 6}
                fill={isThis ? accent : "rgb(var(--d-surface))"}
                stroke={isThis ? accent : border}
                strokeWidth={isThis ? 0 : 1.5}
              />
              <text
                x={x(r.localFit)}
                y={y(r.simplicity) - 12}
                textAnchor="middle"
                fontSize="10"
                fontWeight={isThis ? 700 : 500}
                fill={isThis ? accent : ink}
              >
                {r.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Architecture diagram (layered boxes + arrows) ───────────────────────────
const NODE_TONE: Record<ArchNode["kind"], string> = {
  client: "border-d-accent/50 text-d-accent",
  api: "border-d-primary/50 text-d-primary",
  data: "border-d-gold/50 text-d-gold",
  external: "border-d-border-strong text-d-muted",
};

export function ArchitectureDiagram({ nodes, edges }: { nodes: ArchNode[]; edges: ArchEdge[] }) {
  const order: ArchNode["kind"][] = ["client", "api", "data", "external"];
  const cols = order.map((k) => nodes.filter((n) => n.kind === k));
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col items-stretch gap-3">
            {col.map((n) => (
              <div
                key={n.id}
                className={`rounded-xl border-2 bg-d-surface px-3 py-3 text-center text-xs font-semibold leading-tight shadow-soft ${NODE_TONE[n.kind]}`}
              >
                {n.label.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <ul className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {edges.map((e, i) => (
          <li key={i} className="flex items-center gap-2 text-[11px] text-d-muted">
            <span className="font-mono text-d-faint">{e.from}</span>
            <span className="text-d-accent">→</span>
            <span className="font-mono text-d-faint">{e.to}</span>
            {e.label && <span className="text-d-faint">· {e.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── ER diagram ──────────────────────────────────────────────────────────────
export function ERDiagram({ entities, relations }: { entities: Entity[]; relations: Relation[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {entities.map((e) => (
          <div key={e.name} className="overflow-hidden rounded-xl border border-d-border-strong bg-d-surface shadow-soft">
            <div className="border-b border-d-border bg-d-elev px-3 py-2">
              <span className="font-mono text-sm font-semibold text-d-accent">{e.name}</span>
              {e.note && <span className="ml-2 text-[11px] text-d-faint">{e.note}</span>}
            </div>
            <ul className="divide-y divide-d-border/60">
              {e.fields.map((f) => (
                <li key={f} className="px-3 py-1.5 font-mono text-xs text-d-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {relations.map((r, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-d-border bg-d-elev px-3 py-1 text-[11px] text-d-muted">
            <span className="font-mono text-d-ink">{r.from}</span>
            <span className="text-d-accent">{r.label}</span>
            <span className="font-mono text-d-ink">{r.to}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Request flow (sequence) ─────────────────────────────────────────────────
export function SequenceFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="relative space-y-3 border-l border-d-border pl-5">
      {steps.map((s, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[26px] flex h-5 w-5 items-center justify-center rounded-full bg-d-accent text-[10px] font-semibold text-white">
            {i + 1}
          </span>
          <div className="rounded-lg border border-d-border bg-d-surface px-3 py-2 text-xs shadow-soft">
            <span className="font-semibold text-d-ink">{s.actor}</span>
            <span className="mx-1.5 text-d-accent">→</span>
            <span className="font-semibold text-d-ink">{s.to}</span>
            <p className="mt-0.5 text-d-muted">{s.message}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ── Roadmap v0→v3 — vertical timeline (the standout visual) ─────────────────
const VTONE = ["bg-d-accent", "bg-d-primary", "bg-d-gold", "bg-d-ink"];

export function RoadmapTimeline({ versions }: { versions: RoadmapVersion[] }) {
  const { t } = useLang();
  const r = t.dash.ideaDetail.road;
  return (
    <div>
      {versions.map((v, i) => {
        const last = i === versions.length - 1;
        return (
          <div key={v.id} className="relative flex gap-4 pb-6 last:pb-0">
            {/* rail: node + connecting line */}
            <div className="flex flex-col items-center">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-soft ${VTONE[i]} ${i === 0 ? "" : "ring-2 ring-d-bg"}`}>
                {v.id}
              </span>
              {!last && <span className="mt-1 w-px flex-1 bg-d-border" />}
            </div>

            {/* version card */}
            <article className="mb-0 flex-1 rounded-2xl border border-d-border bg-d-elev p-4 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-display text-base font-semibold text-d-ink">{v.title}</h4>
                <span className="rounded-full border border-d-border px-2 py-0.5 text-[10px] font-medium text-d-faint">{v.effort}</span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-d-muted">{v.goal}</p>
              <ol className="mt-3 space-y-1.5">
                {v.steps.map((s, si) => (
                  <li key={si} className="flex gap-2 text-xs text-d-muted">
                    <span className="font-mono text-d-faint">{si + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <dl className="mt-3 space-y-1.5 border-t border-d-border pt-3 text-xs">
                <Row label={r.doneWhen} value={v.doneWhen} tone="text-d-accent" />
                <Row label={r.skip} value={v.skip} tone="text-d-primary" />
                <Row label={r.tiesTo} value={v.tiesTo} tone="text-d-faint" />
              </dl>
            </article>
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="flex gap-2">
      <dt className={`shrink-0 font-semibold uppercase tracking-wide ${tone}`} style={{ fontSize: 10 }}>
        {label}
      </dt>
      <dd className="text-d-muted">{value}</dd>
    </div>
  );
}

// ── Wireframe (phone screen) ────────────────────────────────────────────────
export function Wireframe({ screen }: { screen: Screen }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[200px] rounded-[1.6rem] border-2 border-d-border-strong bg-d-surface p-2 shadow-soft">
        <div className="rounded-[1.1rem] border border-d-border bg-d-bg p-3">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-d-border-strong" />
          <p className="mb-2 text-[11px] font-semibold text-d-ink">{screen.name}</p>
          <div className="space-y-2">
            {screen.elements.map((el, i) => (
              <div
                key={i}
                className={`rounded-md border border-d-border px-2 py-1.5 text-[10px] text-d-muted ${
                  i === 0 ? "bg-d-elev font-semibold text-d-ink" : "bg-d-surface"
                }`}
              >
                {el}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-medium text-d-ink">{screen.name}</p>
    </div>
  );
}

// ── Tap-by-tap flow ─────────────────────────────────────────────────────────
export function TapFlow({ taps }: { taps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {taps.map((tap, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="rounded-lg border border-d-accent/40 bg-d-accent/10 px-3 py-1.5 text-xs font-medium text-d-accent">
            {tap}
          </span>
          {i < taps.length - 1 && <span className="text-d-faint">→</span>}
        </div>
      ))}
    </div>
  );
}

// ── Break-even chart (revenue vs cost) ──────────────────────────────────────
export function BreakevenChart({ points }: { points: BreakevenPoint[] }) {
  const { t } = useLang();
  const v = t.dash.ideaDetail.vis;
  const W = 520, H = 220, pad = 32;
  const max = Math.max(...points.flatMap((p) => [p.revenue, p.cost])) * 1.1;
  const x = (i: number) => pad + (i / (points.length - 1)) * (W - pad * 2);
  const y = (val: number) => H - pad - (val / max) * (H - pad * 2);
  const line = (key: "revenue" | "cost") => points.map((p, i) => `${x(i)},${y(p[key])}`).join(" ");
  const crossIdx = points.findIndex((p) => p.revenue >= p.cost);
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[420px]" role="img" aria-label="Break-even chart">
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke={border} />
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke={border} />
        <polyline points={line("cost")} fill="none" stroke={primary} strokeWidth={2.5} strokeLinecap="round" />
        <polyline points={line("revenue")} fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
        {crossIdx > 0 && (
          <g>
            <circle cx={x(crossIdx)} cy={y(points[crossIdx].revenue)} r={5} fill={accent} />
            <text x={x(crossIdx)} y={y(points[crossIdx].revenue) - 10} textAnchor="middle" fontSize="10" fontWeight={700} fill={accent}>
              {v.breakEven}
            </text>
          </g>
        )}
        {points.map((p, i) => (
          <text key={i} x={x(i)} y={H - pad + 16} textAnchor="middle" fontSize="9" fill={muted}>
            {p.month}
          </text>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap gap-4 text-xs">
        <Legend color={accent} label={v.revenue} />
        <Legend color={primary} label={v.cost} />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-d-muted">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

// ── Price-anchor (cost of pain vs price) ────────────────────────────────────
export function PriceAnchor({
  painLabel,
  painValue,
  priceLabel,
  priceValue,
}: {
  painLabel: string;
  painValue: number;
  priceLabel: string;
  priceValue: number;
}) {
  const { t } = useLang();
  const v = t.dash.ideaDetail.vis;
  const max = Math.max(painValue, priceValue);
  const pct = (val: number) => `${Math.round((val / max) * 100)}%`;
  const fmt = (n: number) => `${n.toLocaleString("ru-RU")} ${v.perMonth}`;
  return (
    <div className="space-y-3">
      <Bar label={painLabel} width={pct(painValue)} tone={primary} value={fmt(painValue)} />
      <Bar label={priceLabel} width={pct(priceValue)} tone={accent} value={fmt(priceValue)} />
      <p className="text-xs text-d-muted">{v.priceBelow}</p>
    </div>
  );
}

function Bar({ label, width, tone, value }: { label: string; width: string; tone: string; value: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-d-ink">{label}</span>
        <span className="text-d-muted">{value}</span>
      </div>
      <div className="h-6 w-full overflow-hidden rounded-md bg-d-hover">
        <div className="flex h-full items-center rounded-md" style={{ width, background: tone }} />
      </div>
    </div>
  );
}
