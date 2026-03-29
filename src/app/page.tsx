import Link from "next/link"
import { ArrowRight, BookOpen, Globe, Languages, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAcademyStats } from "@/lib/academy-content"
import { getLanguageConfig, langHref, SUPPORTED_LANGUAGES } from "@/lib/languages"

export const metadata = {
  title: "Choose a Language",
  description: "Pick a language and enter the shared academy experience.",
}

const LANGUAGE_ACCENTS: Record<string, string> = {
  es: "#386a58",
  zh: "#a0453f",
  de: "#2f4f79",
  th: "#a16a1f",
}

export default function HomePage() {
  const languages = SUPPORTED_LANGUAGES.map((code) => ({
    ...getLanguageConfig(code)!,
    stats: getAcademyStats(code),
    accent: LANGUAGE_ACCENTS[code] ?? "#386a58",
  }))

  return (
    <div className="container mx-auto px-4 py-8 space-y-14">
      <section className="max-w-3xl pt-8 space-y-4">
        <Badge variant="default">One app, multiple academies</Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-editorial-ink leading-tight tracking-tight">
          Choose the language you want to learn
        </h1>
        <p className="text-lg sm:text-xl text-editorial-muted leading-relaxed max-w-2xl">
          Pick a track and we will drop you into the full academy experience with words, topics, grammar, phrases, and practice.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {languages.map((language) => {
          const totalUnits =
            language.stats.words + language.stats.topics + language.stats.grammar + language.stats.phrases

          return (
            <Link key={language.code} href={langHref(language.code)} className="block group">
              <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] mb-4"
                        style={{ backgroundColor: `${language.accent}15` }}
                      >
                        <span className="font-serif text-sm font-semibold" style={{ color: language.accent }}>
                          {language.shortCode}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{language.name}</CardTitle>
                      <p className="text-sm text-editorial-muted italic mt-1">{language.nativeName}</p>
                    </div>
                    <Badge variant="secondary">{totalUnits} items</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{language.description}</CardDescription>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/60 p-3">
                      <p className="text-editorial-muted">Words</p>
                      <p className="font-serif text-xl text-editorial-ink">{language.stats.words}</p>
                    </div>
                    <div className="rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/60 p-3">
                      <p className="text-editorial-muted">Topics</p>
                      <p className="font-serif text-xl text-editorial-ink">{language.stats.topics}</p>
                    </div>
                    <div className="rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/60 p-3">
                      <p className="text-editorial-muted">Grammar</p>
                      <p className="font-serif text-xl text-editorial-ink">{language.stats.grammar}</p>
                    </div>
                    <div className="rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/60 p-3">
                      <p className="text-editorial-muted">Phrases</p>
                      <p className="font-serif text-xl text-editorial-ink">{language.stats.phrases}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2" style={{ color: language.accent }}>
                    Enter {language.name} academy <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: BookOpen,
            title: "Frequency-first words",
            text: "Start with the highest-impact vocabulary before branching into nuance.",
          },
          {
            icon: Globe,
            title: "Real-world topics",
            text: "Move from isolated words into useful situations, dialogue, and quizzes.",
          },
          {
            icon: Languages,
            title: "Easy switching",
            text: "Use the header switcher anywhere in the app to jump languages while keeping your section when possible.",
          },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title}>
              <CardContent className="p-5 space-y-3">
                <div className="h-10 w-10 rounded-[12px] bg-editorial-green/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-editorial-green" />
                </div>
                <h2 className="font-serif text-xl font-semibold text-editorial-ink">{item.title}</h2>
                <p className="text-sm text-editorial-muted leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
