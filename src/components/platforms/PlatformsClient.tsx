"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ChevronRight, Search } from "lucide-react";
import { getParties, HIDDEN_FROM_PLATFORMS } from "@/data/parties";
import { getPlatformTopics } from "@/data/platformTopics";
import { PlatformTopicKey } from "@/types";
import { PartyLogoGrid } from "@/components/platforms/PartyLogoGrid";
import {
  PartyDetailSheet,
  type PartyNavigationSource,
} from "@/components/platforms/PartyDetailSheet";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/DictionaryProvider";

type CategoryFilter = "all" | PlatformTopicKey;

/** מאיפה נפתחה מפלגה — לאירוע platform_open. ראו docs/analytics.md. */
type OpenSource = "grid" | "search" | PartyNavigationSource;

const PARTY_PARAM = "party";
const TOPIC_PARAM = "topic";
/** pushState/replaceState לא יורים popstate, ולכן writeUrl יורה אירוע משלו
 *  כדי ש-useSyncExternalStore יקרא את ה-URL מחדש. */
const URL_CHANGE_EVENT = "platforms:urlchange";

/** המפלגה והנושא הפתוחים חיים ב-URL (?party=…&topic=…), כדי שאפשר יהיה לשתף
 *  קישור ישיר למפלגה וכדי שכפתור "אחורה" יסגור את הפאנל. History API ולא
 *  useSearchParams: כך העמוד נשאר מרונדר סטטית בלי גבול Suspense. */
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE_EVENT, onChange);
  };
}
const getUrlSnapshot = () => window.location.search;
const getServerUrlSnapshot = () => "";

function writeUrl(
  partyId: string | null,
  category: CategoryFilter,
  mode: "push" | "replace"
) {
  const params = new URLSearchParams(window.location.search);
  if (partyId) params.set(PARTY_PARAM, partyId);
  else params.delete(PARTY_PARAM);
  if (category !== "all") params.set(TOPIC_PARAM, category);
  else params.delete(TOPIC_PARAM);
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
  if (mode === "push") window.history.pushState(null, "", url);
  else window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(URL_CHANGE_EVENT));
}

