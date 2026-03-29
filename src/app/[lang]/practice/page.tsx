import Link from "next/link"
import { ArrowRight, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAcademyStats } from "@/lib/academy-content"
import { getLanguageConfig, langHref, SUPPORTED_LANGUAGES } from "@/lib/languages"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  return {
    title: language ? `${language.name} Practice` : "Practice",
    description: language
      ? `Interactive practice exercises for ${language.learningName} learning.`
      : "Interactive practice exercises.",
  }
}

export default async function PracticePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  if (!language) notFound()

  const stats = getAcademyStats(language.code)
  const ctaHref = stats.topics > 0 ? langHref(language.code, "topics") : langHref(language.code, "words")
  const ctaLabel = stats.topics > 0 ? "Browse topics with quizzes" : "Start with your highest-frequency words"

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          {language.name} Practice
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Reinforcement activities, drills, and review loops for what you have learned.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="p-8 text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-editorial-green-soft flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-editorial-green" />
          </div>
          <Badge variant="coming-soon">Coming soon</Badge>
          <h2 className="text-xl font-serif font-semibold text-editorial-ink">Dedicated practice is coming next</h2>
          <p className="text-editorial-muted leading-relaxed">
            The unified app is ready for drills and spaced review. Right now, the best path is to learn words and use topic quizzes where they exist.
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-editorial-green hover:gap-2.5 transition-all"
          >
            {ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
