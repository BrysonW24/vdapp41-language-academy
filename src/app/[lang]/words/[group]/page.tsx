import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getWordsByGroup } from "@/lib/academy-content"
import { getLanguageConfig, langHref, SUPPORTED_LANGUAGES } from "@/lib/languages"
import { WORD_GROUPS } from "@/types/academy"
import { notFound } from "next/navigation"

const POS_COLORS: Record<string, string> = {
  noun: "#2f4f79",
  verb: "#386a58",
  adjective: "#6d28d9",
  adverb: "#a16a1f",
  preposition: "#65655f",
  pronoun: "#a0453f",
  conjunction: "#65655f",
  article: "#65655f",
  interjection: "#a16a1f",
  number: "#2f4f79",
  particle: "#a16a1f",
  "measure-word": "#2f4f79",
  auxiliary: "#65655f",
}

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((lang) => WORD_GROUPS.map((group) => ({ lang, group: group.id })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; group: string }>
}) {
  const { lang, group: groupId } = await params
  const language = getLanguageConfig(lang)
  const group = WORD_GROUPS.find((item) => item.id === groupId)

  if (!language || !group) return { title: "Words" }

  return {
    title: `${language.name} ${group.name}`,
    description: group.desc,
  }
}

export default async function WordGroupPage({
  params,
}: {
  params: Promise<{ lang: string; group: string }>
}) {
  const { lang, group: groupId } = await params
  const language = getLanguageConfig(lang)
  const group = WORD_GROUPS.find((item) => item.id === groupId)

  if (!language || !group) notFound()

  const words = getWordsByGroup(language.code, groupId)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <Link
          href={langHref(language.code, "words")}
          className="inline-flex items-center gap-1.5 text-sm text-editorial-muted hover:text-editorial-ink transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All word groups
        </Link>

        <div className="flex items-center gap-3 mb-2">
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
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          {language.name} {group.name}
        </h1>
        <p className="text-editorial-muted text-lg">{group.desc}</p>
      </div>

      {words.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">Words for this group are coming soon.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {words.map((word) => {
            const displayTerm = word.article ? `${word.article} ${word.term}` : word.term

            return (
              <Card key={`${language.code}-${word.rank}`} className="hover:shadow-editorial-hover transition-all duration-200">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${group.color}12`,
                        color: group.color,
                      }}
                    >
                      #{word.rank}
                    </span>
                    <div className="flex items-center gap-2">
                      {word.gender && (
                        <Badge variant="outline" className="text-[10px]">
                          {word.gender}
                        </Badge>
                      )}
                      <Badge
                        className="text-[10px]"
                        style={{
                          backgroundColor: `${POS_COLORS[word.partOfSpeech] ?? "#65655f"}12`,
                          color: POS_COLORS[word.partOfSpeech] ?? "#65655f",
                          borderColor: "transparent",
                        }}
                      >
                        {word.partOfSpeech}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-2xl font-serif font-semibold text-editorial-ink">{displayTerm}</p>
                    {word.secondary && <p className="text-sm text-editorial-muted">{word.secondary}</p>}
                    {word.transliteration && <p className="text-sm text-editorial-muted italic">{word.transliteration}</p>}
                    <p className="text-base text-editorial-muted mt-1">{word.english}</p>
                  </div>

                  {word.pronunciation && (
                    <p className="text-sm text-editorial-muted italic">/{word.pronunciation}/</p>
                  )}

                  <div className="pt-2 border-t border-[rgba(44,49,59,0.06)] space-y-1">
                    <p className="text-sm text-editorial-ink">{word.exampleNative}</p>
                    <p className="text-sm text-editorial-muted">{word.exampleEn}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
