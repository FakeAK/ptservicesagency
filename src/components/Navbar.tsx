import { useState, useRef, useEffect } from 'react';
import type { Lang } from '../i18n';
import { getTranslations, getLocalizedPath } from '../i18n';

import logoSrc from '../assets/logo.png';
import thailandFlagSrc from '../assets/flags/thailand.svg';
import ukFlagSrc from '../assets/flags/uk.svg';

interface NavbarProps {
  lang: Lang;
}

export default function Navbar({ lang }: NavbarProps) {
  const t = getTranslations(lang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [visaOpen, setVisaOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const visaRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (visaRef.current && !visaRef.current.contains(e.target as Node)) {
        setVisaOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const currentFlag = lang === 'th' ? thailandFlagSrc : ukFlagSrc;
  const altFlag = lang === 'th' ? ukFlagSrc : thailandFlagSrc;
  const altLang = lang === 'th' ? 'en' : 'th';

  const homePath = lang === 'th' ? '/' : '/en';
  const altHomePath = lang === 'th' ? '/en' : '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white py-3 text-primary" style={{ borderBottom: '1px solid #eee' }}>
      <div className="mx-auto flex max-w-[940px] items-center justify-between px-5">
        {/* Logo */}
        <a href={homePath} className="flex items-center gap-3 no-underline">
          <img
            src={logoSrc.src}
            alt="The logo of PT Services"
            className="h-10"
            loading="lazy"
          />
          <span className="text-xl font-bold text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            PT SERVICES
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0 tablet:flex">
          <a
            href={homePath}
            className="px-5 py-2 text-[15px] font-semibold text-primary no-underline hover:text-nav-hover"
          >
            {t.nav.home}
          </a>

          {/* Services Dropdown */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="px-5 py-2 text-[15px] font-semibold text-primary hover:text-nav-hover"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              {t.nav.services}
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 z-50 min-w-[280px] overflow-hidden rounded-xl border-2 border-primary bg-white shadow-lg">
                {t.nav.servicesDropdown.map((item) => (
                  <a
                    key={item.href}
                    href={getLocalizedPath(item.href, lang)}
                    className="block px-5 py-2.5 text-sm text-primary no-underline hover:bg-gray-50"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Visa Dropdown */}
          <div
            ref={visaRef}
            className="relative"
            onMouseEnter={() => setVisaOpen(true)}
            onMouseLeave={() => setVisaOpen(false)}
          >
            <a
              href={getLocalizedPath('/visa', lang)}
              className="px-5 py-2 text-[15px] font-semibold text-primary no-underline hover:text-nav-hover"
              onClick={(e) => {
                // Allow dropdown to open on click too
              }}
              onMouseEnter={() => setVisaOpen(true)}
            >
              {t.nav.visa}
            </a>
            {visaOpen && (
              <div className="absolute top-full left-0 z-50 min-w-[220px] overflow-hidden rounded-xl border-2 border-primary bg-white shadow-lg">
                {t.nav.visaDropdown.map((item) => (
                  <a
                    key={item.href}
                    href={getLocalizedPath(item.href, lang)}
                    className="block px-5 py-2.5 text-sm text-primary no-underline hover:bg-gray-50"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={getLocalizedPath('/contact', lang)}
            className="px-5 py-2 text-[15px] font-semibold text-primary no-underline hover:text-nav-hover"
          >
            {t.nav.contact}
          </a>
          <a
            href={getLocalizedPath('/blog', lang)}
            className="px-5 py-2 text-[15px] font-semibold text-primary no-underline hover:text-nav-hover"
          >
            {t.nav.blog}
          </a>

          {/* Language Switcher */}
          <div ref={langRef} className="relative ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center"
            >
              <img
                src={currentFlag.src}
                alt=""
                className="h-[30px] w-[30px]"
              />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 z-50 mt-1 flex flex-col items-center gap-2 rounded-lg bg-white p-2 shadow-lg">
                <a href={altHomePath}>
                  <img
                    src={altFlag.src}
                    alt=""
                    className="h-[30px] w-[30px]"
                  />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex flex-col gap-1.5 tablet:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-primary transition-transform ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-primary transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-primary transition-transform ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border-light bg-white px-5 py-4 tablet:hidden">
          <a
            href={homePath}
            className="block py-2 text-[15px] font-semibold text-primary no-underline"
          >
            {t.nav.home}
          </a>

          {/* Services */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex w-full items-center justify-between py-2 text-[15px] font-semibold text-primary"
            >
              {t.nav.services}
              <span className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}>&#9662;</span>
            </button>
            {servicesOpen && (
              <div className="ml-4 border-l-2 border-primary pl-3">
                {t.nav.servicesDropdown.map((item) => (
                  <a
                    key={item.href}
                    href={getLocalizedPath(item.href, lang)}
                    className="block py-1.5 text-sm text-primary no-underline"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Visa */}
          <div>
            <button
              onClick={() => setVisaOpen(!visaOpen)}
              className="flex w-full items-center justify-between py-2 text-[15px] font-semibold text-primary"
            >
              {t.nav.visa}
              <span className={`transition-transform ${visaOpen ? 'rotate-180' : ''}`}>&#9662;</span>
            </button>
            {visaOpen && (
              <div className="ml-4 border-l-2 border-primary pl-3">
                {t.nav.visaDropdown.map((item) => (
                  <a
                    key={item.href}
                    href={getLocalizedPath(item.href, lang)}
                    className="block py-1.5 text-sm text-primary no-underline"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={getLocalizedPath('/contact', lang)}
            className="block py-2 text-[15px] font-semibold text-primary no-underline"
          >
            {t.nav.contact}
          </a>
          <a
            href={getLocalizedPath('/blog', lang)}
            className="block py-2 text-[15px] font-semibold text-primary no-underline"
          >
            {t.nav.blog}
          </a>

          {/* Language Switcher Mobile */}
          <div className="mt-2 flex gap-3 border-t border-border-light pt-3">
            <a href="/">
              <img src={thailandFlagSrc.src} alt="Thai" className="h-[30px] w-[30px]" />
            </a>
            <a href="/en">
              <img src={ukFlagSrc.src} alt="English" className="h-[30px] w-[30px]" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
