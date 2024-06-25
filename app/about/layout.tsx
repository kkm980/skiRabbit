import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Web3Provider } from '@/context/Web3Context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkiRabbit",
  description: "Own the memeVerse",
};

import { ThemeProvider } from "@/components/themeProvider"
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }: any) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Web3Provider>
            {children}
            <Toaster />
            </Web3Provider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
