import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/prosemirror.css";
import "./styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationBar } from "@/components/NavigationBar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Festify",
  description: "An application for all your fests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-global dark:bg-[#262728]`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="px-8 sm:px-20 lg:px-40">
              <NavigationBar />
              {children}
            </main>
            <Toaster richColors/>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
