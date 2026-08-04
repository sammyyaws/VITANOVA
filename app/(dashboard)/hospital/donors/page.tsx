import React, { useState } from "react";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import BloodRequestModal from "../../components/dashboard/BloodRequestModal";

export default function HospitalDonors() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestSubmit = (values: { blood_group_needed: string; quantity_units: number; urgency_level: string; required_by_time: string }) => {
    console.log("New request submitted", values);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen flex flex-col">
      <DashboardNavbar userName="Dr. Xavier" userRole="Hospital Coordinator" dashboardType="hospital" onRequestClick={() => setIsModalOpen(true)} />
      <main className="container mx-auto px-6 py-10 flex-grow">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Donors</h1>
        <p className="text-gray-600">Donor directory and recent donations will be displayed here.</p>
      </main>
      <BloodRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleRequestSubmit} />
    </div>
  );
}
