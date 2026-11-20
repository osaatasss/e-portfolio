import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18nContext } from './context';
import { DEFAULT_LANG, isLang, type Lang } from './langs';
import en, { type Messages } from './messages/en';
import nl from './messages/nl';
import ro from './messages/ro';

const MESSAGES: Record<Lang, Messages> = { en, nl, ro };
const STORAGE_KEY = 'pf-lang';

const detectLang = (): Lang => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* storage unavailable */
  }
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const code = tag?.slice(0, 2).toLowerCase();
    if (isLang(code)) return code;
  }
  return DEFAULT_LANG;
};

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const t = MESSAGES[lang];

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export default LanguageProvider;
