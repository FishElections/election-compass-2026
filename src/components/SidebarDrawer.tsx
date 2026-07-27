"use client";

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
  Vote,
} from "lucide-react";
import { CompassMark } from "@/components/CompassMark";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { locales, localizedPath } from "@/i18n/config";

const navItems = [
  { href: "/", icon: Home, key: "home" as const },
  { href: "/quiz", icon: FileText, key: "startQuiz" as const },
  { href: "/how-it-works", icon: Vote, key: "howItWorks" as const },
  { href: "/hot-topics", icon: Flame, key: "hotTopics" as const },
  { href: "/platforms", icon: ScrollText, key: "platforms" as const },
  { href: "/challenge", icon: Brain, key: "challenge" as const },
  { href: "/about", icon: Info, key: "about" as const },
];

export function SidebarDrawer() {
  const pathname = usePathname();
  const { dict, locale } = useDictionary();

  function handleShare() {
    const url = window.location.origin;
    if (navigator.share) {
      navigator.share({ title: dict.nav.brandName, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed top-4 start-4 z-40 flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-ambient-lg transition-all hover:-translate-y-0.5 hover:glow-sapphire cursor-pointer"
        >
          <Menu className="h-4 w-4" />
          {dict.nav.menuButton}
        </button>
      </Dialog.Trigger>
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

          <div className="flex gap-2 border-b border-white/10 px-4 py-3">
            {locales.map((l) => (
              <Dialog.Close asChild key={l.code}>
                <Link
                  href={localizedPath(pathname, l.code)}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors cursor-pointer",
                    l.code === locale
                      ? "bg-sapphire text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {l.label}
                </Link>
              </Dialog.Close>
            ))}
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
