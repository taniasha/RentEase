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
      <main className="w-full px-8" style={{ minHeight: "85vh", paddingTop: "6.5rem", paddingBottom: "3rem" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
