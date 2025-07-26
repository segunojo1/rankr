import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";
import ThemeSwitcher from "@/components/ui/theme-switcher";

export const metadata: Metadata = {
  title: "Rankr",
  description: "Rankr web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased instrument-sans bg-[#fafafa]`}
      >
          <nav className="lg:pl-[68px] pl-5 pr-5 pt-[30px] flex justify-between fixed min-w-full items-center">
            <Image src="/assets/logo.png" width={50} height={50} alt="" />
            <ThemeSwitcher />
          </nav>

          {children}
      </body>
    </html>
  );
}
