import TenantNavbar from "@/components/TenantNavbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/customComponents/AuthGuard";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRole="tenant">
      <TenantNavbar />
      <main className="w-full px-6" style={{ minHeight: "85vh", paddingTop: "6.5rem", paddingBottom: "3rem" }}>
        {children}
      </main>
      <Footer />
    </AuthGuard>
  );
}
