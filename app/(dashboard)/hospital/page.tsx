"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import CardWrapper from "../../components/dashboard/CardWrapper";
import StatCard from "../../components/dashboard/StatCard";

export default function HospitalDashboard() {
  const { t } = useLanguage();

  const inventory = [
    { type: "A+", units: 42, label: "STABLE", color: "green" },
    { type: "A-", units: 8, label: "LOW", color: "blue" },
    { type: "B+", units: 28, label: "STABLE", color: "green" },
    { type: "B-", units: 3, label: "CRITICAL", color: "red" },
    { type: "O+", units: 56, label: "STABLE", color: "green" },
    { type: "O-", units: 5, label: "CRITICAL", color: "red" },
    { type: "AB+", units: 14, label: "STABLE", color: "green" },
    { type: "AB-", units: 7, label: "STABLE", color: "green" },
  ];

  const activeRequests = [
    {
      pt: "Pt. #4821",
      detail: "O- • 2 units",
      meta: "ICU • DR. ARIS",
      time: "Requested 12 min ago",
      status: "IN TRANSIT",
      priority: "HIGH",
    },
    {
      pt: "Pt. #4790",
      detail: "B- • 3 units",
      meta: "SURGERY • DR. MENDEZ",
      time: "Requested 34 min ago",
      status: "PENDING",
      priority: "HIGH",
    },
    {
      pt: "Pt. #4755",
      detail: "A+ • 1 unit",
      meta: "WARD 3 • DR. LI",
      time: "Requested 2 h ago",
      status: "READY",
      priority: "MED",
    },
    {
      pt: "Pt. #4712",
      detail: "O+ • 2 units",
      meta: "EXTERNAL • MOBILE UNIT",
      time: "Requested 5 h ago",
      status: "QUEUED",
      priority: "LOW",
    },
  ];

  const transfusions = [
    {
      time: "10:42 AM",
      pt: "Pt. #4801 • O+ • 1 unit",
      desc: "Successful delivery to Hematology Dept.",
    },
    {
      time: "09:15 AM",
      pt: "Pt. #4788 • A+ • 2 units",
      desc: "ER Emergency Response protocol complete.",
    },
    {
      time: "07:50 AM",
      pt: "Pt. #4770 • B+ • 1 unit",
      desc: "Routine transfusion completed for Oncology.",
    },
  ];

  const partners = [
    { name: "Hosea Blood Bank", active: true, label: "Online" },
    { name: "Robertson Blood Services", active: true, label: "Online" },
    { name: "KNUST Red Cross", active: true, label: "Online" },
    { name: "Parker State Blood Bank", active: false, label: "Offline" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 flex flex-col justify-between w-full">
      {/* Dashboard Navbar */}
      <DashboardNavbar userName="Dr. Xavier" userRole="Hospital Coordinator" dashboardType="hospital" />

      {/* Main Container */}
      <main className="container mx-auto px-6 py-10 flex flex-col gap-8 w-full flex-grow">
        {/* Title area */}
        <section className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Hospital Dashboard
          </h1>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">XAVIER MEDICAL CENTRE</span>
        </section>

        {/* Inventory list */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Inventory by blood type</h2>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Last updated: 2 mins ago</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {inventory.map((item, idx) => (
              <CardWrapper 
                key={idx} 
                className={`flex flex-col justify-between h-28 border border-gray-100 ${
                  item.color === "red" ? "bg-red-50/20 border-red-100" : ""
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="text-lg font-bold text-gray-900">{item.type}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider ${
                    item.color === "red" 
                      ? "bg-red-50 text-primary" 
                      : item.color === "blue" 
                        ? "bg-blue-50 text-secondary" 
                        : "bg-green-50 text-green-600"
                  }`}>
                    {item.label}
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-3xl font-black text-gray-900 leading-none">{item.units}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Units</span>
                </div>
              </CardWrapper>
            ))}
          </div>
        </div>

        {/* Critical Alert banner */}
        <div className="bg-primary text-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md shadow-red-100 w-full">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
                <polygon points="12 2 22 22 2 22" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <circle cx="12" cy="17" r="1" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Critical Alert</span>
              <p className="text-sm font-semibold leading-normal mt-0.5">
                Critical alert: 2 blood types below safety threshold: B- (3 units), O- (5 units) — request restock immediately via the central bank.
              </p>
            </div>
          </div>
          <button 
            onClick={() => alert("Restock request submitted to central blood vault!")}
            className="bg-white hover:bg-gray-100 text-primary font-bold text-xs px-5 py-3 rounded-lg flex-shrink-0 transition-colors shadow-sm cursor-pointer"
          >
            Resolve Now
          </button>
        </div>

        {/* Grid split 8-4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Active Requests and Transfusions */}
          <section className="lg:col-span-8 flex flex-col gap-8 w-full">
            {/* Active Requests */}
            <CardWrapper className="flex flex-col gap-5 w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Active requests</h3>
                <a href="#" className="text-xs font-bold text-secondary hover:underline flex items-center gap-1">
                  View all
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>

              <div className="flex flex-col gap-4 w-full">
                {activeRequests.map((req, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-50 rounded-xl gap-4 w-full">
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold tracking-wider ${
                        req.priority === "HIGH" ? "bg-red-50 text-primary" : req.priority === "MED" ? "bg-blue-50 text-secondary" : "bg-gray-100 text-gray-500"
                      }`}>
                        {req.priority}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">
                          {req.pt} <span className="text-gray-400 font-semibold">— {req.detail}</span>
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">{req.meta}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 self-end sm:self-center">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        req.status === "IN TRANSIT" ? "text-primary animate-pulse" : req.status === "READY" ? "text-green-600" : "text-gray-400"
                      }`}>
                        {req.status}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold">{req.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>

            {/* Recent Transfusions */}
            <CardWrapper className="flex flex-col gap-6 w-full">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent transfusions</h3>
              <div className="flex flex-col gap-6 w-full relative pl-6 border-l-2 border-slate-100 ml-3">
                {transfusions.map((item, idx) => (
                  <div key={idx} className="relative w-full">
                    {/* Circle icon on line */}
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-secondary border-2 border-white" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-extrabold text-secondary uppercase tracking-widest">{item.time}</span>
                      <h4 className="text-sm font-bold text-gray-900 mt-1 leading-snug">{item.pt}</h4>
                      <p className="text-xs text-gray-400 leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>
          </section>

          {/* Right Column: Partners & Monthly stats */}
          <section className="lg:col-span-4 flex flex-col gap-8 w-full">
            {/* Blood Bank Partners */}
            <CardWrapper className="flex flex-col gap-5 w-full">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Blood bank partners</h3>
              <div className="flex flex-col gap-3 w-full">
                {partners.map((partner, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 border border-gray-50 rounded-xl w-full">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${partner.active ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className="text-xs font-bold text-gray-900 leading-none">{partner.name}</span>
                    </div>
                    {partner.active ? (
                      <button className="text-secondary p-1 rounded-lg hover:bg-blue-50" aria-label="Call Partner">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </button>
                    ) : (
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{partner.label}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Map Placeholder Graphic */}
              <div className="relative h-44 rounded-xl border border-gray-100 overflow-hidden bg-slate-50 flex items-center justify-center group cursor-pointer">
                {/* SVG representing a futuristic map coordinate grid */}
                <svg className="absolute inset-0 w-full h-full text-slate-200" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M0,30 Q25,60 50,30 T100,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="30" cy="40" r="1.5" className="text-primary fill-current animate-ping" />
                  <circle cx="30" cy="40" r="1.5" className="text-primary fill-current" />
                  <circle cx="70" cy="35" r="1.5" className="text-secondary fill-current" />
                  <circle cx="50" cy="65" r="1.5" className="text-green-500 fill-current" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Central Dispatch View</span>
                </div>
              </div>
            </CardWrapper>

            {/* This Month Stats */}
            <div className="flex flex-col gap-4 w-full">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">This month</h3>
              <div className="grid grid-cols-1 gap-4 w-full h-full">
                <StatCard title="Requests" value="187" borderColor="red" />
                <StatCard title="Transfusions" value="162" borderColor="blue" />
                <StatCard title="Donors Served" value="341" borderColor="green" />
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Quick actions row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* 1. Request Blood */}
          <button 
            onClick={() => alert("Opening blood requisition wizard...")}
            className="flex flex-col items-center justify-center p-6 bg-primary hover:bg-red-700 text-white rounded-xl gap-2.5 transition-all hover:-translate-y-0.5 shadow-md shadow-red-100 cursor-pointer text-center w-full"
          >
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight">Request Blood</span>
          </button>

          {/* 2. Register Patient */}
          <button 
            onClick={() => alert("Opening patient registry form...")}
            className="flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl gap-2.5 transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer text-center w-full"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 text-secondary flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 tracking-tight">Register Patient</span>
          </button>

          {/* 3. View Inventory */}
          <button 
            onClick={() => alert("Redirecting to inventory list views...")}
            className="flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl gap-2.5 transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer text-center w-full"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 text-secondary flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 tracking-tight">View Inventory</span>
          </button>

          {/* 4. Contact Donors */}
          <button 
            onClick={() => alert("Opening donor communication dashboard...")}
            className="flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl gap-2.5 transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer text-center w-full"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 text-secondary flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 tracking-tight">Contact Donors</span>
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-6 md:px-12 w-full mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500">
          <span>
            VitaNova | Healthcare Support System © 2024 VitaNova Healthcare Support System. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
            <a href="#" className="hover:text-primary transition-colors text-primary">Emergency Protocol</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
