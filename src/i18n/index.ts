import en from './en.json';
import th from './th.json';

export type Lang = 'th' | 'en';

const translations = { en, th } as const;

export function getTranslations(lang: Lang) {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const pathname = url.pathname;
  if (pathname.startsWith('/en')) return 'en';
  return 'th';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === 'th') return path;
  return `/en${path}`;
}
