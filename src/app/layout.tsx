import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/styles/globals.scss";
import ThemeProvider from "@/components/Providers/ThemeProvider/ThemeProvider";
import AuthProvider from "@/components/Providers/AuthProvider/AuthProvider";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Play Now",
  description: "sports application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AntdRegistry>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
