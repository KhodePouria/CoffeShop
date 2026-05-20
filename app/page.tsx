"use client"

import { useState, useEffect } from "react"
import { CategorySlider } from "@/components/category-slider"
import { MenuSection } from "@/components/menu-section"
import { ItemDetailDrawer } from "@/components/item-detail-drawer"
import { ThemeToggle } from "@/components/theme-toggle"
import { categories, menuItems } from "@/lib/menu-data"
import type { MenuItem } from "@/lib/types"
import { useScrollSpy } from "@/hooks/use-scroll-spy"

export default function HomePage() {
  const categoryIds = categories.map((c) => c.id)
  const activeCategoryFromScroll = useScrollSpy(categoryIds, 150)
  const [activeCategory, setActiveCategory] = useState("foods")
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setActiveCategory(activeCategoryFromScroll)
  }, [activeCategoryFromScroll])

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = document.getElementById(categoryId)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">منوی خوشمزه</h1>
            <ThemeToggle />
          </div>
          <p className="text-sm text-muted-foreground text-center">لذت‌های آشپزی ما را کاوش کنید</p>
        </div>
      </header>

      <div className="sticky top-[73px] z-30">
        <CategorySlider activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
      </div>

      <main className="max-w-md mx-auto py-6">
        {categories.map((category) => {
          const items = menuItems.filter((item) => item.category === category.id)
          return (
            <MenuSection
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
              items={items}
              onItemClick={handleItemClick}
            />
          )
        })}
      </main>

      <ItemDetailDrawer item={selectedItem} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
