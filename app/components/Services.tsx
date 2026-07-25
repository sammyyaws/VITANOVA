"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  themeClass: string;
}

const ServiceCard = ({ title, description, icon, actionText, themeClass }: ServiceCardProps) => {
  // Map custom theme styles in Tailwind
  const stylesMap: Record<string, { border: string; icon: string; text: string; bg: string }> = {
    blue: {
      border: "before:bg-blue-500 hover:shadow-blue-500/5",
      icon: "text-blue-500 bg-blue-50",
      text: "text-blue-500",
      bg: "hover:bg-blue-50/10",
    },
    red: {
      border: "before:bg-primary hover:shadow-red-500/5",
      icon: "text-primary bg-red-50",
      text: "text-primary",
      bg: "hover:bg-red-50/10",
    },
    green: {
      border: "before:bg-green-500 hover:shadow-green-500/5",
      icon: "text-green-500 bg-green-50",
      text: "text-green-500",
      bg: "hover:bg-green-50/10",
    },
    orange: {
      border: "before:bg-orange-500 hover:shadow-orange-500/5",
      icon: "text-orange-500 bg-orange-50",
      text: "text-orange-500",
      bg: "hover:bg-orange-50/10",
    },
  };

  const currentTheme = stylesMap[themeClass] || stylesMap.red;

  return (
    <div className={`relative bg-white border border-gray-100 p-8 rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg shadow-sm overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 ${currentTheme.border} ${currentTheme.bg} group`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 ${currentTheme.icon}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">{description}</p>
      <a href="#" className={`inline-flex items-center gap-2 text-sm font-bold mt-auto ${currentTheme.text}`}>
        <span>{actionText}</span>
        <svg className="transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  );
};

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("services.findDonorsTitle"),
      description: t("services.findDonorsDesc"),
      actionText: t("services.findDonorsBtn"),
      themeClass: "blue",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 12a4 4 0 1 0-8 0" />
          <circle cx="12" cy="10" r="2" />
        </svg>
      )
    },
    {
      title: t("services.requestBloodTitle"),
      description: t("services.requestBloodDesc"),
      actionText: t("services.requestBloodBtn"),
      themeClass: "red",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: t("services.registerHospitalTitle"),
      description: t("services.registerHospitalDesc"),
      actionText: t("services.registerHospitalBtn"),
      themeClass: "green",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )
    },
    {
      title: t("services.donateBloodTitle"),
      description: t("services.donateBloodDesc"),
      actionText: t("services.donateBloodBtn"),
      themeClass: "orange",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-6 flex flex-col items-center w-full">
        {/* Section Header */}
        <div className="text-center max-w-xl mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t("services.title")}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              actionText={service.actionText}
              themeClass={service.themeClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
