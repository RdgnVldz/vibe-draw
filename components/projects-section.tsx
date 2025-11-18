"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

// Sample project data
const projects = [
  {
    id: 1,
    title: "Constituency",
    image: "/constituency.png",
    tags: ["WordPress", "Elementor", "Hostinger", "Figma"],
    tagColors: ["#0073aa", "#92003B", "#FF6B35", "#A100F2"],
    liveUrl: "https://constituency.ie/",
    hideGithub: true,
  },
  {
    id: 2,
    title: "Philomedia",
    image: "/philomedia.jpg",
    tags: ["WordPress", "Elementor", "Hostinger", "Figma"],
    tagColors: ["#0073aa", "#92003B", "#FF6B35", "#A100F2"],
    liveUrl: "https://philomedia.ie/",
    hideGithub: true,
  },
  {
    id: 3,
    title: "Food Ordering System UI",
    image: "/tomato.png",
    tags: ["React", "UI/UX", "Responsive", "Tailwind CSS"],
    tagColors: ["#61dafb", "#FF5A5F", "#0EA5E9", "#38bdf8"],
    liveUrl: "https://rdgnvldz.github.io/",
    hideGithub: true,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Each project is a unique piece of development that showcases my skills
            and passion for building web applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: project.tagColors?.[tagIndex] || "#6b7280" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {!project.hideGithub && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.githubUrl || "#"} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  )}
                  <Button size="sm" asChild className={!project.hideGithub ? "" : "ml-auto"}>
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link href="https://github.com/RdgnVldz?tab=repositories" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              See More on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
