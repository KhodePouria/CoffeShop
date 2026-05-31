import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CookiesProvider } from "next-client-cookies/server"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { Peyda } from "./fonts"

export const metadata: Metadata = {
  title: "کافه دا - منو",
  description: "منوی متنوع ما را با غذاها، نوشیدنی‌ها و دسرهای خوشمزه کاوش کنید",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${Peyda.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <CookiesProvider>
            <div className="min-h-screen bg-background">
              {children}
              <Toaster dir="rtl" position="top-center" />
            </div>
          </CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
