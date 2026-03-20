import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

// Helper: replace {key} placeholders in a string
export const interpolate = (str, vars = {}) =>
  str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => localStorage.getItem('lang') || 'en');

  const setLang = useCallback((newLang) => {
    localStorage.setItem('lang', newLang);
    setLangState(newLang);
  }, []);

  const t = useCallback((path, vars) => {
    const keys = path.split('.');
    let val = translations[lang] ?? translations['en'];
    for (const k of keys) {
      if (val == null) return path;
      val = val[k];
    }
    if (typeof val === 'string') return vars ? interpolate(val, vars) : val;
    return val ?? path;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, hasChosen: true }}>
      {children}
    </LanguageContext.Provider>
  );
};
