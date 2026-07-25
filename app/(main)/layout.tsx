// app/(main)/layout.tsx

import Navbar from "../components/UILayout/Navbar";
import Footer from "../components/UILayout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Your Navbar only shows up for pages inside the (main) group */}
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}