import { create } from "zustand";
import en from "../../public/locales/en/common.json";
import id from "../../public/locales/id/common.json";
import { useEffect, useState } from "react";

type LanguageState = {
  locale: string;
  translations: Record<string, string>;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
};

const languages: Record<string, Record<string, string>> = { en, id };

// Create Zustand store (default to 'id')
export const useLanguageStore = create<LanguageState>((set, get) => ({
  locale: "id",
  translations: languages["id"],
  setLocale: (locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("app_lang", locale);
    }
    set({ locale, translations: languages[locale] || languages["id"] });
  },
  t: (key) => get().translations[key] || key,
}));

// Custom hook to initialize language from localStorage (on client)
export const useInitializeLanguage = () => {
  const { setLocale } = useLanguageStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") || "id";
    setLocale(savedLang);
    setHydrated(true);
  }, [setLocale]);

  return hydrated;
};
