"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState("fadeIn")

  useEffect(() => {
    setTransitionStage("fadeOut")
  }, [pathname])

  useEffect(() => {
    if (transitionStage === "fadeOut") {
      const timeout = setTimeout(() => {
        setDisplayChildren(children)
        setTransitionStage("fadeIn")
      }, 150)

      return () => clearTimeout(timeout)
    }
  }, [transitionStage, children])

  return (
    <div className={`${transitionStage === "fadeOut" ? "animate-fade-out" : "animate-fade-in"}`}>{displayChildren}</div>
  )
}
