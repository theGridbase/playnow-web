import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/styles/globals.scss";
import 'react-calendar/dist/Calendar.css';
import ThemeProvider from "@/components/Providers/ThemeProvider/ThemeProvider";
import AuthProvider from "@/components/Providers/AuthProvider/AuthProvider";
import { NotificationProvider } from "@/components/context/NotificationContext/NotificationContextProvider";
import 'antd/dist/reset.css'; 
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
            <AuthProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
