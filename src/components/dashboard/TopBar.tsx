"use client";

import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { MenuIcon, SearchIcon } from "./icons";

function titleFor(pathname: string): string {
  if (pathname === "/dashboard") return "Ideas";
  if (pathname.startsWith("/dashboard/saved")) return "Saved";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  if (pathname.startsWith("/dashboard/idea")) return "Idea";
  return "Dashboard";
}

export default function TopBar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const title = titleFor(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-line bg-surface px-4 sm:px-5">
      {/* mobile menu */}
      <button
        onClick={onMenu}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-clay/5 md:hidden"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      {/* breadcrumb / title */}
      <div className="flex min-w-0 items-center gap-2">
        <span className="hidden text-sm text-muted sm:inline">Bazaar</span>
        <span className="hidden text-muted sm:inline">›</span>
        <h1 className="truncate font-display text-lg font-semibold text-ink">{title}</h1>
      </div>

      {/* global search */}
      <div className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-line bg-cream px-3 py-2 text-muted md:flex">
        <SearchIcon className="h-4 w-4 shrink-0" />
        {/* TODO: wire global search to the ideas marketplace */}
        <input
          type="search"
          placeholder="Search ideas…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0">
        <LanguageSwitcher />
        {/* TODO: real user menu (sign out, account) once auth exists */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-turquoise/15 font-display text-sm font-semibold text-turquoise-deep transition-transform hover:scale-105"
          aria-label="Account menu"
        >
          G
        </button>
      </div>
    </header>
  );
}
