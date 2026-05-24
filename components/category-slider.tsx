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
    <div className="relative w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full rounded-none bg-gradient-to-l from-background/80 to-transparent hover:bg-transparent"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-5 justify-start lg:justify-center items-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                ref={isActive ? activeButtonRef : null}
                onClick={() => onCategoryClick(category.id)}
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className={`relative shrink-0 flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${isActive ? "scale-105 shadow-md" : "hover:scale-105"
                  }`}
              >
                <div className="absolute inset-0 bg-black/40 transition-colors duration-300 hover:bg-black/30" />

                <span className="relative z-10 text-xs sm:text-sm font-bold text-white text-center leading-tight drop-shadow-md px-1 pb-1">
                  {category.name}
                </span>

                <div
                  className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-300 z-10 ${isActive
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-white/60"
                    }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full rounded-none bg-gradient-to-r from-background/80 to-transparent hover:bg-transparent"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
