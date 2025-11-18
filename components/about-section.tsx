"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/20 to-primary/0 -z-10 transform rotate-3"></div>
            <Card className="overflow-visible h-auto w-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-center">My Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["HTML", "CSS", "JavaScript", "WordPress", "PHP", "React", "Next.js"].map((skill, index) => (
                    <div
                      key={skill}
                      className={`
                        bg-background p-4 rounded-lg text-center shadow-sm
                        transition-all duration-300 hover:shadow-md hover:scale-105
                        hover:bg-primary hover:text-primary-foreground
                        ${skill === "Next.js" ? "col-span-2" : ""}
                      `}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-muted-foreground mb-6">
              I'm a passionate web developer with a strong focus on creating responsive, user-friendly applications.
              With expertise in HTML, CSS, JavaScript, WordPress, PHP, React, and Next.js, I strive to build seamless
              digital experiences.
            </p>
            <p className="text-muted-foreground mb-6">
              My journey in web development began 4 years ago, and since then, I've worked on various projects ranging
              from e-commerce platforms to complex web applications. I'm constantly learning and adapting to new
              technologies to stay at the forefront of web development.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-medium mb-2">Name:</h4>
                <p className="text-muted-foreground">Rodgen Valdez</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Email:</h4>
                <p className="text-muted-foreground">rodgen.valdez19@gmail.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Location:</h4>
                <p className="text-muted-foreground">Cebu City, Philippines</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Availability:</h4>
                <p className="text-muted-foreground">Available for hire</p>
              </div>
            </div>

            <Button asChild>
              <a
                href="https://drive.google.com/file/d/1Bj_3UryqB9FHiQg7Ogh71w6X-6PaCFoq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
