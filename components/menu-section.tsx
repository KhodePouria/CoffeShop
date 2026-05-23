"use client"

import type { MenuItem } from "@/lib/types"
import { MenuItemCard } from "./menu-item-card"

interface MenuSectionProps {
  categoryId: string
  categoryName: string
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}

export function MenuSection({ categoryId, categoryName, items, onItemClick }: MenuSectionProps) {
  if (items.length === 0) return null

  return (
    <section id={categoryId} className="scroll-mt-32 mb-10">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-balance">
        {categoryName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onClick={() => onItemClick(item)} />
        ))}
      </div>
    </section>
  )
}
