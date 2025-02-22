export const i18n = {
  defaultLocale: "ar",
  locales: ["ar", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
