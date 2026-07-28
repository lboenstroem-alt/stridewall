export type Locale = 'de' | 'en';

export type PageKey =
  | 'home'
  | 'vorgehen'
  | 'kiVerordnung'
  | 'ueberUns'
  | 'kontakt'
  | 'impressum'
  | 'datenschutz'
  | 'notFound';

/**
 * Route map, one entry per page. The legal pages exist in German only
 * (they are the legally binding versions); both locales link to them.
 */
export const routes: Record<PageKey, Record<Locale, string>> = {
  home: { de: '/', en: '/en/' },
  vorgehen: { de: '/vorgehen', en: '/en/approach' },
  kiVerordnung: { de: '/ki-verordnung', en: '/en/eu-ai-act' },
  ueberUns: { de: '/ueber-uns', en: '/en/about' },
  kontakt: { de: '/kontakt', en: '/en/contact' },
  impressum: { de: '/impressum', en: '/impressum' },
  datenschutz: { de: '/datenschutz', en: '/datenschutz' },
  // One 404 document serves every unmatched path, so it has no translation.
  notFound: { de: '/404', en: '/404' },
};

export const altLocale = (l: Locale): Locale => (l === 'de' ? 'en' : 'de');

export const ui: Record<
  Locale,
  {
    skip: string;
    nav: { key: PageKey; label: string }[];
    footerLegal: string;
    footerNav: string;
    footerContact: string;
    footerClaim: string;
    footerNoTracking: string;
    langSwitch: string;
    langSwitchShort: string;
  }
> = {
  de: {
    skip: 'Zum Inhalt springen',
    nav: [
      { key: 'vorgehen', label: 'Vorgehen' },
      { key: 'kiVerordnung', label: 'KI-Verordnung' },
      { key: 'ueberUns', label: 'Über uns' },
      { key: 'kontakt', label: 'Kontakt' },
    ],
    footerLegal: 'Rechtliches',
    footerNav: 'Navigation',
    footerContact: 'Kontakt',
    footerClaim: 'KI mit Methode, für den deutschen Mittelstand.',
    footerNoTracking: 'Diese Website setzt keine Cookies und verwendet kein Tracking.',
    langSwitch: 'English',
    langSwitchShort: 'EN',
  },
  en: {
    skip: 'Skip to content',
    nav: [
      { key: 'vorgehen', label: 'Approach' },
      { key: 'kiVerordnung', label: 'EU AI Act' },
      { key: 'ueberUns', label: 'About' },
      { key: 'kontakt', label: 'Contact' },
    ],
    footerLegal: 'Legal',
    footerNav: 'Navigation',
    footerContact: 'Contact',
    footerClaim: 'Methodical AI adoption for the German Mittelstand.',
    footerNoTracking: 'This website sets no cookies and uses no tracking.',
    langSwitch: 'Deutsch',
    langSwitchShort: 'DE',
  },
};
