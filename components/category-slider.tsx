"use client"

import { useRef, useEffect, useState } from "react"
import { categories } from "@/lib/menu-data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CategorySliderProps {
  activeCategory: string
  onCategoryClick: (categoryId: string) => void
}

export function CategorySlider({ activeCategory, onCategoryClick }: CategorySliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const activeButtonRef = useRef<HTMLButtonElement>(null)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const isRTL = document.dir === "rtl" || document.documentElement.dir === "rtl"
      if (isRTL) {
        setShowRightArrow(scrollLeft < 0)
        setShowLeftArrow(Math.abs(scrollLeft) < scrollWidth - clientWidth - 10)
      } else {
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
      }
    }
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [])

  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const button = activeButtonRef.current
      const container = scrollContainerRef.current
      const buttonLeft = button.offsetLeft
      const buttonWidth = button.offsetWidth
      const containerWidth = container.offsetWidth
      const scrollLeft = container.scrollLeft

      // Check if button is not fully visible
      if (buttonLeft < scrollLeft || buttonLeft + buttonWidth > scrollLeft + containerWidth) {
        container.scrollTo({
          left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
          behavior: "smooth",
        })
      }
    }
  }, [activeCategory])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative bg-card border-b border-border">
      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full rounded-none bg-gradient-to-l from-card to-transparent"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            ref={activeCategory === category.id ? activeButtonRef : null}
            onClick={() => onCategoryClick(category.id)}
            className={`flex flex-col items-center gap-1 min-w-[80px] px-3 py-2 rounded-xl transition-all ${
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-xs font-medium whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>

      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full rounded-none bg-gradient-to-r from-card to-transparent"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
