import en from './en.json';
import th from './th.json';

export type Lang = 'th' | 'en';

const translations = { en, th } as const;

export type Translations = typeof en;
export type VisaCountryKey = Exclude<keyof Translations['visaPages'], 'index' | 'thailand' | 'europe'>;
export type VisaRegionKey = 'thailand' | 'europe';

export function getTranslations(lang: Lang): Translations {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const pathname = url.pathname;
  if (pathname.startsWith('/en')) return 'en';
  return 'th';
}

function splitPathSuffix(path: string): { pathname: string; suffix: string } {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');
  let splitIndex = -1;

  if (queryIndex !== -1 && hashIndex !== -1) {
    splitIndex = Math.min(queryIndex, hashIndex);
  } else if (queryIndex !== -1) {
    splitIndex = queryIndex;
  } else if (hashIndex !== -1) {
    splitIndex = hashIndex;
  }

  if (splitIndex === -1) {
    return { pathname: path, suffix: '' };
  }

  return {
    pathname: path.slice(0, splitIndex),
    suffix: path.slice(splitIndex),
  };
}

function ensurePathnameNoTrailingSlash(pathname: string): string {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const normalized = withLeadingSlash.replace(/\/+$/, '');
  return normalized === '' ? '/' : normalized;
}

function normalizePathname(pathname: string): string {
  const withLeadingSlash = ensurePathnameNoTrailingSlash(pathname);

  if (withLeadingSlash === '/index.html') return '/';
  if (withLeadingSlash.endsWith('/index.html')) {
    return ensurePathnameNoTrailingSlash(withLeadingSlash.slice(0, -'/index.html'.length));
  }

  if (withLeadingSlash.endsWith('.html')) {
    return ensurePathnameNoTrailingSlash(withLeadingSlash.slice(0, -'.html'.length));
  }

  return withLeadingSlash;
}

export function getPathWithoutLocale(pathname: string): string {
  const withoutLocale = normalizePathname(pathname).replace(/^\/en(?=\/|$)/, '');
  return withoutLocale === '' ? '/' : ensurePathnameNoTrailingSlash(withoutLocale);
}

export function ensureNoTrailingSlash(path: string): string {
  if (!path.startsWith('/')) return path;
  const { pathname, suffix } = splitPathSuffix(path);
  return `${ensurePathnameNoTrailingSlash(pathname)}${suffix}`;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (!path.startsWith('/')) return path;

  const { pathname, suffix } = splitPathSuffix(path);
  const basePathname = ensurePathnameNoTrailingSlash(getPathWithoutLocale(pathname));
  const localizedPathname = lang === 'th'
    ? basePathname
    : basePathname === '/'
      ? '/en'
      : `/en${basePathname}`;

  return `${localizedPathname}${suffix}`;
}
