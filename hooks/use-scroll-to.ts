"use client"

import { useCallback } from "react"

export function useScrollTo() {
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      // Add a small delay to ensure any state changes complete first
      setTimeout(() => {
        const headerOffset = 80 // Adjust based on your header height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }, 100)
    }
  }, [])

  return scrollToSection
}
