"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const [city, setCity] = useState("");
  const [bloodType, setBloodType] = useState("");
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for ${bloodType || "All"} blood types in ${city || "current location"}...`);
  };

  return (
    <section className="pt-36 pb-20 bg-[radial-gradient(circle_at_10%_20%,rgba(211,47,47,0.03)_0%,rgba(255,255,255,0)_60%)] overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Active Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100/70 px-4 py-2 rounded-full w-max mb-7 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {t("hero.badge")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.12] mb-6 tracking-tight">
            {t("hero.title1")}<br />
            <span className="text-primary relative inline-block">{t("hero.title2")}</span>
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-gray-500 max-w-xl mb-9 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Search Bar Panel */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center p-2 bg-white border border-gray-100 rounded-xl shadow-md max-w-2xl mb-9 gap-2 sm:gap-0 w-full"
          >
            {/* City Input */}
            <div className="flex items-center gap-3 px-3 flex-1 w-full">
              <svg className="text-primary flex-shrink-0" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2 bg-transparent text-gray-900 placeholder-gray-400 font-medium outline-none text-sm"
              />
            </div>

            {/* Divider line */}
            <div className="hidden sm:block w-px h-8 bg-gray-100 flex-shrink-0" />

            {/* Blood Type Selection */}
            <div className="flex items-center gap-3 px-3 flex-1 w-full">
              <svg className="text-blue-500 flex-shrink-0" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
              </svg>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full py-2 bg-transparent text-gray-900 font-medium outline-none cursor-pointer appearance-none pr-8 bg-no-repeat bg-[right_0px_center] bg-[length:14px] [background-image:url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_fill=%22none%22_viewBox=%220_0_24_24%22_stroke=%22currentColor%22_stroke-width=%222.5%22%3E%3Cpath_stroke-linecap=%22round%22_stroke-linejoin=%22round%22_d=%22M19_9l-7_7-7-7%22/%3E%3C/svg%3E')]"
              >
                <option value="">{t("hero.searchAllBlood")}</option>
                <option value="O-">Type O- (Universal)</option>
                <option value="O+">Type O+</option>
                <option value="A-">Type A-</option>
                <option value="A+">Type A+</option>
                <option value="B-">Type B-</option>
                <option value="B+">Type B+</option>
                <option value="AB-">Type AB-</option>
                <option value="AB+">Type AB+</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white px-7 py-3 rounded-lg font-bold text-sm transition-all duration-200 shadow-md shadow-red-100 w-full sm:w-auto hover:-translate-y-0.5"
            >
              <span>{t("hero.searchBtn")}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          {/* Social Proof */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden -mr-3 bg-white shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 32 32" width="40" height="40">
                  <circle cx="16" cy="16" r="16" fill="#E2E8F0" />
                  <circle cx="16" cy="13" r="6" fill="#475569" />
                  <path d="M6 28c0-5 4-8 10-8s10 3 10 8" fill="#475569" />
                  <rect x="13" y="18" width="6" height="4" fill="#38BDF8" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden -mr-3 bg-white shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 32 32" width="40" height="40">
                  <circle cx="16" cy="16" r="16" fill="#F87171" />
                  <circle cx="16" cy="13" r="6" fill="#FFFFFF" />
                  <path d="M6 28c0-5 4-8 10-8s10 3 10 8" fill="#FFFFFF" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden -mr-3 bg-white shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 32 32" width="40" height="40">
                  <circle cx="16" cy="16" r="16" fill="#34D399" />
                  <circle cx="16" cy="13" r="6" fill="#065F46" />
                  <path d="M6 28c0-5 4-8 10-8s10 3 10 8" fill="#065F46" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center shadow-sm">
                +12k
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-normal max-w-xs ml-2">
              {t("hero.socialProof")}
            </p>
          </div>
        </div>

        {/* Right Card / Visual */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div className="relative w-full max-w-md aspect-[1.15] rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:scale-[1.01] transition-transform duration-500 ease-out group">
            <div className="relative w-full h-full">
              <Image
                src="/blood_donation_clinic.png"
                alt="VitaNova Blood Donation Clinic"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Glassmorphic Critical Need Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 md:p-5 bg-white/75 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg flex items-center justify-between transition-transform duration-300 group-hover:-translate-y-0.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] md:text-xs font-extrabold text-primary tracking-wider uppercase">
                  {t("hero.criticalNeed")}
                </span>
                <span className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                  {t("hero.criticalNeedText")}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <svg className="animate-pulse" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="var(--color-primary)" stroke="var(--color-primary)" />
                  <line x1="12" y1="9" x2="12" y2="13" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
