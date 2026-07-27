"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./dictionaries";
import type { Locale } from "./config";

interface DictionaryContextValue {
  dict: Dictionary;
  locale: Locale;
  dir: "ltr" | "rtl";
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function DictionaryProvider({
  dict,
  locale,
  dir,
  children,
}: DictionaryContextValue & { children: React.ReactNode }) {
  return (
    <DictionaryContext.Provider value={{ dict, locale, dir }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): DictionaryContextValue {
  const ctx = useContext(DictionaryContext);
  if (!ctx) {
    throw new Error("useDictionary must be used inside DictionaryProvider");
  }
  return ctx;
}
