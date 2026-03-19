import { createContext, useContext, useState, useEffect } from 'react';
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
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || null);

  useEffect(() => {
    if (lang) localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (path, vars) => {
    const keys = path.split('.');
    let val = translations[lang || 'en'];
    for (const k of keys) {
      if (val == null) return path;
      val = val[k];
    }
    if (typeof val === 'string') return vars ? interpolate(val, vars) : val;
    return val ?? path;
  };

  return (
    <LanguageContext.Provider value={{ lang: lang || 'en', setLang, t, hasChosen: !!lang }}>
      {children}
    </LanguageContext.Provider>
  );
};
