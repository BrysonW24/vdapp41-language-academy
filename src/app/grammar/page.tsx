import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGrammarRules } from "@/lib/content"

const LEVEL_VARIANT: Record<string, "beginner" | "intermediate" | "advanced"> = {
  beginner: "beginner",
  elementary: "intermediate",
  "pre-intermediate": "advanced",
}

export const metadata = {
  title: "Grammar",
  description: "Essential Spanish grammar rules with patterns, conjugations, and examples.",
}

export default function GrammarPage() {
  const rules = getGrammarRules()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          Grammar
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Essential grammar rules to structure your Spanish. Each rule includes patterns,
          examples, conjugation tables, and common mistakes to avoid.
        </p>
      </div>

      {rules.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">Grammar content is coming soon. Check back later.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rules.map((rule) => (
            <Link key={rule.slug} href={`/grammar/${rule.slug}`} className="block group">
              <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={LEVEL_VARIANT[rule.level] ?? "beginner"}>
                      {rule.level}
                    </Badge>
                    <span className="text-xs text-editorial-muted">#{rule.order}</span>
                  </div>
                  <CardTitle className="text-lg">{rule.name}</CardTitle>
                  <p className="text-sm text-editorial-muted italic">{rule.nameEs}</p>
                </CardHeader>
                <CardContent>
                  <CardDescription>{rule.summary}</CardDescription>
                  <div className="mt-3 flex items-center gap-3 text-xs text-editorial-muted">
                    <span>{rule.examples.length} examples</span>
                    {rule.conjugation && <span>Conjugation table</span>}
                  </div>
                  <div className="mt-3 flex items-center text-sm font-medium group-hover:gap-2 gap-1 transition-all text-editorial-green">
                    Study rule <ArrowRight className="h-3.5 w-3.5" />
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
