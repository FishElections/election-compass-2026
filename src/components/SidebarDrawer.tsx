"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Menu,
  X,
  Home,
  FileText,
  ScrollText,
  Info,
  Share2,
  Brain,
  Flame,
  Globe,
  ChevronDown,
  Vote,
} from "lucide-react";
import { CompassMark } from "@/components/CompassMark";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { locales, localizedPath, pathWithoutLocale } from "@/i18n/config";

const navItems = [
  { href: "/", icon: Home, key: "home" as const },
  { href: "/quiz", icon: FileText, key: "startQuiz" as const },
  { href: "/how-it-works", icon: Vote, key: "howItWorks" as const },
  { href: "/hot-topics", icon: Flame, key: "hotTopics" as const },
  { href: "/platforms", icon: ScrollText, key: "platforms" as const },
  { href: "/challenge", icon: Brain, key: "challenge" as const },
  { href: "/about", icon: Info, key: "about" as const },
];

// The four destinations worth a permanent thumb-reachable slot; everything else
// lives behind "More", which opens the same drawer as the desktop pill.
const tabItems = [
  { href: "/", icon: Home, key: "tabHome" as const },
  { href: "/quiz", icon: FileText, key: "tabQuiz" as const },
  { href: "/hot-topics", icon: Flame, key: "tabHotTopics" as const },
  { href: "/platforms", icon: ScrollText, key: "tabPlatforms" as const },
];

export function SidebarDrawer() {
  const pathname = usePathname();
  const { dict, locale } = useDictionary();
  // Desktop language menu (opposite the menu pill): clicking opens the OTHER
  // locales the user isn't viewing. Mobile has no pill here — language lives in
  // the drawer instead — so this menu is desktop-only and the drawer's own
  // switcher is hidden on desktop to avoid duplicating it.
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currentLocale = locales.find((l) => l.code === locale)!;
  const otherLocales = locales.filter((l) => l.code !== locale);
  // The quiz is a one-screen mobile layout whose top row already holds the
  // progress %, so the corner toggle would collide there — show it desktop-only
  // on /quiz (language is chosen before starting anyway).
  const onQuiz = pathWithoutLocale(pathname).startsWith("/quiz");

  useEffect(() => {
    if (!langOpen) return;
    function onDown(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [langOpen]);

  function handleShare() {
    const url = `${window.location.origin}${localizedPath("/", locale)}`;
    if (navigator.share) {
      navigator.share({ title: dict.nav.brandName, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <Dialog.Root>
      {/* Desktop keeps the floating pill. On a phone the top corner is the worst
          place a one-handed thumb can reach, so the same drawer is opened from
          the bottom tab bar below instead. */}
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed top-4 start-4 z-40 hidden items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-ambient-lg transition-all hover:-translate-y-0.5 hover:glow-sapphire cursor-pointer lg:flex"
        >
          <Menu className="h-4 w-4" />
          {dict.nav.menuButton}
        </button>
      </Dialog.Trigger>

      {/* Language menu, docked in the top-end corner on every screen size
          (on desktop it sits opposite the menu pill). Click opens the other
          locales — this is the single language control, so the drawer no
          longer carries its own. */}
      <div
        ref={langRef}
        className={cn(
          "fixed top-4 end-4 z-50",
          onQuiz ? "hidden lg:block" : "block"
        )}
      >
        <button
          type="button"
          onClick={() => setLangOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={langOpen}
          aria-label={dict.nav.switchLanguage}
          className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2.5 text-sm font-semibold text-navy shadow-ambient-lg ring-1 ring-navy/10 transition-all hover:-translate-y-0.5 hover:glow-sapphire cursor-pointer"
        >
          <Globe className="h-4 w-4" />
          {currentLocale.label}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              langOpen && "rotate-180"
            )}
          />
        </button>
        {langOpen && (
          <div
            role="menu"
            className="absolute end-0 mt-2 flex min-w-[9rem] flex-col overflow-hidden rounded-xl bg-white shadow-ambient-lg ring-1 ring-navy/10"
          >
            {otherLocales.map((l) => (
              <Link
                key={l.code}
                href={localizedPath(pathname, l.code)}
                role="menuitem"
                onClick={() => setLangOpen(false)}
                className="px-4 py-2.5 text-start text-sm font-medium text-navy transition-colors hover:bg-sapphire/10"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Navy, not white: against the #f8fafc page a white bar with a hairline
          border reads as part of the page and gets missed. Solid navy also
          matches the drawer and the themeColor tinting the browser chrome, so
          the app ends up framed top and bottom. Gold marks the current tab,
          same "you are here" cue the drawer uses. */}
      <nav
        aria-label={dict.nav.primaryNav}
        className="fixed inset-x-0 bottom-0 z-40 flex h-[var(--mobile-nav-h)] items-stretch bg-navy pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_-6px_rgba(11,19,43,0.45)] lg:hidden"
      >
        {tabItems.map((item) => {
          const href = localizedPath(item.href, locale);
          const isActive =
            item.href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={item.href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-bold transition-colors active:bg-white/10",
                isActive ? "text-white" : "text-white/55"
              )}
            >
              {isActive && (
                <span className="absolute top-0 h-0.5 w-8 rounded-b-full bg-gold" />
              )}
              <item.icon className="h-5 w-5" />
              {dict.nav[item.key]}
            </Link>
          );
        })}
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-white/55 transition-colors active:bg-white/10"
          >
            <Menu className="h-5 w-5" />
            {dict.nav.tabMore}
          </button>
        </Dialog.Trigger>
      </nav>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-navy-dark/60 backdrop-blur-[2px] data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out" />
        <Dialog.Content
          className="fixed inset-y-0 start-0 z-50 flex h-full w-[85vw] max-w-sm flex-col bg-navy/95 text-white shadow-2xl backdrop-blur-lg focus:outline-none data-[state=open]:animate-drawer-in data-[state=closed]:animate-drawer-out"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sapphire to-success text-white">
                <CompassMark animate className="h-6 w-6" />
              </div>
              <Dialog.Title asChild>
                <span className="font-bold text-white">{dict.nav.brandName}</span>
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label={dict.nav.closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {navItems.map((item, i) => {
              const href = localizedPath(item.href, locale);
              const isActive = pathname === href;
              return (
                <Dialog.Close asChild key={item.href}>
                  <Link
                    href={href}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={cn(
                      "animate-nav-item-in relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-150",
                      isActive
                        ? "from-sapphire/90 to-sapphire/40 text-white rtl:bg-gradient-to-l ltr:bg-gradient-to-r"
                        : "text-white/75 hover:bg-white/10 hover:text-white rtl:hover:-translate-x-[3px] ltr:hover:translate-x-[3px]"
                    )}
                  >
                    {isActive && (
                      <span className="absolute start-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-gold" />
                    )}
                    <item.icon className="h-5 w-5 shrink-0" />
                    {dict.nav[item.key]}
                  </Link>
                </Dialog.Close>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-sapphire hover:bg-white/5 cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              {dict.nav.shareSite}
            </button>
            <p className="mt-3 text-center text-xs text-white/40">
              {dict.nav.version}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
