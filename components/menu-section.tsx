"use client"

import type { MenuItem } from "@/lib/types"
import { MenuItemCard } from "./menu-item-card"
import { ProductModel } from "@/api/Api"

interface MenuSectionProps {
  categoryId: string
  categoryName: string
  items: ProductModel[]
  onItemClick: (item: ProductModel) => void
}

export function MenuSection({ categoryId, categoryName, items, onItemClick }: MenuSectionProps) {
  if (items.length === 0) return null

  return (
    <section id={categoryId} className="scroll-mt-32 mb-16 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-7 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"></div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {categoryName}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 relative z-10">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onClick={() => onItemClick(item)} />
        ))}
      </div>
    </section>
  )
}
