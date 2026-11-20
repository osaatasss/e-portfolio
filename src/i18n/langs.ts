export const LANGS = [
  { code: 'nl', name: 'Nederlands', label: 'NL' },
  { code: 'en', name: 'English', label: 'EN' },
  { code: 'ro', name: 'Română', label: 'RO' },
] as const;

export type Lang = (typeof LANGS)[number]['code'];

export const DEFAULT_LANG: Lang = 'en';

export const isLang = (value: unknown): value is Lang => LANGS.some((l) => l.code === value);

export type HlParts = { before: string; hl: string; after: string };
