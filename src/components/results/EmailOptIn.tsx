"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type State = "idle" | "loading" | "success" | "error";

export function EmailOptIn({ topPartyId }: { topPartyId?: string }) {
  const { dict, locale } = useDictionary();
  const t = dict.results.emailOptIn;
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading" || state === "success") return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, topParty: topPartyId, locale, website }),
      });
      if (!res.ok) throw new Error();
      trackEvent("email_optin", { top_party: topPartyId });
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-success/30 bg-success/5 p-5 text-center font-medium text-success">
        <Check className="h-5 w-5 shrink-0" />
        <span>{t.success}</span>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-sapphire/20 bg-sapphire/5 p-5">
      <div className="mb-1 flex items-center gap-2">
        <Mail className="h-5 w-5 shrink-0 text-sapphire" />
        <h2 className="font-bold text-navy">{t.heading}</h2>
      </div>
      <p className="mb-4 text-sm text-gray-dark">{t.description}</p>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        {/* honeypot — hidden from users, catches bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
        />
        <input
          type="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="w-full flex-1 rounded-xl border-2 border-gray bg-white px-4 py-2.5 text-base text-foreground shadow-ambient placeholder:text-gray-dark focus:border-sapphire focus:outline-none sm:text-sm"
        />
        <Button type="submit" disabled={state === "loading"} className="shrink-0">
          {t.button}
        </Button>
      </form>
      {state === "error" && <p className="mt-2 text-sm text-danger">{t.error}</p>}
      <p className="mt-3 text-xs text-gray-dark">{t.privacyNote}</p>
    </div>
  );
}
