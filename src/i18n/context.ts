import { createContext, useContext } from 'react';
import { DEFAULT_LANG, type Lang } from './langs';
import en, { type Messages } from './messages/en';

export type I18n = { lang: Lang; setLang: (lang: Lang) => void; t: Messages };

export const I18nContext = createContext<I18n>({ lang: DEFAULT_LANG, setLang: () => {}, t: en });

export const useI18n = () => useContext(I18nContext);
