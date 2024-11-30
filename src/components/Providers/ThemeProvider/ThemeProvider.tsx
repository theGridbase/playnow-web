import { ConfigProvider } from "antd";
import { Poppins } from "next/font/google";
import colorVariables from "@/styles/variables.module.scss";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorVariables.primaryColor,
          fontFamily: poppins.style.fontFamily,
          // borderRadiusLG: 50,
        },
        components: {
          Button: {
          },
          Input: {
            paddingBlockLG: 15,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
