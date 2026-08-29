import LandlordNavbar from "@/components/LandlordNavbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/customComponents/AuthGuard";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRole="landlord">
      <LandlordNavbar />
      <main className="w-full px-8" style={{ minHeight: "85vh", paddingTop: "6.5rem", paddingBottom: "3rem" }}>
        {children}
      </main>
      <Footer />
    </AuthGuard>
  );
}
