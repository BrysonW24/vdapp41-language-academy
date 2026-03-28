import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTopics } from "@/lib/content"

const LEVEL_VARIANT: Record<string, "beginner" | "intermediate" | "advanced"> = {
  beginner: "beginner",
  elementary: "intermediate",
  "pre-intermediate": "advanced",
}

export const metadata = {
  title: "Topics",
  description: "Real-life Spanish topics with dialogues, phrases, grammar, and quizzes.",
}

export default function TopicsPage() {
  const topics = getTopics()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          Topics
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Real-life situations with dialogues, key phrases, grammar, and quizzes.
          Each topic is a mini-lesson you can complete in one sitting.
        </p>
      </div>

      {topics.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">Topic content is coming soon. Check back later.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/topics/${topic.slug}`} className="block group">
              <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="flex items-center gap-2">
                      {topic.status === "coming-soon" && (
                        <Badge variant="coming-soon">Coming soon</Badge>
                      )}
                      <Badge variant={LEVEL_VARIANT[topic.level] ?? "beginner"}>
                        {topic.level}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <p className="text-sm text-editorial-muted italic">{topic.titleEs}</p>
                </CardHeader>
                <CardContent>
                  <CardDescription>{topic.shortSummary}</CardDescription>
                  <div className="mt-3 flex items-center gap-3 text-xs text-editorial-muted">
                    <span>{topic.keyPhrases.length} phrases</span>
                    <span>{topic.grammar.length} grammar</span>
                    <span>{topic.quiz.length} quiz</span>
                  </div>
                  <div
                    className="mt-3 flex items-center text-sm font-medium group-hover:gap-2 gap-1 transition-all text-editorial-green"
                  >
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
