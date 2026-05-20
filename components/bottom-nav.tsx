"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, Info } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      label: "خانه",
      icon: Home,
    },
    {
      href: "/favourites",
      label: "علاقه‌مندی‌ها",
      icon: Heart,
    },
    {
      href: "/about",
      label: "درباره ما",
      icon: Info,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-all ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? "fill-primary" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
