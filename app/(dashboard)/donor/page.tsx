"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import CardWrapper from "../../components/dashboard/CardWrapper";
import StatCard from "../../components/dashboard/StatCard";

export default function DonorDashboard() {
  const { t } = useLanguage();

  const donationHistory = [
    {
      date: "Oct 07, 2026",
      center: "Scheduled",
      details: "Whole Blood • 450ml target",
      status: "Awaiting confirmation",
      isPending: true,
    },
    {
      date: "Jun 12, 2026",
      center: "UGMS",
      details: "Whole Blood • 450ml",
      status: "Successful",
      isPending: false,
    },
    {
      date: "Feb 18, 2026",
      center: "Nyaho Clinic",
      details: "Whole Blood • 500ml",
      status: "Successful",
      isPending: false,
    },
    {
      date: "Nov 22, 2025",
      center: "Tech Hospital",
      details: "Whole Blood • 450ml",
      status: "Successful",
      isPending: false,
    },
  ];

  const appointments = [
    {
      date: "Dec 10, 2026 • 10:30 AM",
      center: "Sammy Hospital",
      type: "Screening + donation",
    },
    {
      date: "Mar 22, 2027 • 2:00 PM",
      center: "Mobile Drive — City Hall",
      type: "Plasma donation",
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 flex flex-col justify-between w-full">
      {/* Dashboard Navbar */}
      <DashboardNavbar userName="Sena" userRole="Donor" dashboardType="donor" />

      {/* Main Container */}
      <main className="container mx-auto px-6 py-10 flex flex-col gap-8 w-full flex-grow">
        {/* Welcome Section */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 w-full">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {t("donor.welcomeTitle") || "Welcome back, Sena"}
            </h1>
            <span className="text-sm font-semibold text-gray-500">Donor ID: DN-419</span>
          </div>

          <div className="bg-[#1e293b] text-white p-5 rounded-2xl flex items-center justify-between w-64 h-20 shadow-md shadow-gray-200 flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Blood Type</span>
              <span className="text-xs font-bold opacity-60 mt-0.5">Universal Donor</span>
            </div>
            <span className="text-4xl font-black tracking-tight">O+</span>
          </div>
        </section>

        {/* Top metrics row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatCard 
            title={t("donor.totalDonations") || "Total Donations"} 
            value="24" 
            subtext="12 Liters Saved" 
            borderColor="red" 
          />
          <StatCard 
            title={t("donor.lastDonation") || "Last Donation"} 
            value="June 12, 2026" 
            subtext="Central Blood Center" 
            borderColor="blue" 
          />
          <StatCard 
            title={t("donor.nextEligible") || "Next Eligible"} 
            value="Oct 07, 2026" 
            subtext="In 56 days" 
            borderColor="blue" 
          />
        </div>

        {/* Eligibility Status Warning Card */}
        <div className="border-l-4 border-l-primary bg-blue-50/20 border border-gray-100 rounded-2xl p-6 flex gap-4 w-full items-start">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-primary flex-shrink-0">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 22 22 2 22" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <circle cx="12" cy="17" r="1" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("donor.eligibilityTitle") || "Eligibility status"}</span>
            <h3 className="text-base font-bold text-gray-900 leading-snug mt-0.5">Not eligible — recovery period</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mt-1">
              You can donate again on Oct 07, 2026. Your body needs this time to replenish red blood cells.
            </p>
          </div>
        </div>

        {/* Double column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Donation History */}
          <section className="lg:col-span-8 flex flex-col gap-8 w-full">
            <CardWrapper className="flex flex-col gap-6 w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{t("donor.donationHistory") || "Donation history"}</h3>
                <a href="#" className="text-xs font-bold text-secondary hover:underline">{t("donor.downloadReport") || "Download Report"}</a>
              </div>

              <div className="flex flex-col gap-4 w-full">
                {donationHistory.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 border border-gray-50 rounded-xl w-full">
                    <div className="flex items-center gap-4">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 ${item.isPending ? "border-primary bg-transparent" : "border-gray-400 bg-gray-400"} flex-shrink-0`} />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">
                          {item.date} <span className="text-gray-400 font-semibold">— {item.center}</span>
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5">{item.details}</span>
                      </div>
                    </div>

                    {item.isPending ? (
                      <span className="text-xs italic font-bold text-gray-400">{item.status}</span>
                    ) : (
                      <span className="bg-green-50 text-green-600 font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {item.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardWrapper>
          </section>

          {/* Right Column: Appointments & Quick Actions */}
          <section className="lg:col-span-4 flex flex-col gap-8 w-full">
            {/* Upcoming Appointments */}
            <div className="flex flex-col gap-4 w-full">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{t("donor.upcomingAppointments") || "Upcoming appointments"}</h3>
              <CardWrapper className="bg-blue-50/20 border-blue-50 flex flex-col gap-4 w-full">
                {appointments.map((appt, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-5 rounded-xl flex flex-col gap-3.5 w-full shadow-sm shadow-gray-100/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-extrabold text-secondary uppercase tracking-widest">{appt.date}</span>
                      <h4 className="text-base font-extrabold text-gray-900 mt-1 leading-snug">{appt.center}</h4>
                      <span className="text-xs text-gray-400 font-semibold mt-1">{appt.type}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button 
                        onClick={() => alert("Appointment confirmed!")}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-lg transition-colors cursor-pointer text-center"
                      >
                        Confirm
                      </button>
                      <button 
                        onClick={() => alert("Redirecting to reschedule interface...")}
                        className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs py-2 rounded-lg transition-colors cursor-pointer text-center"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </CardWrapper>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-4 w-full">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Quick actions</h3>
              <div className="flex flex-col gap-3.5 w-full">
                {/* 1. Schedule Donation */}
                <button className="bg-slate-900 hover:bg-slate-800 text-white p-5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-md flex justify-between items-center w-full cursor-pointer text-left">
                  <span>Schedule Donation</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                {/* 2. Find Donation Center */}
                <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-100 p-5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-sm flex justify-between items-center w-full cursor-pointer text-left">
                  <span className="flex items-center gap-2">
                    <svg className="text-secondary" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Find Donation Center
                  </span>
                  <svg className="text-gray-300" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* 3. View Rewards */}
                <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-100 p-5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-sm flex justify-between items-center w-full cursor-pointer text-left">
                  <span className="flex items-center gap-2">
                    <svg className="text-secondary" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                    View Rewards
                  </span>
                  <svg className="text-gray-300" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
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
    </div>
  );
}
