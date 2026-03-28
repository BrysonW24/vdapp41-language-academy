import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getWords } from "@/lib/content"
import { WORD_GROUPS } from "@/types/curriculum"

export const metadata = {
  title: "1000 Words",
  description: "Master the 1,000 most frequent Spanish words, organised by the Pareto Ladder.",
}

export default function WordsPage() {
  const allWords = getWords()

  const groupCounts = WORD_GROUPS.map((group) => ({
    ...group,
    count: allWords.filter((w) => w.group === group.id).length,
  }))

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          The 1,000 Words
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Five groups ordered by frequency. Master these and you will understand 80% of everyday Spanish.
        </p>
      </div>

      {allWords.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">Word content is coming soon. Check back later.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupCounts.map((group) => (
            <Link key={group.id} href={`/words/${group.id}`} className="block group/card">
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
                    className="mt-3 flex items-center text-sm font-medium group-hover/card:gap-2 gap-1 transition-all"
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
          <strong className="text-editorial-ink">Total loaded:</strong> {allWords.length} of 1,000 words.
          Words are added progressively as content is authored.
        </p>
      </Card>
    </div>
  )
}
