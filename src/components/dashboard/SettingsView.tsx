"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { LANGS } from "@/lib/i18n";
import { useTheme, type ThemeChoice } from "./ThemeProvider";

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { key: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-d-border bg-d-surface p-1">
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            aria-pressed={active}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active ? "bg-d-elev text-d-ink shadow-soft" : "text-d-muted hover:text-d-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-d-border bg-d-elev p-6 shadow-soft">
      <h3 className="font-display text-lg font-semibold text-d-ink">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wide text-d-faint">{label}</label>
      {/* TODO: make editable + persist once auth exists */}
      <div className="mt-1.5 flex items-center justify-between gap-3 rounded-lg border border-d-border bg-d-bg px-3 py-2">
        <span className="truncate text-sm text-d-muted">{value}</span>
        {hint && <span className="shrink-0 text-[11px] text-d-faint">{hint}</span>}
      </div>
    </div>
  );
}

export default function SettingsView() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const s = t.dash.settingsPage;

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <header className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-d-accent">{t.dash.bazaar}</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-d-ink">{t.dash.titles.settings}</h2>
      </header>

      <div className="space-y-5">
        <Card title={s.profile}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={s.name} value={t.dash.guest} hint={s.readonly} />
            <Field label={s.email} value={s.emailVal} hint={s.readonly} />
          </div>
        </Card>

        <Card title={s.language}>
          <Segmented value={lang} onChange={setLang} options={LANGS.map((l) => ({ key: l.code, label: l.name }))} />
        </Card>

        <Card title={s.appearance}>
          <Segmented
            value={theme}
            onChange={(v) => setTheme(v as ThemeChoice)}
            options={[
              { key: "system" as ThemeChoice, label: t.dash.theme.system },
              { key: "light" as ThemeChoice, label: t.dash.theme.light },
              { key: "dark" as ThemeChoice, label: t.dash.theme.dark },
            ]}
          />
        </Card>

        <Card title={s.plan}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded-full border border-d-gold/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-d-gold">
                {t.dash.free}
              </span>
              <p className="mt-2 text-sm text-d-muted">{s.planNote}</p>
            </div>
            {/* TODO: real billing — routes to pricing for now, no payment */}
            <Link
              href="/#caravans"
              className="rounded-full bg-d-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03]"
            >
              {s.upgrade}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
