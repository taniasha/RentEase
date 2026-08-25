import LandlordNavbar from "@/components/LandlordNavbar";
import Footer from "@/components/Footer";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandlordNavbar />
      <main style={{ minHeight: "85vh", paddingTop: "6.5rem", paddingBottom: "3rem" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
