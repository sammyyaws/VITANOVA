"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function InventoryDetailPage() {
  const [unitsList, setUnitsList] = useState([
    {
      id: "#VN-88342",
      bloodType: "A+",
      collectionDate: "Oct 12, 2023",
      expiryDate: "Nov 23, 2023",
      isExpiringSoon: false,
      status: "Available",
    },
    {
      id: "#VN-88345",
      bloodType: "B-",
      collectionDate: "Oct 10, 2023",
      expiryDate: "Oct 28, 2023",
      isExpiringSoon: true,
      status: "Expiring Soon",
    },
    {
      id: "#VN-88348",
      bloodType: "O+",
      collectionDate: "Oct 15, 2023",
      expiryDate: "Nov 26, 2023",
      isExpiringSoon: false,
      status: "Reserved",
    },
    {
      id: "#VN-88350",
      bloodType: "O-",
      collectionDate: "Oct 08, 2023",
      expiryDate: "Oct 30, 2023",
      isExpiringSoon: true,
      status: "Expiring Soon",
    },
    {
      id: "#VN-88354",
      bloodType: "AB+",
      collectionDate: "Oct 18, 2023",
      expiryDate: "Dec 01, 2023",
      isExpiringSoon: false,
      status: "Available",
    },
  ]);

  const bloodTypeSummaries = [
    {
      type: "A+",
      status: "STABLE",
      statusColor: "green",
      units: 42,
      expiring7d: "2 units",
      temp: "4°C",
      borderClass: "border-green-600/40 bg-white",
    },
    {
      type: "A-",
      status: "LOW",
      statusColor: "blue",
      units: 8,
      expiring7d: "0 units",
      temp: "4°C",
      borderClass: "border-blue-400 bg-white",
    },
    {
      type: "B+",
      status: "STABLE",
      statusColor: "green",
      units: 28,
      expiring7d: "5 units",
      temp: "4°C",
      borderClass: "border-green-600/40 bg-white",
    },
    {
      type: "B-",
      status: "CRITICAL",
      statusColor: "red",
      units: 3,
      expiring7d: "1 unit",
      temp: "4°C",
      borderClass: "border-red-400 bg-white",
    },
    {
      type: "O+",
      status: "STABLE",
      statusColor: "green",
      units: 56,
      expiring7d: "4 units",
      temp: "4°C",
      borderClass: "border-green-600/40 bg-white",
    },
    {
      type: "O-",
      status: "CRITICAL",
      statusColor: "red",
      units: 5,
      expiring7d: "2 units",
      temp: "4°C",
      borderClass: "border-red-400 bg-white",
    },
    {
      type: "AB+",
      status: "STABLE",
      statusColor: "green",
      units: 14,
      expiring7d: "1 unit",
      temp: "4°C",
      borderClass: "border-green-600/40 bg-white",
    },
    {
      type: "AB-",
      status: "STABLE",
      statusColor: "green",
      units: 7,
      expiring7d: "0 units",
      temp: "4°C",
      borderClass: "border-green-600/40 bg-white",
    },
  ];

  const handleResolveAlert = () => {
    window.dispatchEvent(new CustomEvent("open-blood-request-modal"));
  };

  const handleReceiveUnits = () => {
    alert("Opening Receive Blood Units intake form...");
  };

  const handleExportReport = () => {
    alert("Exporting Inventory Report (PDF/CSV)...");
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 flex flex-col justify-between w-full">
      <main className="container mx-auto px-6 py-10 flex flex-col gap-8 w-full flex-grow">
        {/* ─── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <section className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Inventory Detail
            </h1>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              XAVIER MEDICAL CENTRE
            </span>
          </section>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportReport}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export Report</span>
            </button>

            <button
              onClick={handleReceiveUnits}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0066CC] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Receive Units</span>
            </button>
          </div>
        </div>

        {/* ─── Critical Alert Banner ───────────────────────────────────── */}
        <div className="bg-[#DC2626] text-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm w-full">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 22 22 2 22" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <circle cx="12" cy="17" r="1" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90">
                CRITICAL ALERT
              </span>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">
                2 blood types below safety threshold: B- (3 units), O- (5 units) — request restock immediately via network.
              </p>
            </div>
          </div>
          <button
            onClick={handleResolveAlert}
            className="bg-white hover:bg-gray-100 text-[#DC2626] font-bold text-xs px-5 py-2.5 rounded-lg flex-shrink-0 transition-colors shadow-xs cursor-pointer self-end sm:self-center"
          >
            Resolve Now
          </button>
        </div>

        {/* ─── Detailed Status by Blood Type ───────────────────────────── */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Detailed Status by Blood Type
            </h2>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              LAST UPDATED: 2 MINS AGO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {bloodTypeSummaries.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border-2 flex flex-col justify-between shadow-xs transition-all hover:shadow-md ${item.borderClass}`}
              >
                <div>
                  <div className="flex justify-between items-start w-full">
                    <span className="text-2xl font-black text-gray-900">{item.type}</span>
                    <span
                      className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider ${
                        item.statusColor === "red"
                          ? "bg-red-600 text-white"
                          : item.statusColor === "blue"
                          ? "bg-blue-500 text-white"
                          : "bg-emerald-700 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex flex-col mt-3">
                    <span
                      className={`text-4xl font-black leading-none ${
                        item.statusColor === "red" ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {item.units}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">
                      AVAILABLE UNITS
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex flex-col gap-1 text-xs font-semibold">
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Expiring (7d):</span>
                    <span className={`font-bold ${item.statusColor === "red" ? "text-red-600" : "text-gray-900"}`}>
                      {item.expiring7d}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Storage Temp:</span>
                    <span className="font-bold text-gray-900">{item.temp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Specific Unit Tracking ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden w-full">
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Specific Unit Tracking</h3>
            <button
              onClick={() => alert("Filter units list...")}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Filter"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[18%]">
                  Unit ID
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[14%]">
                  Blood Type
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[20%]">
                  Collection Date
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[20%]">
                  Expiry Date
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[16%]">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[12%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {unitsList.map((unit, idx) => (
                <tr
                  key={unit.id}
                  className={`transition-colors hover:bg-gray-50/50 ${
                    idx < unitsList.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-xs font-bold text-gray-900">{unit.id}</td>
                  <td className="px-6 py-4 text-xs font-black text-gray-900">{unit.bloodType}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600">{unit.collectionDate}</td>
                  <td className={`px-6 py-4 text-xs font-bold ${unit.isExpiringSoon ? "text-red-600" : "text-gray-900"}`}>
                    {unit.expiryDate}
                  </td>
                  <td className="px-6 py-4">
                    {unit.status === "Available" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        Available
                      </span>
                    ) : unit.status === "Expiring Soon" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                        Expiring Soon
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        Reserved
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {unit.status === "Reserved" ? (
                      <button
                        onClick={() => alert(`Viewing details for ${unit.id}`)}
                        className="text-xs font-bold text-gray-700 hover:text-gray-900 hover:underline cursor-pointer"
                      >
                        Details
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Allocating unit ${unit.id}`)}
                        className="text-xs font-bold text-[#0066CC] hover:underline cursor-pointer"
                      >
                        Allocate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 text-center border-t border-gray-100 bg-gray-50/20">
            <button
              onClick={() => alert("Loading all unit records...")}
              className="text-xs font-bold text-[#0066CC] hover:underline cursor-pointer"
            >
              View All Units
            </button>
          </div>
        </div>
      </main>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-6 px-6 md:px-12 w-full mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">VitaNova</span>
          </div>
          <span>© 2024 VitaNova Healthcare Coordination. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
