import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "RentEase — Smart & Seamless Rental Management",
  description: "Find your dream home or list your property easily with RentEase.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
        {children}
      </body>
    </html>
  );
}
