"use client";

import Link from "next/link";
import { ComponentProps } from "react";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { localizedPath } from "@/i18n/config";

/**
 * This app's `[lang]` routing is hand-rolled (no Next.js built-in i18n
 * config), so a plain `next/link` never carries the current locale forward —
 * every internal link must resolve through `localizedPath` or it silently
 * drops the user back to the default (Hebrew) locale. Use this instead of
 * `next/link` for every same-site link built from a bare, locale-invariant
 * path (e.g. "/quiz", "/parties/likud").
 */
export function LocalizedLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { locale } = useDictionary();
  const [path, search] = href.split("?");
  const localized = localizedPath(path, locale);
  return <Link href={search ? `${localized}?${search}` : localized} {...props} />;
}
