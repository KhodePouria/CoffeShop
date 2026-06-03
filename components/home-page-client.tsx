"use client"

import { useEffect, useState } from "react"
import { CategorySlider } from "@/components/category-slider"
import { MenuSection } from "@/components/menu-section"
import { ItemDetailDrawer } from "@/components/item-detail-drawer"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { CategoryModel, ProductModel } from "@/api/Api"

interface HomePageClientProps {
    categories: CategoryModel[]
    menuItems: ProductModel[]
}

export function HomePageClient({ categories, menuItems }: HomePageClientProps) {
    const categoryIds = categories.map((c) => c.id)
    const activeCategoryFromScroll = useScrollSpy(categoryIds, 150)
    const [activeCategory, setActiveCategory] = useState(categoryIds[0] ?? "")
    const [selectedItem, setSelectedItem] = useState<ProductModel | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        if (activeCategoryFromScroll) {
            setActiveCategory(activeCategoryFromScroll)
        }
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

    const handleItemClick = (item: ProductModel) => {
        setSelectedItem(item)
        setDrawerOpen(true)
    }

    return (
        <>
            <div className="sticky top-[3.8rem] z-30">
                <CategorySlider categories={categories} activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
            </div>

            <main className="max-w-6xl mx-auto py-6  px-4 sm:px-6 lg:px-8">
                {categories.map((category) => {
                    const items = menuItems.filter((item) => item.categoryId === category.id)
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
        </>
    )
}