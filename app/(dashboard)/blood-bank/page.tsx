"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CardWrapper from "../../components/dashboard/CardWrapper";
import StatCard from "../../components/dashboard/StatCard";
import ProgressBar from "../../components/dashboard/ProgressBar";
import BloodTypeCard from "../../components/dashboard/BloodTypeCard";
import NotificationItem from "../../components/dashboard/NotificationItem";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import ProcessRequestModal from "../../components/dashboard/ProcessRequestModal";

export default function BloodBankDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventory, setInventory] = useState([
    { type: "A+", units: 124, status: "12 expire < 7 days", low: false },
    { type: "A-", units: 38, status: "4 expire < 7 days", low: false },
    { type: "B+", units: 76, status: "6 expire < 7 days", low: false },
    { type: "B-", units: 19, status: "LOW STOCK", low: true },
    { type: "O+", units: 142, status: "8 expire < 7 days", low: false },
    { type: "O-", units: 22, status: "LOW STOCK", low: true },
    { type: "AB+", units: 44, status: "2 expire < 7 days", low: false },
    { type: "AB-", units: 18, status: "1 expires < 7 days", low: false },
  ]);

  const [requests, setRequests] = useState([
    { id: "4821", title: "NAMS medical center", subtitle: "O- • 2 units", label: "HIGH", rawType: "O-", rawQty: 2, status: "PENDING" },
    { id: "4790", title: "Xavier Medical Center", subtitle: "B- • 3 units", label: "HIGH", rawType: "B-", rawQty: 3, status: "PENDING" },
    { id: "4755", title: "Adobzy Clinic", subtitle: "A+ • 1 unit", label: "MED", rawType: "A+", rawQty: 1, status: "PENDING" },
    { id: "4712", title: "Sammy Hospital", subtitle: "AB+ • 1 unit", label: "LOW", rawType: "AB+", rawQty: 1, status: "PENDING" },
  ]);

  const handleProcessSubmit = (values: {
    request_id: string;
    blood_bag_barcode: string;
    courier_name: string;
    estimated_time: string;
  }) => {
    const targetReq = requests.find((r) => r.id === values.request_id);
    if (!targetReq) return;

    // Update request state
    setRequests(
      requests.map((r) =>
        r.id === values.request_id
          ? { ...r, status: "APPROVED", label: "APPROVED", subtitle: `${r.subtitle} • Dispatched via ${values.courier_name}` }
          : r
      )
    );

    // Deduct blood units from matching inventory card
    setInventory(
      inventory.map((inv) => {
        if (inv.type === targetReq.rawType) {
          const nextUnits = Math.max(0, inv.units - targetReq.rawQty);
          return {
            ...inv,
            units: nextUnits,
            status: nextUnits < 20 ? "LOW STOCK" : inv.status,
            low: nextUnits < 20,
          };
        }
        return inv;
      })
    );

    setIsModalOpen(false);
  };

  const pendingRequestsForModal = requests
    .filter((r) => r.status === "PENDING")
    .map((r) => ({
      id: r.id,
      detail: r.subtitle,
      origin: r.title,
    }));

  const incomingDonations = [
    { name: "Donor L. Yamal", detail: "O+", time: "Today - 11:00 AM" },
    { name: "Donor D. Ayew", detail: "A-", time: "Today - 2:30 PM" },
    { name: "Donor J. Bellingham", detail: "B-", time: "Tomorrow - 9:15 AM" },
  ];

  const collectionDrives = [
    {
      title: "Presec-Legon",
      date: "JULY 18, 2024",
      time: "09:00 - 16:00",
      progress: 85,
      subtext: "Target: 120 units (85% filled)",
      color: "blue" as const,
    },
    {
      title: "University Campus",
      date: "AUGUST 22, 2024",
      time: "10:00 - 15:00",
      progress: 45,
      subtext: "Target: 80 units (45% filled)",
      color: "green" as const,
    },
    {
      title: "Tech Park HQ",
      date: "NOV 02, 2024",
      time: "08:30 - 14:00",
      progress: 10,
      subtext: "Target: 90 units (Recruiting...)",
      color: "red" as const,
    },
    {
      title: "AmaNana City Hall",
      date: "NOV 15, 2024",
      time: "09:00 - 17:00",
      progress: 5,
      subtext: "Target: 150 units (Planning)",
      color: "red" as const,
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 flex flex-col justify-between w-full">
      <DashboardNavbar 
        userName="Ayebea Blood Bank" 
        userRole="Blood Bank Admin" 
        dashboardType="blood-bank" 
        onRequestClick={() => setIsModalOpen(true)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10 flex flex-col gap-8 w-full flex-grow">
        {/* Title area */}
        <section className="flex flex-col gap-1.5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Blood Bank Dashboard
          </h1>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
            <span className="text-primary">Ayebea Blood Bank</span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">BB-0142</span>
          </div>
        </section>

        {/* Outer Layout Grid: 8 columns Left, 4 columns Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Side: Inventory, Alerts, Expiry, Drives */}
          <section className="lg:col-span-8 flex flex-col gap-8 w-full">
            {/* Inventory Section */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Inventory By Blood Type</h2>
                <a href="#" className="text-xs font-bold text-secondary hover:underline flex items-center gap-1">
                  View Detailed Report
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              {/* 8-card grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                {inventory.map((item, index) => (
                  <BloodTypeCard
                    key={index}
                    bloodType={item.type}
                    units={item.units}
                    statusText={item.status}
                    isLowStock={item.low}
                  />
                ))}
              </div>
            </div>

            {/* Critical Alert Banner */}
            <div className="bg-primary text-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md shadow-red-100 w-full relative overflow-hidden">
              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
                    <polygon points="12 2 22 22 2 22" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">Critical Alert</span>
                  <p className="text-sm font-semibold leading-normal mt-0.5">
                    2 blood types below safety threshold: B- (&lt; 19 units), O- (&lt; 22 units) — request restock.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-gray-100 text-primary font-bold text-xs px-5 py-3 rounded-lg flex-shrink-0 relative z-10 transition-colors shadow-sm cursor-pointer"
              >
                Resolve Now
              </button>
            </div>

            {/* Expiry Alerts & Drives layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Expiry Alerts */}
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Expiry alerts</h3>
                <CardWrapper className="flex flex-col gap-3.5 w-full">
                  <NotificationItem
                    title="Unit BB-A+-2201"
                    subtitle="A+ expires in 2 days"
                    actionText="Priority release"
                    borderLeftColor="red"
                  />
                  <NotificationItem
                    title="Unit BB-O+-2185"
                    subtitle="O+ expires in 4 days"
                    actionText="Route to hospital"
                    borderLeftColor="blue"
                  />
                  <NotificationItem
                    title="Unit BB-B+-2170"
                    subtitle="B+ expires in 6 days"
                    actionText="Monitor"
                    borderLeftColor="orange"
                  />
                </CardWrapper>
              </div>

              {/* Stats column: Donor Database */}
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Donor database</h3>
                <div className="grid grid-cols-1 gap-4 w-full h-full">
                  <StatCard title="Total registered" value="4,182" subtext="All time registrations" borderColor="blue" />
                  <StatCard title="Active donors" value="1,247" subtext="Donated in last 12 months" borderColor="green" />
                  <StatCard title="Donations this month" value="308" subtext="Secured units for current month" borderColor="red" />
                </div>
              </div>
            </div>

            {/* Collection Drive Calendar section */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Collection drive calendar</h3>
                <button className="flex items-center gap-1.5 bg-blue-50 text-secondary hover:bg-blue-100/80 font-bold text-xs px-4 py-2.5 rounded-lg border border-blue-100 transition-colors">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  New Drive
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {collectionDrives.map((drive, idx) => (
                  <CardWrapper key={idx} className="flex flex-col gap-4 justify-between border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-extrabold text-secondary uppercase tracking-widest">{drive.date}</span>
                      <h4 className="text-lg font-extrabold text-gray-900 tracking-tight mt-0.5">{drive.title}</h4>
                      <span className="text-xs text-gray-400 font-semibold mt-1 flex items-center gap-1">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {drive.time}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 w-full mt-2">
                      <ProgressBar value={drive.progress} color={drive.color} showText={false} />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{drive.subtext}</span>
                    </div>
                  </CardWrapper>
                ))}
              </div>
            </div>
          </section>

          {/* Right Side: Quick Actions, Outgoing, Incoming */}
          <section className="lg:col-span-4 flex flex-col gap-8 w-full">
            {/* Quick Actions Panel */}
            <CardWrapper className="flex flex-col gap-5 w-full">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quick actions</h3>
              <div className="grid grid-cols-2 gap-4 w-full">
                {/* 1. Add Donation */}
                <button className="flex flex-col items-center justify-center p-5 bg-red-50/50 hover:bg-red-50/80 border border-red-100/50 rounded-xl gap-2 transition-all hover:-translate-y-0.5 cursor-pointer text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-900 leading-tight">Add Donation</span>
                </button>

                {/* 2. Process Request */}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex flex-col items-center justify-center p-5 bg-blue-50/50 hover:bg-blue-50/80 border border-blue-100/50 rounded-xl gap-2 transition-all hover:-translate-y-0.5 cursor-pointer text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M17 1v22M3 5h12M3 19h12" />
                      <polyline points="7 9 11 12 7 15" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-900 leading-tight">Process Request</span>
                </button>

                {/* 3. Schedule Drive */}
                <button className="flex flex-col items-center justify-center p-5 bg-green-50/40 hover:bg-green-50/70 border border-green-100/50 rounded-xl gap-2 transition-all hover:-translate-y-0.5 cursor-pointer text-center">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-900 leading-tight">Schedule Drive</span>
                </button>

                {/* 4. Donor Outreach */}
                <button className="flex flex-col items-center justify-center p-5 bg-orange-50/40 hover:bg-orange-50/70 border border-orange-100/50 rounded-xl gap-2 transition-all hover:-translate-y-0.5 cursor-pointer text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5c0-3.78 3.4-6.86 8.55-11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-900 leading-tight">Donor Outreach</span>
                </button>
              </div>
            </CardWrapper>

            {/* Outgoing Requests Panel */}
            <CardWrapper className="flex flex-col gap-4 w-full">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Outgoing requests</h3>
              <div className="flex flex-col gap-3 w-full">
                {requests.map((req, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 border border-gray-50 rounded-xl hover:bg-gray-50/30 transition-colors w-full cursor-pointer group">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{req.title}</span>
                      <span className="text-xs text-gray-400 mt-0.5">{req.subtitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold tracking-wider ${
                        req.status === "APPROVED" ? "bg-green-50 text-green-600 animate-pulse" : (req.label === "HIGH" ? "bg-red-50 text-primary" : req.label === "MED" ? "bg-blue-50 text-secondary" : "bg-gray-100 text-gray-500")
                      }`}>
                        {req.status === "APPROVED" ? "DISPATCHED" : req.label}
                      </span>
                      <svg className="text-gray-300 group-hover:text-primary transition-colors group-hover:translate-x-0.5 duration-200" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>

            {/* Incoming Donations Panel */}
            <CardWrapper className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Incoming donations</h3>
                <span className="flex items-center gap-1 text-[9px] font-extrabold text-green-600 uppercase tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Live Updates
                </span>
              </div>
              <div className="flex flex-col gap-3.5 w-full">
                {incomingDonations.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900">
                        {item.name}: <span className="text-primary font-black">{item.detail}</span>
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-6 md:px-12 w-full mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500">
          <span>
            VitaNova © 2024 VitaNova Healthcare Support System. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
            <a href="#" className="hover:text-primary transition-colors text-primary">Emergency Protocol</a>
          </div>
        </div>
      </footer>

      {/* Requisition Fulfillment Formik Modal */}
      <ProcessRequestModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pendingRequests={pendingRequestsForModal}
        onSubmit={handleProcessSubmit}
      />
    </div>
  );
}
