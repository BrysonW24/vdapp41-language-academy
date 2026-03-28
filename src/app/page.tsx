"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  Globe,
  Languages,
  MessageSquare,
  GraduationCap,
  Clock,
  ArrowRight,
  BarChart3,
  Target,
  Layers,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WORD_GROUPS } from "@/types/curriculum"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.2, 0.75, 0.2, 1] as const },
  }),
} as const

const STATS = [
  { label: "Words", value: "1,000", icon: BookOpen, color: "#386a58" },
  { label: "Groups", value: "5", icon: Layers, color: "#2f4f79" },
  { label: "Topics", value: "15+", icon: Globe, color: "#6d28d9" },
  { label: "Target Level", value: "A1-A2", icon: Target, color: "#a16a1f" },
]

const SECTIONS = [
  { href: "/words", label: "1000 Words", desc: "Master the most frequent words in Spanish, organised by the Pareto Ladder", icon: BookOpen, color: "#386a58" },
  { href: "/topics", label: "Topics", desc: "Real-life situations with dialogues, phrases, grammar, and quizzes", icon: Globe, color: "#2f4f79" },
  { href: "/grammar", label: "Grammar", desc: "Essential grammar rules with patterns, conjugations, and examples", icon: Languages, color: "#6d28d9" },
  { href: "/phrases", label: "Phrases", desc: "Ready-to-use phrase packs for common situations", icon: MessageSquare, color: "#a16a1f" },
  { href: "/practice", label: "Practice", desc: "Interactive exercises to reinforce what you have learned", icon: GraduationCap, color: "#a0453f" },
  { href: "/timeline", label: "Timeline", desc: "A 3-month roadmap from zero to basic conversation", icon: Clock, color: "#65655f" },
]

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Hero */}
      <motion.section
        className="text-center max-w-3xl mx-auto pt-8 pb-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
      >
        <Badge variant="default" className="mb-4">
          Pareto-powered language learning
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-editorial-ink leading-tight tracking-tight mb-4">
          Learn Spanish with{" "}
          <span className="text-editorial-green">1,000 Words</span>
        </h1>
        <p className="text-lg sm:text-xl text-editorial-muted leading-relaxed max-w-2xl mx-auto">
          80% of everyday Spanish conversation uses just 1,000 words.
          Master them in order of frequency and unlock real communication — fast.
        </p>
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
      >
        {STATS.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div key={stat.label} variants={fadeUp} custom={i + 1}>
              <Card className="text-center p-4">
                <div
                  className="mx-auto h-10 w-10 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-serif font-semibold text-editorial-ink">{stat.value}</p>
                <p className="text-sm text-editorial-muted">{stat.label}</p>
              </Card>
            </motion.div>
          )
        })}
      </motion.section>

      {/* Pareto Ladder */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={fadeUp} custom={5} className="text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-editorial-ink mb-2">
            The Pareto Ladder
          </h2>
          <p className="text-editorial-muted max-w-xl mx-auto">
            Five groups of words, ordered by frequency. Each group unlocks a new level of ability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORD_GROUPS.map((group, i) => (
            <motion.div key={group.id} variants={fadeUp} custom={i + 6}>
              <Link href={`/words/${group.id}`} className="block group">
                <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <Badge
                        className="text-xs"
                        style={{
                          backgroundColor: `${group.color}15`,
                          color: group.color,
                          borderColor: "transparent",
                        }}
                      >
                        {group.range}
                      </Badge>
                      <BarChart3 className="h-4 w-4 text-editorial-muted" />
                    </div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{group.desc}</CardDescription>
                    <div className="mt-3 flex items-center text-sm font-medium group-hover:gap-2 gap-1 transition-all" style={{ color: group.color }}>
                      Start learning <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section Cards */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={fadeUp} custom={11} className="text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-editorial-ink mb-2">
            Explore the Academy
          </h2>
          <p className="text-editorial-muted max-w-xl mx-auto">
            Words, topics, grammar, phrases, and practice — everything you need in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((section, i) => {
            const Icon = section.icon
            return (
              <motion.div key={section.href} variants={fadeUp} custom={i + 12}>
                <Link href={section.href} className="block group">
                  <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                    <CardHeader>
                      <div
                        className="h-10 w-10 rounded-[12px] flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${section.color}15` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: section.color }} />
                      </div>
                      <CardTitle className="text-lg">{section.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{section.desc}</CardDescription>
                      <div className="mt-3 flex items-center text-sm font-medium group-hover:gap-2 gap-1 transition-all" style={{ color: section.color }}>
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Why 1000 Words */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={18}
        className="max-w-2xl mx-auto"
      >
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink mb-4">
            Why 1,000 words?
          </h2>
          <div className="space-y-3 text-editorial-muted leading-relaxed">
            <p>
              Linguists have found that the most frequent 1,000 words in any language cover
              roughly 80-85% of everyday speech. This is the Pareto principle applied to
              language learning.
            </p>
            <p>
              Instead of memorising thousands of rarely-used words, this academy focuses on
              the words that matter most — ordered by how often native speakers actually use
              them. You learn the highest-impact words first.
            </p>
            <p>
              Combined with real-life topics, essential grammar, and ready-to-use phrases,
              you will go from zero to basic conversation in months, not years.
            </p>
          </div>
        </Card>
      </motion.section>
    </div>
  )
}
