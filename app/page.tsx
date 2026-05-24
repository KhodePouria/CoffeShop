import { ThemeToggle } from "@/components/theme-toggle"
import { categories, menuItems } from "@/lib/menu-data"
import { HomePageClient } from "@/components/home-page-client"

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-balance">
              کافه دا
            </h1>
            <ThemeToggle />
          </div>

        </div>
      </header>

      <HomePageClient categories={categories} menuItems={menuItems} />
    </div>
  )
}
