import type React from "react"
import type { Metadata } from "next"
import { ThemeToggle } from "@/components/theme-toggle"
import { BottomNav } from "@/components/bottom-nav"

export const metadata: Metadata = {
  title: "داشبورد | مدیریت منو",
  description: "مدیریت آیتم‌های منو و تنظیمات",
}


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">کافه دا</p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-balance">
                داشبورد مدیریت
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
        <BottomNav />

      </main>
    </div>
  )
}
