"use client";

import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/components/LanguageProvider";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon, SearchIcon } from "./icons";

export default function TopBar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const { t } = useLang();

  const title =
    pathname === "/dashboard"
      ? t.dash.titles.ideas
      : pathname.startsWith("/dashboard/saved")
        ? t.dash.titles.saved
        : pathname.startsWith("/dashboard/settings")
          ? t.dash.titles.settings
          : pathname.startsWith("/dashboard/idea")
            ? t.dash.titles.idea
            : t.dash.titles.dashboard;

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-d-border bg-d-surface/80 px-4 backdrop-blur-md sm:px-5">
      <button
        onClick={onMenu}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-d-muted transition-colors hover:bg-d-hover hover:text-d-ink md:hidden"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      <div className="flex min-w-0 items-center gap-2">
        <span className="hidden text-sm text-d-faint sm:inline">{t.dash.bazaar}</span>
        <span className="hidden text-d-faint/70 sm:inline">›</span>
        <h1 className="truncate font-display text-lg font-semibold text-d-ink">{title}</h1>
      </div>

      <div className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-xl border border-d-border bg-d-bg px-3 py-2 text-d-faint transition-colors focus-within:border-d-accent/50 focus-within:ring-2 focus-within:ring-d-accent/10 md:flex">
        <SearchIcon className="h-4 w-4 shrink-0" />
        {/* TODO: wire global search to the ideas marketplace */}
        <input
          type="search"
          placeholder={t.dash.searchShort}
          className="w-full bg-transparent text-sm text-d-ink outline-none placeholder:text-d-faint"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0">
        <ThemeToggle />
        <LanguageSwitcher variant="neutral" />
        {/* TODO: real user menu (sign out, account) once auth exists */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-d-accent/12 text-sm font-semibold text-d-accent ring-1 ring-d-accent/20 transition-transform hover:scale-105"
          aria-label={t.dash.account}
        >
          {t.dash.guest.charAt(0)}
        </button>
      </div>
    </header>
  );
}
