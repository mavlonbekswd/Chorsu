"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BagIcon, BookmarkIcon, FolderIcon, GearIcon, ChevronIcon, DomeMark } from "./icons";

const SECTORS = ["Retail", "Food", "Education", "Health", "Services"];

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();
  const [sectorsOpen, setSectorsOpen] = useState(false);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-[1px] md:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-line bg-surface transition-all duration-300 md:static md:translate-x-0 ${
          collapsed ? "md:w-16" : "md:w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* logo / brand */}
        <div className={`flex h-16 items-center border-b border-line ${collapsed ? "md:justify-center md:px-0" : ""} px-4`}>
          <Link href="/dashboard" className="flex items-center gap-2" aria-label="Chorsu dashboard home" onClick={onCloseMobile}>
            {collapsed ? (
              <DomeMark className="hidden h-7 w-7 md:block" />
            ) : null}
            <Image
              src="/chorsu-logo.png"
              alt="Chorsu"
              width={180}
              height={52}
              priority
              className={`h-7 w-auto ${collapsed ? "md:hidden" : ""}`}
            />
          </Link>
        </div>

        {/* main nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <NavItem href="/dashboard" label="Ideas" active={isActive("/dashboard", true)} collapsed={collapsed} onClick={onCloseMobile} icon={<BagIcon />} />
          <NavItem href="/dashboard/saved" label="Saved" active={isActive("/dashboard/saved")} collapsed={collapsed} onClick={onCloseMobile} icon={<BookmarkIcon />} />

          {/* Sectors (expandable) */}
          <button
            onClick={() => {
              // collapse only applies on desktop; on mobile always toggle the list
              if (collapsed && typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
                onToggleCollapse();
              } else {
                setSectorsOpen((v) => !v);
              }
            }}
            className={`group mt-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-clay/5 hover:text-ink ${collapsed ? "md:justify-center md:px-0" : ""}`}
            aria-expanded={sectorsOpen}
            title={collapsed ? "Sectors" : undefined}
          >
            <span className="shrink-0 text-ink/60 group-hover:text-clay-deep">
              <FolderIcon />
            </span>
            <span className={`flex-1 text-left ${collapsed ? "md:hidden" : ""}`}>Sectors</span>
            <ChevronIcon className={`h-4 w-4 text-muted transition-transform ${sectorsOpen ? "rotate-90" : ""} ${collapsed ? "md:hidden" : ""}`} />
          </button>
          {sectorsOpen && (
            <ul className={`mb-1 ml-4 mt-0.5 space-y-0.5 border-l border-line pl-3 ${collapsed ? "md:hidden" : ""}`}>
              {SECTORS.map((s) => (
                <li key={s}>
                  <Link
                    href={`/dashboard?sector=${s.toLowerCase()}`}
                    onClick={onCloseMobile}
                    className="block rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-clay/5 hover:text-ink"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* faint girih thread */}
        <div className="girih-texture mx-3 h-px opacity-40" aria-hidden="true" />

        {/* pinned bottom: settings + user */}
        <div className="px-2 py-3">
          <NavItem href="/dashboard/settings" label="Settings" active={isActive("/dashboard/settings")} collapsed={collapsed} onClick={onCloseMobile} icon={<GearIcon />} />

          <div className={`mt-2 flex items-center gap-3 rounded-lg border border-line bg-cream px-3 py-2 ${collapsed ? "md:justify-center md:px-0" : ""}`}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-turquoise/15 font-display text-sm font-semibold text-turquoise-deep">
              G
            </span>
            <div className={`min-w-0 flex-1 ${collapsed ? "md:hidden" : ""}`}>
              <p className="truncate text-sm font-medium text-ink">Guest</p>
              <span className="inline-flex items-center rounded-full bg-saffron/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-clay-deep">
                Free
              </span>
            </div>
          </div>
        </div>

        {/* desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden items-center justify-center gap-2 border-t border-line py-2 text-xs font-medium text-muted transition-colors hover:bg-clay/5 hover:text-ink md:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronIcon className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>
    </>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
  collapsed,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      className={`group relative mt-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-turquoise/10 text-ink" : "text-ink/75 hover:bg-clay/5 hover:text-ink"
      } ${collapsed ? "md:justify-center md:px-0" : ""}`}
    >
      {/* active accent bar */}
      {active && <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-turquoise" aria-hidden="true" />}
      <span className={`shrink-0 ${active ? "text-turquoise-deep" : "text-ink/60 group-hover:text-clay-deep"}`}>{icon}</span>
      <span className={`flex-1 ${collapsed ? "md:hidden" : ""}`}>{label}</span>
    </Link>
  );
}
