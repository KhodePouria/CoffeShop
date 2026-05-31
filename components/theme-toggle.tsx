"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { flushSync } from "react-dom"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === "dark"
    const newTheme = isDark ? "light" : "dark"

    // Check if the browser supports View Transitions API
    if (!("startViewTransition" in document)) {
      setTheme(newTheme)
      return
    }

    // Get click coordinates
    const x = e.clientX
    const y = e.clientY

    // Calculate the radius needed to cover the entire screen from the click point
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Create a dynamic style tag to override default crossfade animations for this specific transition
    const style = document.createElement("style")
    style.innerHTML = `
      ::view-transition-group(root) { animation: none; }
      ::view-transition-old(root), ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
        display: block;
      }
      ::view-transition-old(root) { z-index: 1; }
      ::view-transition-new(root) { z-index: 9999; }
    `
    document.head.appendChild(style)

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
      // Force the DOM to update immediately so the browser captures the correct snapshot
      document.documentElement.classList.remove(isDark ? "dark" : "light")
      document.documentElement.classList.add(newTheme)
      document.documentElement.style.colorScheme = newTheme
    })

    transition.ready.then(() => {
      // Animate the circular clip path expanding
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1000, // 1 second as requested
          easing: "cubic-bezier(0.64, 0, 0.12, 1)", // Super smooth, dramatic easing
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })

    // Fallback cleanup: ensure styles are strictly removed only AFTER the transition is 100% destroyed by the browser
    transition.finished.finally(() => {
      if (document.head.contains(style)) style.remove()
    })
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-3 rounded-full outline-none transition-all duration-500 hover:scale-[1.15] active:scale-95 group text-foreground bg-transparent hover:bg-foreground hover:text-background"
    >
      <div className="relative z-10 flex items-center justify-center transition-colors duration-500">
        {theme === "dark" ? (
          <Sun className="h-5 w-5 transition-transform duration-700 group-hover:rotate-180" />
        ) : (
          <Moon className="h-5 w-5 transition-transform duration-700 group-hover:-rotate-12" />
        )}
      </div>
      <span className="sr-only">تغییر تم</span>
    </button>
  )
}
