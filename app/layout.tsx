import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { BottomNav } from "@/components/bottom-nav"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "رستوران خوشمزه - منو",
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
      <body className={`antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            {children}
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
