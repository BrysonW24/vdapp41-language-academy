import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getWords } from "@/lib/academy-content"
import { getLanguageConfig, langHref, SUPPORTED_LANGUAGES } from "@/lib/languages"
import { TARGET_COUNTS, WORD_GROUPS } from "@/types/academy"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  return {
    title: language ? `${language.name} Words` : "Words",
    description: language
      ? `Master the 1,000 most frequent ${language.learningName} words, organised by the Pareto Ladder.`
      : "Master the most frequent words.",
  }
}

export default async function WordsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  if (!language) notFound()

  const allWords = getWords(language.code)
  const groupCounts = WORD_GROUPS.map((group) => ({
    ...group,
    count: allWords.filter((word) => word.group === group.id).length,
  }))

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          {language.name} Words
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Five frequency-ranked groups. Learn these in order and you cover the highest-impact vocabulary first.
        </p>
      </div>

      {allWords.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">
            Word content for {language.name} is coming soon. The shared structure is already in place.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupCounts.map((group) => (
            <Link key={group.id} href={langHref(language.code, `words/${group.id}`)} className="block group/card">
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
                      Words {group.range}
                    </Badge>
                    <span className="text-sm text-editorial-muted">
                      {group.count} word{group.count !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{group.desc}</CardDescription>
                  <div
                    className="mt-3 flex items-center gap-1 text-sm font-medium transition-all group-hover/card:gap-2"
                    style={{ color: group.color }}
                  >
                    View words <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Card className="p-6 max-w-2xl">
        <p className="text-sm text-editorial-muted leading-relaxed">
          <strong className="text-editorial-ink">Loaded:</strong> {allWords.length} of {TARGET_COUNTS.words} words for {language.name}.
        </p>
      </Card>
    </div>
  )
}
