"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Function to handle smooth scrolling
  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <footer className="bg-muted py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <button
              onClick={() => handleScrollTo("home")}
              className="flex items-center mb-3 hover:opacity-90 transition-opacity"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-muted">
                <Image src="/profile.png" alt="Rodgen Valdez" fill className="object-cover" />
              </div>
              <span className="ml-3 font-bold text-xl tracking-tight">RDGN</span>
            </button>
            <p className="text-muted-foreground mt-2 max-w-md text-center md:text-left">
              A passionate web developer creating beautiful and functional digital experiences.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link
              href="https://github.com/RdgnVldz"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/rodgen-valdez-67b9a0238/"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:rodgen.valdez19@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <button
              onClick={() => handleScrollTo("home")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo("projects")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => handleScrollTo("skills")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Rodgen Valdez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
