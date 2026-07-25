"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("nav.patients"), path: "/" },
    { name: t("nav.hospitals"), path: "/hospitals" },
    { name: t("nav.donors"), path: "/#donors" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const getIsActive = (itemPath: string) => {
    if (itemPath === "/") {
      return pathname === "/";
    }
    const basePath = itemPath.split(/[?#]/)[0];
    if (basePath === "") return false;
    return pathname.startsWith(basePath);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 border-b border-gray-100 bg-white/85 backdrop-blur-md ${
        isScrolled ? "h-[70px] shadow-sm bg-white/95" : "h-20"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-2xl cursor-pointer">
          <Image
            src="/vitanova512.png"
            alt="VitaNova Logo"
            width={32}
            height={32}
            className="rounded-md object-contain"
            priority
          />
          <span className="text-gray-900 font-extrabold tracking-tight">
            Vita<span className="text-primary">Nova</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => {
            const active = getIsActive(item.path);
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`text-base font-semibold transition-colors duration-200 relative py-2 ${
                  active
                    ? "text-primary font-bold after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[3px] after:bg-primary after:rounded-full"
                    : "text-neutral hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          {/* Globe Switcher */}
          <div className="flex items-center gap-1.5 border border-gray-100 bg-gray-50/50 pl-2.5 pr-1.5 py-1.5 rounded-lg">
            <svg className="text-neutral" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="text-xs font-bold text-neutral bg-transparent outline-none cursor-pointer pr-4"
              aria-label="Language Selector"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="es">ES</option>
              <option value="tw">TW</option>
            </select>
          </div>

          <Link
            href="/login"
            className="text-base font-semibold text-neutral hover:text-primary transition-colors duration-200 px-2 py-2"
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/signup"
            className="text-base font-bold bg-primary hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md shadow-red-100 hover:shadow-lg hover:-translate-y-0.5"
          >
            {t("nav.register")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex md:hidden flex-col justify-between w-6 h-[17px] z-[60] outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`block h-[2px] w-full bg-gray-900 rounded transition-all duration-200 ${
              mobileMenuOpen ? "transform translateY-[7.5px] rotate-45" : ""
            }`}
          ></span>
          <span
            className={`block h-[2px] w-full bg-gray-900 rounded transition-all duration-200 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-[2px] w-full bg-gray-900 rounded transition-all duration-200 ${
              mobileMenuOpen ? "transform translateY-[-7.5px] rotate-[-45deg]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-[280px] h-screen bg-white shadow-2xl px-6 pt-24 pb-8 transition-all duration-300 ease-in-out z-50 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 w-full">
          {/* Mobile Globe Switcher */}
          <div className="flex items-center gap-2 border border-gray-100 bg-gray-50/50 px-3 py-2.5 rounded-lg w-full justify-between">
            <div className="flex items-center gap-2">
              <svg className="text-neutral" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="text-sm font-semibold text-neutral">Language</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="text-xs font-bold text-neutral bg-transparent outline-none cursor-pointer"
            >
              <option value="en">English (EN)</option>
              <option value="fr">Français (FR)</option>
              <option value="es">Español (ES)</option>
              <option value="tw">Twi (TW)</option>
            </select>
          </div>

          {navItems.map((item) => {
            const active = getIsActive(item.path);
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-semibold py-1.5 text-left border-b border-gray-50 ${
                  active ? "text-primary font-bold" : "text-neutral hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <hr className="border-gray-100 my-2" />
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-neutral text-left py-2 hover:text-primary transition-colors duration-200"
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/signup"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold bg-primary hover:bg-red-700 text-white py-3 rounded-lg text-center shadow-md shadow-red-100"
          >
            {t("nav.register")}
          </Link>
        </nav>
      </div>
    </header>
  );
}