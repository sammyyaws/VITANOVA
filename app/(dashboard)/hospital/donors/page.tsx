"use client";

import React, { useState } from "react";
import Link from "next/link";
import NewDonationModal, { DonationFormValues } from "@/app/components/dashboard/NewDonationModal";

export default function HospitalDonorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(342);
  const [totalVolumeLiters, setTotalVolumeLiters] = useState(171);

  const [logs, setLogs] = useState([
    {
      id: 1,
      initials: "JD",
      name: "John Doe",
      bloodType: "O+",
      volume: "450",
      facility: "Xavier Med Centre",
      datetime: "Oct 24, 09:15 AM",
      status: "Processed",
    },
    {
      id: 2,
      initials: "SJ",
      name: "Sarah Jenkins",
      bloodType: "O-",
      volume: "500",
      facility: "Mobile Unit Alpha",
      datetime: "Oct 24, 08:30 AM",
      status: "Processed",
    },
    {
      id: 3,
      initials: "MR",
      name: "Michael Rodriguez",
      bloodType: "A+",
      volume: "450",
      facility: "Xavier Med Centre",
      datetime: "Oct 23, 14:20 PM",
      status: "Testing",
    },
  ]);

  const handleExportLogs = () => {
    alert("Exporting Recent Donation Logs...");
  };

  const handleDonationSubmit = (values: DonationFormValues) => {
    // Generate initials
    const parts = values.donor_name.trim().split(" ");
    const initials =
      parts.length > 1
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();

    // Format datetime string nicely
    const dateObj = new Date(values.datetime);
    const dateFormatted = isNaN(dateObj.getTime())
      ? values.datetime
      : dateObj.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

    const newLog = {
      id: Date.now(),
      initials,
      name: values.donor_name,
      bloodType: values.blood_type,
      volume: String(values.volume_ml),
      facility: values.facility,
      datetime: dateFormatted,
      status: values.status,
    };

    setLogs([newLog, ...logs]);
    setTotalCount((prev) => prev + 1);
    setTotalVolumeLiters((prev) => prev + Math.round(Number(values.volume_ml) / 1000 * 10) / 10);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 flex flex-col justify-between w-full">
      <main className="container mx-auto px-6 py-10 flex flex-col gap-8 w-full flex-grow">
        {/* ─── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <section className="flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              XAVIER MEDICAL CENTRE
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Donations Log
            </h1>
          </section>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#0066CC] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>New Donation</span>
          </button>
        </div>

        {/* ─── Summary Cards ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1: Monthly donations */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-xs relative">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-gray-500">Donations this month</span>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0066CC] flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-4xl font-black text-gray-900">{totalCount}</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                +12%
              </span>
            </div>
          </div>

          {/* Card 2: Total Volume */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-gray-500">Total Volume Collected</span>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0066CC] flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-4xl font-black text-gray-900">{totalVolumeLiters}</span>
              <span className="text-sm font-extrabold text-gray-500">Liters</span>
            </div>
          </div>

          {/* Card 3: Critical Shortage Card */}
          <div className="bg-[#FFF5F5] border border-red-100 rounded-2xl p-6 flex flex-col justify-center shadow-xs relative overflow-hidden">
            {/* Watermark alert triangle */}
            <svg
              className="absolute right-[-10px] bottom-[-10px] text-red-100/60 pointer-events-none"
              viewBox="0 0 24 24"
              width="120"
              height="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polygon points="12 2 22 22 2 22" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <circle cx="12" cy="17" r="1" />
            </svg>

            <div className="relative z-10 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 22 22 2 22" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <circle cx="12" cy="17" r="1" />
                </svg>
                <span>Critical Shortage</span>
              </div>
              <p className="text-xs font-semibold text-gray-700 leading-relaxed max-w-[280px]">
                O- Negative supplies are below safe operational thresholds.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Recent Logs Table ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden w-full">
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Logs</h3>
            <button
              onClick={handleExportLogs}
              className="flex items-center gap-1.5 text-xs font-bold text-[#0066CC] hover:underline cursor-pointer"
            >
              <span>Export</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[24%]">
                  DONOR NAME
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[14%]">
                  BLOOD TYPE
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[14%]">
                  VOLUME (ML)
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[20%]">
                  FACILITY
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[16%]">
                  DATE & TIME
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[12%]">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`transition-colors hover:bg-gray-50/50 ${
                    idx < logs.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-400 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {row.initials}
                      </div>
                      <span className="text-xs font-bold text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black border ${
                        row.bloodType === "O-"
                          ? "bg-red-50 text-red-600 border-red-200"
                          : row.bloodType === "A+"
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "bg-sky-50 text-sky-700 border-sky-200"
                      }`}
                    >
                      {row.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-700">{row.volume}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-700">{row.facility}</td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600">{row.datetime}</td>
                  <td className="px-6 py-4">
                    {row.status === "Processed" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Processed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M10 2v7.5L5 18a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-8.5V2" />
                          <line x1="8" y1="2" x2="16" y2="2" />
                        </svg>
                        Testing
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50/20">
            <span className="text-xs font-semibold text-gray-500">
              Showing 1 to {logs.length} of {totalCount} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert("Previous page")}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Prev
              </button>
              <button
                onClick={() => alert("Next page")}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* New Donation Modal */}
      <NewDonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDonationSubmit}
      />

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
