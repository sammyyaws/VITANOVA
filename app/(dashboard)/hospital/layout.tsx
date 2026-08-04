"use client";
import React, { useState, useEffect } from "react";
import DashboardNavbar from "@/app/components/dashboard/DashboardNavbar";
import BloodRequestModal from "@/app/components/dashboard/BloodRequestModal";

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Listen for custom event from child pages to open the modal
  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-blood-request-modal", handleOpenModal);
    return () => window.removeEventListener("open-blood-request-modal", handleOpenModal);
  }, []);

  const handleRequestSubmit = (values: {
    blood_group_needed: string;
    quantity_units: number;
    urgency_level: string;
    required_by_time: string;
  }) => {
    console.log("New request submitted", values);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col">
        <DashboardNavbar
          userName="Dr. Xavier"
          userRole="Hospital Coordinator"
          dashboardType="hospital"
          onRequestClick={() => setIsModalOpen(true)}
        />
        <main className="flex-1">
          {children}
        </main>
        <BloodRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRequestSubmit}
        />
      </div>
    </div>
  );
}