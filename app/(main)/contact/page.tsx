"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "you@example.com",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message submitted! \nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`);
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50/30 min-h-screen">
      <div className="container mx-auto px-6 w-full">
        {/* Title Section */}
        <section className="text-center max-w-xl mx-auto mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {t("contact.title")}
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </section>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Form Card */}
          <section className="lg:col-span-7 bg-white border border-gray-100 p-8 md:p-10 rounded-2xl shadow-sm w-full">
            <div className="flex items-center gap-3.5 mb-8 text-gray-900">
              <svg className="text-primary" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <h2 className="text-2xl font-bold tracking-tight">{t("contact.formTitle")}</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
              {/* Inputs row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900">{t("contact.labelName")}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="John Doe"
                    className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-red-600/5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900">{t("contact.labelEmail")}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="you@example.com"
                    className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-red-600/5"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">{t("contact.labelSubject")}</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none cursor-pointer appearance-none pr-10 bg-no-repeat bg-[right_16px_center] bg-[length:14px] [background-image:url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_fill=%22none%22_viewBox=%220_0_24_24%22_stroke=%22currentColor%22_stroke-width=%222.5%22%3E%3Cpath_stroke-linecap=%22round%22_stroke-linejoin=%22round%22_d=%22M19_9l-7_7-7-7%22/%3E%3C/svg%3E')] focus:border-primary focus:bg-white"
                >
                  <option value="">{t("contact.placeholderSubject")}</option>
                  <option value="donor">Donor Registration Questions</option>
                  <option value="hospital">Hospital Onboarding / API Help</option>
                  <option value="emergency">Emergency Logistics Assistance</option>
                  <option value="complaint">Report an Issue</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">{t("contact.labelMessage")}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder={t("contact.placeholderMessage")}
                  className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none min-h-[150px] resize-y transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-red-600/5"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-primary hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-lg w-max transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-red-100"
              >
                {t("contact.btnSubmit")}
              </button>
            </form>
          </section>

          {/* Right Column: Cards info */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Blue Card */}
            <section className="bg-secondary text-white p-8 rounded-2xl shadow-md flex flex-col gap-6">
              <h3 className="text-xl font-bold tracking-tight">{t("contact.cardGetInTouch")}</h3>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold opacity-75 uppercase tracking-wider">{t("contact.labelPhone")}</span>
                    <span className="text-base font-bold">+233 1234567</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold opacity-75 uppercase tracking-wider">Email</span>
                    <span className="text-base font-bold">support@lifestream.com</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold opacity-75 uppercase tracking-wider">{t("contact.labelOffice")}</span>
                    <span className="text-base font-bold leading-normal">123 Health Plaza, Medical District, Accra</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Links Card */}
            <section className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5 tracking-tight">{t("contact.cardQuickLinks")}</h3>
              <ul className="flex flex-col gap-4 list-none">
                {["Frequently Asked Questions", "Help Center", "System Status", "Community Forum"].map((link, idx) => (
                  <li key={idx} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                    <a href="#" className="flex justify-between items-center group/item text-sm font-semibold text-gray-500 hover:text-primary transition-colors duration-200">
                      <span>{t(`contact.link${idx}` as any) || link}</span>
                      <svg className="text-gray-300 transition-all duration-200 group-hover/item:text-primary group-hover/item:translate-x-0.5" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Backdrop card */}
            <section className="relative h-[180px] rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
              <Image
                src="/hospital_hallway.png"
                alt="VitaNova Clinic Corridor"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                <span className="text-white text-base font-bold">
                  {t("contact.cardVisualText")}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
