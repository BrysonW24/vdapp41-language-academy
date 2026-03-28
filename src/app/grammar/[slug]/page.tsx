import Link from "next/link"
import { ArrowLeft, Lightbulb, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGrammarRules, getGrammarRule } from "@/lib/content"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return getGrammarRules().map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const rule = getGrammarRule(slug)
  if (!rule) return { title: "Grammar Rule" }
  return {
    title: rule.name,
    description: rule.summary,
  }
}

const LEVEL_VARIANT: Record<string, "beginner" | "intermediate" | "advanced"> = {
  beginner: "beginner",
  elementary: "intermediate",
  "pre-intermediate": "advanced",
}

const CONJUGATION_LABELS: Record<string, string> = {
  yo: "yo",
  tu: "tu",
  el: "el/ella/usted",
  nosotros: "nosotros",
  vosotros: "vosotros",
  ellos: "ellos/ellas/ustedes",
}

export default async function GrammarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const rule = getGrammarRule(slug)
  if (!rule) notFound()

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-4xl">
      {/* Back link */}
      <Link
        href="/grammar"
        className="inline-flex items-center gap-1.5 text-sm text-editorial-muted hover:text-editorial-ink transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All grammar rules
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <Badge variant={LEVEL_VARIANT[rule.level] ?? "beginner"}>
          {rule.level}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink">
          {rule.name}
        </h1>
        <p className="text-xl text-editorial-muted italic">{rule.nameEs}</p>
        <p className="text-editorial-muted text-lg leading-relaxed">{rule.summary}</p>
      </div>

      {/* Explanation */}
      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Explanation</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-editorial-muted leading-relaxed whitespace-pre-line">{rule.explanation}</p>
          </CardContent>
        </Card>
      </section>

      {/* Pattern */}
      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Pattern</h2>
        <Card className="border-l-4 border-l-editorial-blue">
          <CardContent className="p-6">
            <p className="font-mono text-lg text-editorial-ink">{rule.pattern}</p>
          </CardContent>
        </Card>
      </section>

      {/* Conjugation Table */}
      {rule.conjugation && (
        <section className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Conjugation</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(44,49,59,0.08)]">
                    <th className="text-left p-4 font-serif font-semibold text-editorial-ink">Pronoun</th>
                    <th className="text-left p-4 font-serif font-semibold text-editorial-ink">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rule.conjugation).map(([key, value]) => (
                    <tr
                      key={key}
                      className="border-b border-[rgba(44,49,59,0.04)] last:border-0 hover:bg-white/50 transition-colors"
                    >
                      <td className="p-4 text-editorial-muted">{CONJUGATION_LABELS[key] ?? key}</td>
                      <td className="p-4 font-medium text-editorial-ink">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      )}

      {/* Examples */}
      {rule.examples.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Examples</h2>
          <div className="space-y-3">
            {rule.examples.map((ex, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <p className="text-editorial-ink font-medium flex-1">{ex.es}</p>
                  <p className="text-editorial-muted flex-1">{ex.en}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      {rule.commonMistakes.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Common Mistakes</h2>
          <Card className="border-l-4 border-l-editorial-red">
            <CardContent className="p-6 space-y-3">
              {rule.commonMistakes.map((mistake, i) => (
                <div key={i} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-editorial-red flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-editorial-muted">{mistake}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Tip */}
      {rule.tip && (
        <Card className="border-l-4 border-l-editorial-green">
          <CardContent className="p-6 flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-editorial-green flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-serif font-semibold text-editorial-ink mb-1">Tip</p>
              <p className="text-editorial-muted leading-relaxed">{rule.tip}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
