"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Menu,
  X,
  ShieldCheck,
  Home,
  FileText,
  ScrollText,
  Swords,
  Info,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "דף הבית", icon: Home },
  { href: "/quiz", label: "התחל שאלון", icon: FileText },
  { href: "/platforms", label: "סיכומי מצעי המפלגות", icon: ScrollText },
  { href: "/compare", label: "השוואת מפלגות", icon: Swords },
  { href: "/about", label: "אודות והסבר על האלגוריתם", icon: Info },
];

export function SidebarDrawer() {
  const pathname = usePathname();

  function handleShare() {
    const url = window.location.origin;
    if (navigator.share) {
      navigator.share({ title: "מצפן בחירות 2026", url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="fixed top-4 right-4 z-40 flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
        >
          <Menu className="h-4 w-4" />
          תפריט
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 flex h-full w-[85vw] max-w-sm flex-col bg-white shadow-2xl focus:outline-none data-[state=open]:animate-drawer-in data-[state=closed]:animate-drawer-out"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-gray px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <Dialog.Title asChild>
                <span className="font-bold text-navy">מצפן בחירות 2026</span>
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-dark transition-colors hover:bg-gray-light hover:text-navy cursor-pointer"
                aria-label="סגור תפריט"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Dialog.Close asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-navy text-white"
                        : "text-foreground hover:bg-gray-light"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                </Dialog.Close>
              );
            })}
          </nav>

          <div className="border-t border-gray p-4">
            <button
              type="button"
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:border-navy hover:bg-gray-light cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              שתפו את האתר
            </button>
            <p className="mt-3 text-center text-xs text-gray-dark">
              v1.0 · בחירות 2026
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
