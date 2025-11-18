"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Database, Globe, Layers, Palette, Server, Smartphone, Workflow } from "lucide-react"

// Skill categories with icons
const skillCategories = [
  {
    name: "Frontend",
    icon: <Palette className="h-6 w-6 mb-2 text-blue-500" />,
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    name: "CMS & Backend",
    icon: <Server className="h-6 w-6 mb-2 text-green-500" />,
    skills: [
      { name: "WordPress", level: 85 },
      { name: "PHP", level: 80 },
      { name: "Node.js", level: 70 },
    ],
  },
  {
    name: "Database",
    icon: <Database className="h-6 w-6 mb-2 text-yellow-500" />,
    skills: [
      { name: "MySQL", level: 75 },
      { name: "MongoDB", level: 65 },
    ],
  },
  {
    name: "Tools & Others",
    icon: <Workflow className="h-6 w-6 mb-2 text-purple-500" />,
    skills: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 80 },
      { name: "VS Code", level: 85 },
      { name: "Figma", level: 70 },
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">My Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here's an overview of my technical skills and expertise in various technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {category.icon}
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 group-hover:from-blue-600 group-hover:to-violet-600 transition-colors"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <Globe className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h4 className="font-bold">Web Development</h4>
            <p className="text-sm text-muted-foreground mt-2">Responsive & modern websites</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <Smartphone className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h4 className="font-bold">Mobile-First</h4>
            <p className="text-sm text-muted-foreground mt-2">Optimized for all devices</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <Code2 className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <h4 className="font-bold">Clean Code</h4>
            <p className="text-sm text-muted-foreground mt-2">Maintainable & efficient</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <Layers className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h4 className="font-bold">Full Stack</h4>
            <p className="text-sm text-muted-foreground mt-2">End-to-end solutions</p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
