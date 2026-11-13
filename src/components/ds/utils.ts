export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

export const hostOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export const isExternal = (href: string) => /^https?:/.test(href);

