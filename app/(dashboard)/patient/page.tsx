"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import CardWrapper from "../../components/dashboard/CardWrapper";
import StatCard from "../../components/dashboard/StatCard";
import ProgressBar from "../../components/dashboard/ProgressBar";
import ActionButton from "../../components/dashboard/ActionButton";
import NotificationItem from "../../components/dashboard/NotificationItem";

export default function RecipientDashboard() {
  const notifications = [
    {
      title: "Sammy Hospital - 1 unit B- available",
      subtitle: "2.4 km away • Ready for pickup",
      actionText: "Contact",
      borderLeftColor: "blue" as const,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 12h6M12 9v6" />
        </svg>
      ),
    },
    {
      title: "Donor J.R. - Confirmed match",
      subtitle: "Scheduled July 18, 2026 - Nyaho Clinic",
      actionText: "View",
      borderLeftColor: "orange" as const,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        </svg>
      ),
    },
    {
      title: "Bloodaholic Blood Services - 2 units potentially available",
      subtitle: "Pending verification",
      actionText: "View",
      borderLeftColor: "orange" as const,
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
        </svg>
      ),
    },
  ];

  const requestsHistory = [
    { id: "REQ-2026-1147", date: "July 10, 2026 • 3 Units", status: "Active" },
    { id: "REQ-2026-0842", date: "Jul 22, 2025 • 2 Units", status: "Fulfilled" },
    { id: "REQ-2026-0417", date: "Mar 05, 2023 • 1 Unit", status: "Fulfilled" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 flex flex-col justify-between w-full">
      {/* Top Header Navbar */}
      <nav className="h-20 bg-white border-b border-gray-100 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 w-full">
        <div className="flex items-center gap-8">
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            Vita<span className="text-primary">Nova</span>
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="/patient" className="text-primary border-b-2 border-primary py-6">
              Dashboard
            </Link>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors py-6">
              Requests
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors py-6">
              Inventory
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors py-6">
              Donors
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-xs outline-none focus:border-primary focus:bg-white w-48 transition-all"
            />
          </div>
          <button className="bg-primary hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all">
            Emergency Alert
          </button>
          {/* Notifications Icon */}
          <button className="text-gray-500 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-50">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          {/* Settings Icon */}
          <button className="text-gray-500 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-50">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          {/* Avatar Profile */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <Image
              src="/vitanova512.png"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-10 flex flex-col gap-8 w-full flex-grow">
        {/* Title Heading */}
        <section className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Recipient Dashboard
          </h1>
          <span className="text-sm font-semibold text-gray-500">Patient view</span>
        </section>

        {/* Profile Card Header */}
        <CardWrapper className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
              <Image
                src="/vitanova512.png"
                alt="Michael Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">Hello, Michael</h2>
              <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Patient ID: PT-123</span>
            </div>
          </div>

          <div className="bg-primary text-white p-5 rounded-2xl flex flex-col justify-center items-center w-36 h-20 shadow-md shadow-red-100 flex-shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Blood Type</span>
            <span className="text-3xl font-extrabold tracking-tight mt-0.5">B-</span>
          </div>
        </CardWrapper>

        {/* Two Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column (8 cols): Active Request and Matches */}
          <section className="lg:col-span-8 flex flex-col gap-8 w-full">
            {/* Active Request Card */}
            <CardWrapper className="border-l-4 border-l-primary flex flex-col gap-6 w-full">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Blood Request</span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">REQ-2026-1147</h3>
                </div>
                <span className="bg-primary/5 text-primary text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  ! High Urgency
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full py-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Blood Type</span>
                  <span className="text-2xl font-extrabold text-primary mt-1">B-</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Units Required</span>
                  <span className="text-2xl font-extrabold text-gray-900 mt-1">3 units</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-secondary mt-2.5">
                    <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse" />
                    Matching donors
                  </span>
                </div>
              </div>

              {/* Progress bar info */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between text-xs font-bold text-gray-900">
                  <span className="text-gray-400">Progress: 1 of 3 units secured</span>
                  <span className="text-primary">33%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "33%" }} />
                </div>
              </div>
            </CardWrapper>

            {/* Match Notifications List */}
            <CardWrapper className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-2 text-secondary">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Match notifications</h3>
              </div>

              <div className="flex flex-col gap-4 w-full">
                {notifications.map((notif, index) => (
                  <NotificationItem
                    key={index}
                    title={notif.title}
                    subtitle={notif.subtitle}
                    actionText={notif.actionText}
                    borderLeftColor={notif.borderLeftColor}
                    icon={notif.icon}
                  />
                ))}
              </div>
            </CardWrapper>
          </section>

          {/* Right Column (4 cols): Medical Summary and History */}
          <section className="lg:col-span-4 flex flex-col gap-8 w-full">
            {/* Medical Summary Panel */}
            <CardWrapper className="bg-blue-50/20 border-blue-50 flex flex-col gap-5 w-full">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Medical summary</h3>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4 text-xs font-semibold">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Blood Type</span>
                  <span className="text-gray-900 font-bold mt-1 text-sm">B- (Rhesus negative)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Physician</span>
                  <span className="text-gray-900 font-bold mt-1 text-sm">Dr. Amenuveve</span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Insurance Status</span>
                  <span className="text-green-600 font-bold mt-1 text-sm">MediCare - Active</span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Allergies</span>
                  <span className="text-gray-500 mt-1">None reported</span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Condition</span>
                  <span className="text-gray-500 mt-1">None</span>
                </div>
              </div>
            </CardWrapper>

            {/* Request History Panel */}
            <CardWrapper className="flex flex-col gap-5 w-full">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Request history</h3>
              <div className="flex flex-col w-full text-xs">
                <div className="flex justify-between font-bold text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-50">
                  <span>Req ID</span>
                  <span>Status</span>
                </div>
                <div className="flex flex-col gap-4 mt-3">
                  {requestsHistory.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{item.id}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">{item.date}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                        item.status === "Active" ? "bg-blue-50 text-secondary" : "bg-gray-50 text-gray-500"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardWrapper>
          </section>
        </div>

        {/* Bottom CTA Actions bar */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full mt-6 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm shadow-gray-100/30">
          <ActionButton
            label="New Blood Request"
            variant="primary"
            className="w-full sm:w-auto"
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            }
          />
          <ActionButton
            label="Contact Blood Bank"
            variant="light-blue"
            className="w-full sm:w-auto"
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
          />
          <ActionButton
            label="Emergency Request"
            variant="dark"
            className="w-full sm:w-auto"
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
                <polygon points="12 2 22 22 2 22" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <circle cx="12" cy="17" r="1" />
              </svg>
            }
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-6 md:px-12 w-full mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500">
          <span>
            Vita<span className="text-primary font-bold">Nova</span> © 2024 VitaNova Healthcare Support System. All rights reserved.
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
