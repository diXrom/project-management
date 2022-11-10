import React from 'react';
import { useTranslation } from 'react-i18next';

type Languages = Record<string, Record<string, string>>;

const lngs: Languages = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Русский' },
};

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
    </div>
  );
}
