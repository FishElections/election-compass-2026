"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useDictionary } from "@/i18n/DictionaryProvider";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-install-dismissed";

// A quiet, dismissible "add to home screen" banner. Only appears on browsers
// that fire `beforeinstallprompt` (Android/Chrome/Edge) and only if the site
// isn't already installed and the user hasn't dismissed it before. iOS Safari
// doesn't support the event, so nothing shows there.
export function InstallPrompt() {
  const { dict } = useDictionary();
  const t = dict.install;
  const [evt, setEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY)) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    function onPrompt(e: Event) {
      e.preventDefault();
      setEvt(e as BeforeInstallPromptEvent);
      setShow(true);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage may be unavailable */
    }
  }

  async function install() {
    if (!evt) return;
    await evt.prompt();
    await evt.userChoice.catch(() => {});
    dismiss();
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-[var(--mobile-nav-h)] z-40 flex items-center gap-3 border-t border-gray bg-background/95 px-4 py-2.5 backdrop-blur-md lg:bottom-0">
      <Download className="h-5 w-5 shrink-0 text-sapphire" />
      <p className="flex-1 text-sm font-medium text-navy">{t.title}</p>
      <button
        type="button"
        onClick={install}
        className="shrink-0 cursor-pointer rounded-lg bg-navy px-3 py-1.5 text-sm font-semibold text-white transition-transform active:scale-[0.97]"
      >
        {t.button}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t.dismiss}
        className="shrink-0 cursor-pointer rounded-full p-1.5 text-gray-dark transition-colors hover:bg-gray-light active:scale-[0.97]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
