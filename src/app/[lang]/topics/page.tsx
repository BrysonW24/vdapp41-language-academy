import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTopics } from "@/lib/academy-content"
import { getLanguageConfig, langHref, SUPPORTED_LANGUAGES } from "@/lib/languages"
import { notFound } from "next/navigation"

const LEVEL_VARIANT: Record<string, "beginner" | "intermediate" | "advanced"> = {
  beginner: "beginner",
  elementary: "intermediate",
  "pre-intermediate": "advanced",
}

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  return {
    title: language ? `${language.name} Topics` : "Topics",
    description: language
      ? `Real-life ${language.learningName} topics with dialogues, phrases, grammar, and quizzes.`
      : "Real-life topic lessons.",
  }
}

export default async function TopicsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  if (!language) notFound()

  const topics = getTopics(language.code)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          {language.name} Topics
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Real-life situations with dialogue, useful phrases, grammar, and quizzes.
        </p>
      </div>

      {topics.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">
            Topic content for {language.name} is still being added. Start with the frequency word lists for now.
          </p>
          <Link
            href={langHref(language.code, "words")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-editorial-green hover:gap-2.5 transition-all mt-4"
          >
            Browse words <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Link key={`${language.code}-${topic.slug}`} href={langHref(language.code, `topics/${topic.slug}`)} className="block group">
              <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="flex items-center gap-2">
                      {topic.status === "coming-soon" && <Badge variant="coming-soon">Coming soon</Badge>}
                      <Badge variant={LEVEL_VARIANT[topic.level] ?? "beginner"}>{topic.level}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  {topic.nativeTitle !== topic.title && (
                    <p className="text-sm text-editorial-muted italic">{topic.nativeTitle}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription>{topic.shortSummary}</CardDescription>
                  <div className="mt-3 flex items-center gap-3 text-xs text-editorial-muted">
                    <span>{topic.keyPhrases.length} phrases</span>
                    <span>{topic.grammar.length} grammar</span>
                    <span>{topic.quiz.length} quiz</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-editorial-green transition-all group-hover:gap-2">
                    Study topic <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
