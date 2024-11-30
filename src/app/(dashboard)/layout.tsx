import Footer from "@/components/Footer/Footer";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
