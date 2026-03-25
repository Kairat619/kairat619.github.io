export const SUPPORTED_LOCALES = ["en", "kk"] as const;

export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = "en";

export function isLocale(value: string): value is SiteLocale {
  return SUPPORTED_LOCALES.includes(value as SiteLocale);
}

export function getLocaleFromPathname(pathname: string): SiteLocale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return firstSegment && isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}

export function stripLocaleFromPathname(pathname: string) {
  const cleanPath = pathname === "" ? "/" : pathname;
  const segments = cleanPath.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return cleanPath;
}

export function localizePath(path: string, locale: SiteLocale) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = stripLocaleFromPathname(normalizedPath);

  if (locale === DEFAULT_LOCALE) {
    return cleanPath;
  }

  return cleanPath === "/" ? `/${locale}/` : `/${locale}${cleanPath}`;
}

export function switchLocalePath(pathname: string, search: string, locale: SiteLocale) {
  return `${localizePath(pathname, locale)}${search || ""}`;
}

export function getDateLocale(locale: SiteLocale) {
  return locale === "kk" ? "kk-KZ" : "en-US";
}
