"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

interface HospitalServiceCardProps {
  title: string;
  description: string;
  iconBgClass: string;
  icon: React.ReactNode;
}

const HospitalServiceCard = ({ title, description, iconBgClass, icon }: HospitalServiceCardProps) => {
  const { t } = useLanguage();
  const stylesMap: Record<string, { bg: string; text: string }> = {
    iconBgRed: { bg: "bg-red-50 text-red-500", text: "text-red-500" },
    iconBgBlue: { bg: "bg-blue-50 text-blue-500", text: "text-blue-500" },
    iconBgGreen: { bg: "bg-green-50 text-green-500", text: "text-green-500" },
  };

  const currentTheme = stylesMap[iconBgClass] || stylesMap.iconBgRed;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg shadow-sm group">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${currentTheme.bg}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">{description}</p>
      <a
        href="#"
        className="inline-flex items-center gap-2 text-sm font-bold border border-secondary text-secondary hover:bg-blue-50/20 px-5 py-2.5 rounded-lg w-max transition-all duration-200 hover:-translate-y-0.5 mt-auto"
      >
        <span>{t("hospitals.cardLearnMore")}</span>
        <svg className="transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  );
};

export default function HospitalsPage() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("hospitals.card1Title"),
      description: t("hospitals.card1Desc"),
      iconBgClass: "iconBgRed",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: t("hospitals.card2Title"),
      description: t("hospitals.card2Desc"),
      iconBgClass: "iconBgRed",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
        </svg>
      ),
    },
    {
      title: t("hospitals.card3Title"),
      description: t("hospitals.card3Desc"),
      iconBgClass: "iconBgBlue",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
    {
      title: t("hospitals.card4Title"),
      description: t("hospitals.card4Desc"),
      iconBgClass: "iconBgGreen",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      title: t("hospitals.card5Title"),
      description: t("hospitals.card5Desc"),
      iconBgClass: "iconBgBlue",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
        </svg>
      ),
    },
    {
      title: t("hospitals.card6Title"),
      description: t("hospitals.card6Desc"),
      iconBgClass: "iconBgBlue",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="pt-32 pb-20 bg-gray-50/30 min-h-screen">
      <div className="container mx-auto px-6 flex flex-col gap-12 w-full">
        {/* Header Red Banner */}
        <section className="bg-primary rounded-2xl p-12 md:p-14 text-white relative overflow-hidden shadow-lg shadow-red-500/5">
          <div className="max-w-2xl relative z-10 flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {t("hospitals.bannerTitle")}
            </h1>
            <p className="text-base md:text-lg opacity-90 leading-relaxed max-w-xl">
              {t("hospitals.bannerDesc")}
            </p>
          </div>
          {/* Heartbeat Overlay */}
          <svg className="absolute right-0 top-0 h-full w-auto opacity-[0.08] z-0 pointer-events-none" viewBox="0 0 400 200" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 0 100 L 120 100 L 135 70 L 150 130 L 165 40 L 180 160 L 195 100 L 210 115 L 220 100 L 400 100" />
          </svg>
        </section>

        {/* Grid of 6 Services */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {services.map((service, index) => (
            <HospitalServiceCard
              key={index}
              title={service.title}
              description={service.description}
              iconBgClass={service.iconBgClass}
              icon={service.icon}
            />
          ))}
        </section>

        {/* Bottom CTA Block */}
        <section className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-100/40 w-full items-stretch">
          {/* Left Visual image */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-0 w-full">
            <Image
              src="/medical_equipment.png"
              alt="VitaNova Medical Lab Equipment"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Right text panel */}
          <div className="lg:col-span-6 p-8 md:p-14 lg:p-16 flex flex-col justify-center">
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3">
              {t("hospitals.ctaBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              {t("hospitals.ctaTitle")}
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              {t("hospitals.ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link
                href="/signup"
                className="bg-primary hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-lg text-center shadow-md shadow-red-100 transition-all duration-200 hover:-translate-y-0.5"
              >
                {t("hospitals.ctaBtnRegister")}
              </Link>
              <a
                href="#"
                className="border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-7 py-3.5 rounded-lg text-center transition-all duration-200 hover:-translate-y-0.5"
              >
                {t("hospitals.ctaBtnCenters")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
