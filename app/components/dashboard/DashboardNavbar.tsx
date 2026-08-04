"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

interface DashboardNavbarProps {
  userName: string;
  userRole: string;
  dashboardType: "patient" | "donor" | "hospital" | "blood-bank";
  onRequestClick?: () => void;
}

export default function DashboardNavbar({ userName, userRole, dashboardType, onRequestClick }: DashboardNavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [requestsDropdownOpen, setRequestsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const requestsRef = useRef<HTMLDivElement>(null);

  // Map dashboard types to their custom avatar images
  const getAvatarUrl = () => {
    switch (dashboardType) {
      case "patient":
        return "/michael_avatar.png";
      case "donor":
        return "/sena_avatar.png";
      case "hospital":
      case "blood-bank":
        return "/xavier_avatar.png";
      default:
        return "/vitanova512.png";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (requestsRef.current && !requestsRef.current.contains(event.target as Node)) {
        setRequestsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert("Logging out from VitaNova...");
    router.push("/");
  };

  const getNavItems = () => {
    switch (dashboardType) {
      case "donor":
        return [
          { name: t("Dashboard") || "Dashboard", path: `/${dashboardType}` },
          { name: t("Requests") || "Requests", path: "#requests-section" },
          { name: t("Inventory") || "Inventory", path: "#inventory-section" },
          { name: t("Donors") || "Donors", path: "#partners-section" },
        ];
      case "patient":
        return [
          { name: t("Dashboard") || "Dashboard", path: `/${dashboardType}` },
          { name: t("Requests") || "Requests", path: "#requests-section" },
          { name: t("Inventory") || "Inventory", path: "#inventory-section" },
          { name: t("Donors") || "Donors", path: "#partners-section" },
        ];
      case "hospital":
        return [
          { name: t("Dashboard") || "Dashboard", path: `/${dashboardType}` },
          { name: t("Requests") || "Requests", path: "/hospital/requests" },
          { name: t("Inventory") || "Inventory", path: "/hospital/inventory" },
          { name: t("Donors") || "Donors", path: "/hospital/donors" },
        ];
      case "blood-bank":
        return [
          { name: t("Dashboard") || "Dashboard", path: `/${dashboardType}` },
          { name: t("Requests") || "Requests", path: "#requests-section" },
          { name: t("Inventory") || "Inventory", path: "#inventory-section" },
          { name: t("Donors") || "Donors", path: "#partners-section" },
        ];
      default:
        return [
          { name: t("Dashboard") || "Dashboard", path: `/${dashboardType}` },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="h-[76px] bg-white border-b border-gray-100 px-4 sm:px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 w-full shadow-sm shadow-gray-100/20">
      {/* Brand logo & nav menu links */}
      <div className="flex items-center gap-4 md:gap-10 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl sm:text-2xl cursor-pointer flex-shrink-0">
          <Image
            src="/vitanova512.png"
            alt="VitaNova Logo"
            width={28}
            height={28}
            className="rounded-md object-contain flex-shrink-0"
            priority
          />
          <div>
            <span className="text-primary font-black tracking-tight">Vita</span>
            <span className="text-gray-900 font-black tracking-tight">Nova</span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold h-[76px]">
          {navItems.map((item, idx) => {
            const isRequests = item.name === "Requests" || item.name === "Request";
            if (isRequests) {
              return (
                <div className="relative h-full flex items-center" ref={requestsRef} key={idx}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setRequestsDropdownOpen(!requestsDropdownOpen);
                    }}
                    className={`py-[27px] transition-colors leading-none flex items-center border-b-2 border-transparent text-gray-500 hover:text-gray-900 font-semibold cursor-pointer outline-none`}
                  >
                    <span>{item.name}</span>
                    <svg className={`ml-1.5 transition-transform ${requestsDropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {requestsDropdownOpen && (
                    <div className="absolute left-0 mt-0 top-[70px] w-48 bg-white border border-gray-100 rounded-xl shadow-lg p-2 flex flex-col gap-1 z-[100] animate-in fade-in slide-in-from-top-2 duration-150">
                      <button
                        onClick={() => {
                          setRequestsDropdownOpen(false);
                          if (onRequestClick) {
                            onRequestClick();
                          }
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>New Request</span>
                      </button>
                      <Link
                        href="/hospital/requests"
                        onClick={() => setRequestsDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-secondary">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span>Active Requests</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a 
                key={idx}
                href={item.path} 
                className={`py-[27px] transition-colors leading-none flex items-center border-b-2 ${
                  idx === 0 
                    ? "text-primary border-primary font-bold" 
                    : "text-gray-500 hover:text-gray-900 border-transparent"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>

      {/* Middle: pill Search bar */}
      <div className="hidden lg:block relative w-64 xl:w-80">
        <input
          type="text"
          placeholder={t("Search") || "Search..."}
          className="bg-[#EDF4FC] text-gray-700 placeholder-gray-400 rounded-full px-5 py-2.5 text-xs outline-none w-full transition-all focus:bg-white border border-transparent focus:border-blue-100/50"
        />
        <svg 
          className="absolute right-4 top-[11px] text-gray-400" 
          viewBox="0 0 24 24" 
          width="14" 
          height="14" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Emergency Alert Button */}
        <button 
          onClick={() => alert("Emergency alert broadcasted to nearby blood banks and clinics!")}
          className="bg-primary hover:bg-red-700 text-white font-bold text-xs px-3 sm:px-5 py-2.5 rounded-lg shadow-sm shadow-red-100 transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" className="flex-shrink-0">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span className="hidden sm:inline">{t("Emergency Alert") || "Emergency Alert"}</span>
        </button>

        {/* Notifications Icon */}
        <button 
          onClick={() => alert("No new notifications")}
          className="text-gray-500 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
          aria-label="Notifications"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>



        {/* User Profile Avatar Picture */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 cursor-pointer shadow-sm hover:scale-[1.03] transition-transform focus:outline-none"
            aria-label="User profile menu"
          >
            <Image
              src={getAvatarUrl()}
              alt="User Avatar"
              fill
              className="object-cover"
              sizes="32px"
            />
          </button>

          {/* Floating Dropdown Card */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-xl shadow-lg p-5 flex flex-col gap-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Profile Details header */}
              <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                  <Image
                    src={getAvatarUrl()}
                    alt="User Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-tight">{userName}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{userRole}</span>
                </div>
              </div>

              {/* Language Switcher Section inside the profile card */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Language</span>
                <div className="relative flex items-center border border-gray-100 bg-gray-50/50 pl-3 pr-2 py-2 rounded-lg mt-1 w-full">
                  <svg className="text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="text-xs font-bold text-gray-700 bg-transparent outline-none cursor-pointer flex-grow appearance-none pr-8 bg-no-repeat bg-[right_0px_center] bg-[length:14px] [background-image:url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_fill=%22none%22_viewBox=%220_0_24_24%22_stroke=%22currentColor%22_stroke-width=%222.5%22%3E%3Cpath_stroke-linecap=%22round%22_stroke-linejoin=%22round%22_d=%22M19_9l-7_7-7-7%22/%3E%3C/svg%3E')]"
                    aria-label="Language Selector"
                  >
                    <option value="en">English (EN)</option>
                    <option value="fr">Français (FR)</option>
                    <option value="es">Español (ES)</option>
                    <option value="tw">Twi (TW)</option>
                  </select>
                </div>
              </div>

              {/* Navigation links inside dropdown (especially for mobile) */}
              <div className="flex flex-col gap-2 border-t border-gray-50 pt-3 lg:hidden">
                {navItems.map((item, idx) => {
                  const isRequests = item.name === "Requests" || item.name === "Request";
                  if (isRequests) {
                    return (
                      <div key={idx} className="flex flex-col gap-1.5 pl-1.5 border-l border-gray-100 mt-0.5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.name}</span>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            if (onRequestClick) {
                              onRequestClick();
                            }
                          }}
                          className="w-full text-left py-1 text-xs font-bold text-gray-700 hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>• New Request</span>
                        </button>
                        <Link
                          href="/hospital/requests"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="w-full text-left py-1 text-xs font-bold text-gray-700 hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>• Active Requests</span>
                        </Link>
                      </div>
                    );
                  }
                  return (
                    <a key={idx} href={item.path} className="text-xs font-semibold text-gray-500 hover:text-gray-900 py-1">
                      {item.name}
                    </a>
                  );
                })}
              </div>

              {/* Logout action button */}
              <button 
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-primary hover:text-red-700 font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                <span>{t("Logout") || "Logout"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
