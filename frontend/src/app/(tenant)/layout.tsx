import TenantNavbar from "@/components/TenantNavbar";
import Footer from "@/components/Footer";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TenantNavbar />
      <main style={{ minHeight: "85vh", paddingTop: "6.5rem", paddingBottom: "3rem" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
