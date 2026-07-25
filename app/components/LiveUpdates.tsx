"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

interface RequestItem {
  id: number;
  bloodType: string;
  location: string;
  urgency: "critical" | "high" | "normal";
  timeAgoKey: string; // dictionary key prefix, e.g. "live.justNow" or custom
  timeValue?: number; // e.g. 4
  neededForKey: string; // dictionary key, e.g. "live.surgery"
  fulfilled: boolean;
}

export default function LiveUpdates() {
  const { t } = useLanguage();
  const [requests, setRequests] = useState<RequestItem[]>([
    {
      id: 1,
      bloodType: "O-",
      location: "St. Jude Hospital, Chicago",
      urgency: "critical",
      timeAgoKey: "live.justNow",
      neededForKey: "live.surgery",
      fulfilled: false,
    },
    {
      id: 2,
      bloodType: "A+",
      location: "Metropolitan Medical Center, Dallas",
      urgency: "high",
      timeAgoKey: "4 mins ago", // fallback or translated below
      neededForKey: "live.thalassemia",
      fulfilled: false,
    },
    {
      id: 3,
      bloodType: "B-",
      location: "Mercy Health, Miami",
      urgency: "normal",
      timeAgoKey: "12 mins ago",
      neededForKey: "live.operation",
      fulfilled: true,
    },
    {
      id: 4,
      bloodType: "AB+",
      location: "Grace Medical, Seattle",
      urgency: "normal",
      timeAgoKey: "25 mins ago",
      neededForKey: "live.plasma",
      fulfilled: true,
    },
  ]);

  // Translate timeline dynamically
  const formatTimeAgo = (timeKey: string) => {
    if (timeKey === "live.justNow") return t("live.justNow");
    
    // Parse "X mins ago"
    const matchMins = timeKey.match(/^(\d+)\s+mins?\s+ago$/);
    if (matchMins) {
      return `${matchMins[1]} ${t("live.minsAgo")}`;
    }

    return timeKey;
  };

  useEffect(() => {
    const locations = [
      "St. John Hospital, Boston",
      "City General, Austin",
      "Westside Memorial, Los Angeles",
      "Valley Medical, Phoenix",
      "Riverside Hospital, Atlanta",
    ];
    const bloodTypes = ["O-", "O+", "A-", "A+", "B+", "AB-"];
    const urgencies: ("critical" | "high" | "normal")[] = ["critical", "high", "normal"];
    const needsKeys = ["live.surgery", "live.thalassemia", "live.operation", "live.plasma"];

    const interval = setInterval(() => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomBlood = bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
      const randomUrgency = urgencies[Math.floor(Math.random() * urgencies.length)];
      const randomNeedKey = needsKeys[Math.floor(Math.random() * needsKeys.length)];

      const newRequest: RequestItem = {
        id: Date.now(),
        bloodType: randomBlood,
        location: randomLoc,
        urgency: randomUrgency,
        timeAgoKey: "live.justNow",
        neededForKey: randomNeedKey,
        fulfilled: false,
      };

      setRequests((prev) => {
        const updated = prev.map((item, idx) => {
          if (idx === 0) return { ...item, timeAgoKey: "2 mins ago" };
          if (idx === 1) return { ...item, timeAgoKey: "8 mins ago" };
          if (idx === 2) return { ...item, timeAgoKey: "18 mins ago" };
          return { ...item, timeAgoKey: "35 mins ago" };
        });
        return [newRequest, ...updated.slice(0, 3)];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Map urgencies to Tailwind classes
  const urgencyTheme: Record<string, { bg: string; text: string; dot: string; pendingBg: string }> = {
    critical: {
      bg: "bg-red-50/80",
      text: "text-red-600",
      dot: "bg-red-600",
      pendingBg: "bg-red-50 text-red-600 border-red-100",
    },
    high: {
      bg: "bg-orange-50/80",
      text: "text-orange-600",
      dot: "bg-orange-600",
      pendingBg: "bg-orange-50 text-orange-600 border-orange-100",
    },
    normal: {
      bg: "bg-green-50/80",
      text: "text-green-600",
      dot: "bg-green-600",
      pendingBg: "bg-green-50 text-green-600 border-green-100",
    },
  };

  return (
    <section className="py-24 bg-gray-50/40 border-t border-b border-gray-100" id="live-coordination">
      <div className="container mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          {/* Text Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-red-50 border border-red-100/70 px-4 py-2 rounded-full w-max mb-6 tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t("live.badge")}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
              {t("live.title")}
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-9 max-w-md">
              {t("live.subtitle")}
            </p>
            <div className="flex gap-4 w-full">
              <div className="bg-white border border-gray-100 p-5 rounded-2xl flex-1 shadow-sm flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">1.2 min</span>
                <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">{t("live.statMatch")}</span>
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-2xl flex-1 shadow-sm flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">98.4%</span>
                <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">{t("live.statFulfillment")}</span>
              </div>
            </div>
          </div>

          {/* Live Request list container */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden w-full">
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{t("live.headerTitle")}</h3>
              <span className="text-xs font-bold text-primary bg-red-50 border border-red-100/50 px-3 py-1 rounded-full">
                {t("live.headerBadge")}
              </span>
            </div>
            <div className="flex flex-col p-3 gap-2 w-full">
              {requests.map((item) => {
                const theme = urgencyTheme[item.urgency] || urgencyTheme.normal;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-5 p-4 rounded-2xl transition-all duration-200 hover:bg-gray-50/50 ${
                      item.fulfilled ? "opacity-60" : ""
                    }`}
                  >
                    {/* Blood Badge */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-extrabold flex-shrink-0 ${theme.bg} ${theme.text}`}
                    >
                      {item.bloodType}
                    </div>
                    {/* Details */}
                    <div className="flex flex-col gap-1 flex-grow">
                      <div className="flex justify-between items-center w-full gap-2">
                        <span className="text-sm md:text-base font-bold text-gray-900 tracking-tight truncate max-w-[180px] sm:max-w-none">
                          {item.location}
                        </span>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formatTimeAgo(item.timeAgoKey)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-full gap-2">
                        <span className="text-xs md:text-sm text-gray-500 font-medium truncate max-w-[150px] sm:max-w-none">
                          {t(item.neededForKey)}
                        </span>
                        {item.fulfilled ? (
                          <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-50 border border-green-100 px-2.5 py-0.5 rounded-full">
                            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {t("live.matched")}
                          </span>
                        ) : (
                          <span className={`text-[10px] md:text-xs font-bold px-2.5 py-0.5 border rounded-full ${theme.pendingBg}`}>
                            {t("live.pending")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
