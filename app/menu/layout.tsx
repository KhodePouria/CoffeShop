import type React from "react"
import { BottomNav } from "@/components/bottom-nav"


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div dir="rtl" className="min-h-screen bg-background">
            {children}
            <BottomNav />
        </div>
    )
}
