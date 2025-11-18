"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useScrollTo } from "@/hooks/use-scroll-to"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollToSection = useScrollTo()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    if (isOpen) setIsOpen(false)
  }

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Projects", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Contact", href: "contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-muted">
              <Image src="/profile.png" alt="Rodgen Valdez" fill className="object-cover" priority />
            </div>
            <span className="ml-2 font-bold text-lg tracking-tight">RDGN</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium hover:text-primary/80 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <ModeToggle />
            <Button onClick={() => handleNavClick("contact")}>Get in Touch</Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium py-2 text-left hover:text-primary/80 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <Button onClick={() => handleNavClick("contact")} className="mt-2">
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
