"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// ── Sample data ──────────────────────────────────────────────────────────────
const allRequests = [
  { id: "PT-8892A", bloodType: "O-", urgency: "High",    units: 4, location: "Trauma Ward 1",   status: "Pending" },
  { id: "PT-4421B", bloodType: "A+", urgency: "Medium",  units: 2, location: "Surgery OR-3",    status: "In Transit" },
  { id: "PT-1109C", bloodType: "B-", urgency: "Routine", units: 1, location: "Maternity Ward",   status: "Matched" },
  { id: "PT-7734D", bloodType: "O+", urgency: "High",    units: 3, location: "ICU Bay 4",        status: "Pending" },
  { id: "PT-2210E", bloodType: "AB+",urgency: "Medium",  units: 2, location: "Oncology Wing",    status: "In Transit" },
  { id: "PT-5501F", bloodType: "B+", urgency: "Routine", units: 1, location: "Pediatrics Ward",  status: "Matched" },
  { id: "PT-6623G", bloodType: "A-", urgency: "High",    units: 5, location: "ER Bay 2",         status: "Pending" },
  { id: "PT-3347H", bloodType: "O-", urgency: "Medium",  units: 2, location: "Surgery OR-1",     status: "In Transit" },
  { id: "PT-9981I", bloodType: "AB-",urgency: "Routine", units: 1, location: "Hematology Dept.", status: "Matched" },
  { id: "PT-1158J", bloodType: "B-", urgency: "High",    units: 4, location: "Trauma Ward 2",    status: "Pending" },
  { id: "PT-4490K", bloodType: "A+", urgency: "Medium",  units: 2, location: "Ward 7",           status: "In Transit" },
  { id: "PT-8812L", bloodType: "O+", urgency: "Routine", units: 1, location: "Recovery Room 3",  status: "Matched" },
];

const ROWS_PER_PAGE = 3;

// ── Helpers ──────────────────────────────────────────────────────────────────
function UrgencyBadge({ level }: { level: string }) {
  const map: Record<string, { bg: string; text: string; icon?: React.ReactNode }> = {
    High: {
      bg: "bg-red-50",
      text: "text-red-600",
      icon: (
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3">
          <polygon points="12 2 22 22 2 22" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <circle cx="12" cy="17" r="1" />
        </svg>
      ),
    },
    Medium: {
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    Routine: {
      bg: "bg-green-50",
      text: "text-green-600",
    },
  };
  const style = map[level] || map.Routine;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${style.bg} ${style.text}`}>
      {style.icon}
      {level}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; ring: string; icon: React.ReactNode }> = {
    Pending: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      ring: "ring-orange-100",
      icon: (
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    "In Transit": {
      bg: "bg-blue-50",
      text: "text-blue-600",
      ring: "ring-blue-100",
      icon: (
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      ),
    },
    Matched: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      ring: "ring-emerald-100",
      icon: (
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
  };
  const style = map[status] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ring-1 ${style.bg} ${style.text} ${style.ring}`}>
      {style.icon}
      {status}
    </span>
  );
}

function BloodTypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-xs font-black text-gray-800 ring-1 ring-gray-200">
      {type}
    </span>
  );
}

// ── Page component ───────────────────────────────────────────────────────────
export default function ActiveRequestsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterUrgency, setFilterUrgency] = useState("All");

  // Filtering
  const filtered = useMemo(() => {
    return allRequests.filter((r) => {
      const matchSearch =
        search === "" ||
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.bloodType.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "All" || r.status === filterStatus;
      const matchUrgency = filterUrgency === "All" || r.urgency === filterUrgency;
      return matchSearch && matchStatus && matchUrgency;
    });
  }, [search, filterStatus, filterUrgency]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (safeCurrentPage - 1) * ROWS_PER_PAGE;
  const pageRows = filtered.slice(startIdx, startIdx + ROWS_PER_PAGE);
  const totalUnitsToday = allRequests.reduce((sum, r) => sum + r.units, 0);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 flex flex-col justify-between w-full">
      <main className="container mx-auto px-6 py-10 flex flex-col gap-8 w-full flex-grow">
        {/* ─── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <section className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Active Blood Requests
            </h1>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              XAVIER MEDICAL CENTRE
            </span>
          </section>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Today's Units stat */}
            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-secondary flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase text-gray-400 tracking-widest leading-none">Today&apos;s Units</span>
                <span className="text-xl font-black text-gray-900 leading-tight">{totalUnitsToday}</span>
              </div>
            </div>

            {/* New Request button — dispatches a custom event the layout listens for */}
            <button
              id="new-request-btn"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-blood-request-modal"));
              }}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Request
            </button>
          </div>
        </div>

        {/* ─── Filters / Search ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by patient ID, blood type, or location..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all bg-white"
            />
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Matched">Matched</option>
          </select>

          {/* Urgency filter */}
          <select
            value={filterUrgency}
            onChange={(e) => { setFilterUrgency(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="All">All Urgencies</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Routine">Routine</option>
          </select>
        </div>

        {/* ─── Table ──────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[16%]">Patient ID</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[14%]">Blood Type</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[14%]">Urgency</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[10%]">Units</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[22%]">Location</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[16%]">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-sm text-gray-400 font-medium">
                    No requests match your filters.
                  </td>
                </tr>
              ) : (
                pageRows.map((req, idx) => (
                  <tr
                    key={req.id}
                    className={`transition-colors hover:bg-gray-50/50 ${
                      idx < pageRows.length - 1 ? "border-b border-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-5 text-sm font-bold text-gray-900">{req.id}</td>
                    <td className="px-6 py-5">
                      <BloodTypeBadge type={req.bloodType} />
                    </td>
                    <td className="px-6 py-5">
                      <UrgencyBadge level={req.urgency} />
                    </td>
                    <td className="px-6 py-5 text-lg font-black text-gray-900">{req.units}</td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-600">{req.location}</td>
                    <td className="px-6 py-5">
                      <StatusPill status={req.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination footer */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50/30">
            <span className="text-xs font-semibold text-gray-500">
              Showing {filtered.length === 0 ? 0 : startIdx + 1} to{" "}
              {Math.min(startIdx + ROWS_PER_PAGE, filtered.length)} of {filtered.length} active requests
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Previous page"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    pg === safeCurrentPage
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Next page"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Quick Stats row ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {[
            { label: "Total Active", value: allRequests.length, color: "text-gray-900", bg: "bg-white" },
            { label: "Pending", value: allRequests.filter((r) => r.status === "Pending").length, color: "text-orange-600", bg: "bg-orange-50/50" },
            { label: "In Transit", value: allRequests.filter((r) => r.status === "In Transit").length, color: "text-blue-600", bg: "bg-blue-50/50" },
            { label: "Matched", value: allRequests.filter((r) => r.status === "Matched").length, color: "text-emerald-600", bg: "bg-emerald-50/50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} border border-gray-100 rounded-xl p-5 flex flex-col gap-1 shadow-sm`}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
              <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </main>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-6 px-6 md:px-12 w-full mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-bold text-gray-700">VitaNova</span>
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
