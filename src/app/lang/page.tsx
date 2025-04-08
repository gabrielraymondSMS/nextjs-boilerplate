"use client";
import LanguageSwitcher from "@/components/common/languageSwitcher/LanguageSwitcher";
import { useInitializeLanguage, useLanguageStore } from "@/stores/useLanguageStore";
import React from "react";

const Page = () => {
  const { t } = useLanguageStore();
  const hydrated = useInitializeLanguage(); // Ensure language is loaded on client

  if (!hydrated) return null; // Prevent rendering until language is loaded

  return (
    <div>
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>
      <LanguageSwitcher />
    </div>
  );
};

export default Page;
