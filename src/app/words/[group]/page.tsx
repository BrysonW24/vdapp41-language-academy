import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getWordsByGroup } from "@/lib/content"
import { WORD_GROUPS } from "@/types/curriculum"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return WORD_GROUPS.map((g) => ({ group: g.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }) {
  const { group: groupId } = await params; const group = WORD_GROUPS.find((g) => g.id === groupId)
  if (!group) return { title: "Words" }
  return {
    title: group.name,
    description: group.desc,
  }
}

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
}

export default async function WordGroupPage({ params }: { params: Promise<{ group: string }> }) {
  const { group: groupId } = await params; const group = WORD_GROUPS.find((g) => g.id === groupId)
  if (!group) notFound()

  const words = getWordsByGroup(groupId)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <Link
          href="/words"
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
          {group.name}
        </h1>
        <p className="text-editorial-muted text-lg">{group.desc}</p>
      </div>

      {words.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">
            Words for this group are coming soon. Check back later.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {words.map((word) => (
            <Card key={word.rank} className="hover:shadow-editorial-hover transition-all duration-200">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${group.color}12`,
                      color: group.color,
                    }}
                  >
                    #{word.rank}
                  </span>
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

                <div>
                  <p className="text-2xl font-serif font-semibold text-editorial-ink">
                    {word.spanish}
                  </p>
                  <p className="text-base text-editorial-muted">{word.english}</p>
                </div>

                <p className="text-sm text-editorial-muted italic">/{word.pronunciation}/</p>

                <div className="pt-2 border-t border-[rgba(44,49,59,0.06)] space-y-1">
                  <p className="text-sm text-editorial-ink">{word.exampleEs}</p>
                  <p className="text-sm text-editorial-muted">{word.exampleEn}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
