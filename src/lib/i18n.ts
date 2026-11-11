import enMessages from "../../messages/en.json";
import frMessages from "../../messages/fr.json";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export type Messages = typeof enMessages;

export const MESSAGES: Record<Locale, Messages> = {
  en: enMessages,
  fr: frMessages,
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