export function PlatformsClient() {
  const [query, setQuery] = useState("");
  // האם הפאנל נפתח ב-pushState שלנו. אם כן, סגירה = history.back(), כך
  // שכפתור "אחורה" וסגירה ידנית מתנהגים אותו דבר ולא נשארת רשומה מיותרת.
  // אם נכנסו מקישור ישיר (?party=…), אין רשומה שלנו לחזור אליה.
  const pushedRef = useRef(false);
  const { dict, locale } = useDictionary();
  const t = dict.platforms;
  const parties = useMemo(
    () => getParties(locale).filter((p) => !HIDDEN_FROM_PLATFORMS.has(p.id)),
    [locale]
  );
  const platformTopics = useMemo(() => getPlatformTopics(locale), [locale]);

  // ערכים לא מוכרים ב-URL (מפלגה מוסתרת, נושא שלא קיים) פשוט מתעלמים מהם.
  const search = useSyncExternalStore(subscribeToUrl, getUrlSnapshot, getServerUrlSnapshot);
  const params = new URLSearchParams(search);
  const activeParty = parties.find((p) => p.id === params.get(PARTY_PARAM)) ?? null;
  const activePartyId = activeParty?.id ?? null;
  const category: CategoryFilter =
    platformTopics.find((pt) => pt.key === params.get(TOPIC_PARAM))?.key ?? "all";

  // כניסה מקישור ישיר (?party=…) נספרת כפתיחה. נקרא מה-URL ולא מ-activePartyId,
  // כי בהידרציה הראשונה ה-snapshot עדיין ריק.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const partyId = params.get(PARTY_PARAM);
    if (!partyId || !parties.some((p) => p.id === partyId)) return;
    trackEvent("platform_open", {
      party: partyId,
      source: "deeplink",
      topic: params.get(TOPIC_PARAM) ?? "all",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once per page load
  }, []);

  useEffect(() => {
    const onPopState = () => {
      pushedRef.current = new URLSearchParams(window.location.search).has(PARTY_PARAM);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openParty = (partyId: string, source: OpenSource) => {
    if (partyId === activePartyId) return;
    trackEvent("platform_open", { party: partyId, source, topic: category });
    if (activePartyId) {
      writeUrl(partyId, category, "replace");
    } else {
      writeUrl(partyId, category, "push");
      pushedRef.current = true;
    }
  };

  const closeParty = () => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      writeUrl(null, category, "replace");
    }
  };

  const selectCategory = (next: CategoryFilter) => {
    if (next === category) return;
    trackEvent("platform_topic_filter", { topic: next });
    writeUrl(activePartyId, next, "replace");
  };

  const filteredParties = useMemo(() => {
    const q = query.trim();
    if (!q) return parties;
    return parties.filter(
      (party) => party.name.includes(q) || party.leader.includes(q)
    );
  }, [query, parties]);

  // מעבר בין מפלגות בפאנל, לפי הסדר שמוצג ברשת (כולל סינון החיפוש, אם
  // המפלגה הפתוחה בתוכו), עם גלישה מהסוף להתחלה.
  const navigateParty = (delta: 1 | -1, source: PartyNavigationSource) => {
    const list = filteredParties.some((p) => p.id === activePartyId)
      ? filteredParties
      : parties;
    const index = list.findIndex((p) => p.id === activePartyId);
    if (index === -1) return;
    openParty(list[(index + delta + list.length) % list.length].id, source);
  };

  const selectedTopicLabel =
    category !== "all"
      ? platformTopics.find((pt) => pt.key === category)?.label
      : undefined;

  return (
    <main className="flex-1">
      <div className="bg-dot-grid">
        <div className="mx-auto max-w-5xl px-4 pb-8 pt-16 text-center lg:pt-20">
          <h1 className="font-display text-3xl font-normal text-navy sm:text-4xl">
            {t.heading}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-dark">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16">
        {/* החיפוש מוצג רק מ-sm ומעלה: בטלפון הוא תופס גובה משמעותי לפני שרואים
            מפלגה אחת, ו-13 מפלגות לא צריכות חיפוש. בנייד query נשאר "". */}
        <div className="flex flex-col gap-4">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-dark" />
            {/* text-base (16px), not text-sm — a sub-16px input triggers Safari's
                auto-zoom on iOS; shrink to text-sm only from sm: up. */}
            <input
              type="search"
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filteredParties.length === 1) {
                  openParty(filteredParties[0].id, "search");
                }
              }}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border-2 border-gray bg-white py-3 ps-11 pe-4 text-base text-foreground shadow-ambient placeholder:text-gray-dark focus:border-sapphire focus:outline-none sm:text-sm"
            />
          </div>

          {/* הצ'יפים לא מסננים מפלגות: הם קובעים איזה נושא ייפתח אוטומטית
              בפאנל של כל מפלגה שנפתחת. בנייד — שורה אחת נגללת אופקית
              (~40px) במקום כמה שורות עטופות. */}
          <div
            role="group"
            aria-label={t.topicFilterLabel}
            className="-mx-4 flex gap-2 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            <button
              type="button"
              onClick={() => selectCategory("all")}
              aria-pressed={category === "all"}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer active:scale-[0.97]",
                category === "all"
                  ? "border-sapphire bg-sapphire text-white"
                  : "border-gray bg-white text-navy hover:border-sapphire"
              )}
            >
              {t.allFilter}
            </button>
            {platformTopics.map((topic) => (
              <button
                key={topic.key}
                type="button"
                onClick={() => selectCategory(topic.key)}
                aria-pressed={category === topic.key}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer active:scale-[0.97]",
                  category === topic.key
                    ? "border-sapphire bg-sapphire text-white"
                    : "border-gray bg-white text-navy hover:border-sapphire"
                )}
              >
                {topic.icon} {topic.label}
              </button>
            ))}
          </div>

          {/* בנייד ההסבר הכללי מוסתר (חוסך גובה); ההסבר על נושא נבחר מוצג תמיד. */}
          <p
            className={cn(
              "min-h-5 text-sm text-gray-dark",
              !selectedTopicLabel && "hidden sm:block"
            )}
            aria-live="polite"
          >
            {selectedTopicLabel
              ? t.topicHintTemplate.replace("{topic}", selectedTopicLabel)
              : t.gridHint}
          </p>
        </div>

        {filteredParties.length === 0 ? (
          <p className="mt-14 text-center text-gray-dark">
            {t.noResults}
          </p>
        ) : (
          <div className="mt-4 sm:mt-6">
            <PartyLogoGrid
              parties={filteredParties}
              activePartyId={activePartyId}
              ariaLabel={t.gridLabel}
              onSelect={(party) => openParty(party.id, "grid")}
            />
          </div>
        )}

        {/* לעמוד הזה מגיעים גם מי שעוד לא עשו את השאלון. אותו עיצוב כמו
            ה-CTA שסוגר את המדריך "איך זה עובד". */}
        <section className="notch-card bg-grain relative mx-auto mt-14 max-w-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-light p-8 text-center text-white sm:p-10">
          <h2 className="font-display relative z-10 text-2xl font-normal sm:text-3xl">
            {t.quizCta.heading}
          </h2>
          <p className="relative z-10 mt-2 text-white/80">{t.quizCta.subtitle}</p>
          <div className="relative z-10 mt-6">
            <Link
              href="/quiz?mode=short"
              onClick={() => trackEvent("platform_cta_quiz", { location: "footer" })}
            >
              {/* accent ולא default: כפתור navy נבלע ברקע ה-navy של הכרטיס. */}
              <Button size="lg" variant="accent">
                {t.quizCta.cta}
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <PartyDetailSheet
        party={activeParty}
        defaultTopicKey={category !== "all" ? category : null}
        onClose={closeParty}
        onNavigate={navigateParty}
      />
    </main>
  );
}
