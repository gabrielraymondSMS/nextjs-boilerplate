"use client";
import { useLanguageStore } from "@/stores/useLanguageStore";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguageStore();

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
      onClick={() => setLocale(locale === "id" ? "en" : "id")}
    >
      {t("change_language")}
    </button>
  );
}
