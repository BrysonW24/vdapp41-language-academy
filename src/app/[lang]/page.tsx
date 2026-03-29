import Link from "next/link"
import { ArrowRight, BookOpen, Globe, GraduationCap, Languages, Layers, MessageSquare, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAcademyStats, getWords } from "@/lib/academy-content"
import { getLanguageConfig, langHref, SUPPORTED_LANGUAGES } from "@/lib/languages"
import { TARGET_COUNTS, WORD_GROUPS } from "@/types/academy"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  if (!language) {
    return { title: "Academy" }
  }

  return {
    title: language.academyName,
    description: language.description,
  }
}

export default async function LanguageHomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  if (!language) notFound()

  const stats = getAcademyStats(language.code)
  const words = getWords(language.code)
  const groupCounts = WORD_GROUPS.map((group) => ({
    ...group,
    count: words.filter((word) => word.group === group.id).length,
  }))

  const sections = [
    {
      href: langHref(language.code, "words"),
      label: "1000 Words",
      desc: `Frequency-ranked vocabulary with ${stats.words} loaded so far.`,
      icon: BookOpen,
      color: "#386a58",
    },
    {
      href: langHref(language.code, "topics"),
      label: "Topics",
      desc: `${stats.topics} topic lesson${stats.topics === 1 ? "" : "s"} currently available.`,
      icon: Globe,
      color: "#2f4f79",
    },
    {
      href: langHref(language.code, "grammar"),
      label: "Grammar",
      desc: `${stats.grammar} grammar rule${stats.grammar === 1 ? "" : "s"} currently available.`,
      icon: Languages,
      color: "#6d28d9",
    },
    {
      href: langHref(language.code, "phrases"),
      label: "Phrases",
      desc: `${stats.phrases} phrase pack${stats.phrases === 1 ? "" : "s"} currently available.`,
      icon: MessageSquare,
      color: "#a16a1f",
    },
    {
      href: langHref(language.code, "practice"),
      label: "Practice",
      desc: "Quizzes, drills, and reinforcement activities.",
      icon: GraduationCap,
      color: "#a0453f",
    },
  ]

  const otherLanguages = SUPPORTED_LANGUAGES.filter((code) => code !== language.code).map(
    (code) => ({
      ...getLanguageConfig(code)!,
      stats: getAcademyStats(code),
    })
  )

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="max-w-3xl space-y-4 pt-8">
        <Badge variant="default">Unified academy</Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-editorial-ink leading-tight tracking-tight">
          Learn {language.learningName} with <span className="text-editorial-green">1,000 Words</span>
        </h1>
        <p className="text-lg sm:text-xl text-editorial-muted leading-relaxed max-w-2xl">
          {language.description}
        </p>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
        {[
          { label: "Words", value: `${stats.words}/${TARGET_COUNTS.words}`, icon: BookOpen, color: "#386a58" },
          { label: "Groups", value: String(WORD_GROUPS.length), icon: Layers, color: "#2f4f79" },
          { label: "Topics", value: `${stats.topics}/${TARGET_COUNTS.topics}`, icon: Globe, color: "#6d28d9" },
          { label: "Target Level", value: "A1-A2", icon: Target, color: "#a16a1f" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="text-center p-4">
              <div
                className="mx-auto h-10 w-10 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-serif font-semibold text-editorial-ink">{stat.value}</p>
              <p className="text-sm text-editorial-muted">{stat.label}</p>
            </Card>
          )
        })}
      </section>

      {stats.words < TARGET_COUNTS.words && (
        <Card className="max-w-3xl border-l-4 border-l-editorial-amber">
          <CardContent className="p-6 space-y-2">
            <p className="font-serif font-semibold text-editorial-ink">Current import status</p>
            <p className="text-editorial-muted leading-relaxed">
              {language.name} currently has {stats.words} of {TARGET_COUNTS.words} words loaded in the unified app.
              The shared structure is ready, so we can keep filling content without touching the UI again.
            </p>
          </CardContent>
        </Card>
      )}

      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-editorial-ink mb-2">
            The Pareto Ladder
          </h2>
          <p className="text-editorial-muted">
            Five frequency-based word groups that take you from survival language to confident expression.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupCounts.map((group) => (
            <Link key={group.id} href={langHref(language.code, `words/${group.id}`)} className="block group">
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
                    <span className="text-xs text-editorial-muted">{group.count} loaded</span>
                  </div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{group.desc}</CardDescription>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2" style={{ color: group.color }}>
                    Start learning <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-editorial-ink mb-2">
            Explore the Academy
          </h2>
          <p className="text-editorial-muted">
            Words, topics, grammar, phrases, and practice all run from the same shared app now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.href} href={section.href} className="block group">
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
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2" style={{ color: section.color }}>
                      Explore <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-editorial-ink mb-2">
            Switch Languages
          </h2>
          <p className="text-editorial-muted">
            The same academy structure now supports multiple languages from one deploy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherLanguages.map((item) => (
            <Link key={item.code} href={langHref(item.code)} className="block group">
              <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <p className="text-sm text-editorial-muted italic">{item.nativeName}</p>
                    </div>
                    <Badge variant="secondary">{item.shortCode}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription>{item.description}</CardDescription>
                  <p className="text-sm text-editorial-muted">
                    {item.stats.words} words, {item.stats.topics} topics, {item.stats.grammar} grammar, {item.stats.phrases} phrase packs
                  </p>
                  <div className="flex items-center gap-1 text-sm font-medium text-editorial-green transition-all group-hover:gap-2">
                    Open academy <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
