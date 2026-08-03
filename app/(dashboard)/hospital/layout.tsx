import DashboardNavbar from "@/app/components/dashboard/DashboardNavbar";
export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <div className="flex flex-1 flex-col">
        <DashboardNavbar
          userName="Dr. Xavier"
          userRole="Hospital Coordinator"
          dashboardType="hospital"
        />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}