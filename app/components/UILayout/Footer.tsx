"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 w-full">
      <div className="container mx-auto px-6 w-full">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14 w-full">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="text-2xl font-extrabold tracking-tight">
              Vita<span className="text-primary">Nova</span>
            </div>
            <p className="text-sm md:text-base text-gray-500 max-w-sm leading-relaxed">
              {t("footer.desc")}
            </p>
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mt-2">
              <input
                type="email"
                placeholder={t("footer.newsletter")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow bg-gray-50 border border-gray-100 px-4 py-3 rounded-lg text-sm text-gray-900 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-red-600/5"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors duration-200"
              >
                {subscribed ? t("footer.subscribed") : t("footer.subscribeBtn")}
              </button>
            </form>
          </div>

          {/* Links Column 1 */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("footer.columnAbout")}</h4>
            <ul className="flex flex-col gap-3 list-none">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Our Mission</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">How it Works</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Annual Reports</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Press & Media</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("footer.columnResources")}</h4>
            <ul className="flex flex-col gap-3 list-none">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Donor Guidelines</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Blood Compatibility</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">FAQs</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Emergency Protocol</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t("footer.columnHospitals")}</h4>
            <ul className="flex flex-col gap-3 list-none">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Register Facility</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Inventory Portal</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">API Access</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors duration-200">Support Services</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>

          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter/X" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-100 text-gray-500 transition-all duration-200 hover:text-primary hover:bg-red-50 hover:border-red-100 hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-100 text-gray-500 transition-all duration-200 hover:text-primary hover:bg-red-50 hover:border-red-100 hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-100 text-gray-500 transition-all duration-200 hover:text-primary hover:bg-red-50 hover:border-red-100 hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
