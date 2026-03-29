import Link from "next/link"
import { AlertTriangle, ArrowLeft, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGrammarRule, getGrammarRules } from "@/lib/academy-content"
import { getLanguageConfig, langHref, SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/lib/languages"
import { notFound } from "next/navigation"

const LEVEL_VARIANT: Record<string, "beginner" | "intermediate" | "advanced"> = {
  beginner: "beginner",
  elementary: "intermediate",
  "pre-intermediate": "advanced",
}

const CONJUGATION_LABELS: Record<SupportedLanguage, Record<string, string>> = {
  es: {
    yo: "yo",
    tu: "tu",
    el: "el / ella / usted",
    nosotros: "nosotros",
    vosotros: "vosotros",
    ellos: "ellos / ellas / ustedes",
  },
  de: {
    ich: "ich",
    du: "du",
    er: "er / sie / es",
    wir: "wir",
    ihr: "ihr",
    sie: "sie / Sie",
  },
  zh: {},
  th: {},
}

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.flatMap((lang) =>
    getGrammarRules(lang).map((rule) => ({ lang, slug: rule.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const language = getLanguageConfig(lang)
  const rule = language ? getGrammarRule(language.code, slug) : null

  if (!rule) return { title: "Grammar Rule" }

  return {
    title: `${rule.name} | ${language?.name ?? "Academy"}`,
    description: rule.summary,
  }
}

export default async function GrammarDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const language = getLanguageConfig(lang)

  if (!language) notFound()

  const rule = getGrammarRule(language.code, slug)
  if (!rule) notFound()

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-4xl">
      <Link
        href={langHref(language.code, "grammar")}
        className="inline-flex items-center gap-1.5 text-sm text-editorial-muted hover:text-editorial-ink transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All grammar rules
      </Link>

      <div className="space-y-3">
        <Badge variant={LEVEL_VARIANT[rule.level] ?? "beginner"}>{rule.level}</Badge>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink">{rule.name}</h1>
        {rule.nativeName !== rule.name && (
          <p className="text-xl text-editorial-muted italic">{rule.nativeName}</p>
        )}
        <p className="text-editorial-muted text-lg leading-relaxed">{rule.summary}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Explanation</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-editorial-muted leading-relaxed whitespace-pre-line">{rule.explanation}</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Pattern</h2>
        <Card className="border-l-4 border-l-editorial-blue">
          <CardContent className="p-6">
            <p className="font-mono text-lg text-editorial-ink">{rule.pattern}</p>
          </CardContent>
        </Card>
      </section>

      {rule.tones && (
        <section className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Tone Notes</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-editorial-muted leading-relaxed">{rule.tones}</p>
            </CardContent>
          </Card>
        </section>
      )}

      {rule.conjugation && (
        <section className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Forms</h2>
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
                      key={`${rule.slug}-${key}`}
                      className="border-b border-[rgba(44,49,59,0.04)] last:border-0 hover:bg-white/50 transition-colors"
                    >
                      <td className="p-4 text-editorial-muted">
                        {CONJUGATION_LABELS[language.code][key] ?? key}
                      </td>
                      <td className="p-4 font-medium text-editorial-ink">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      )}

      {rule.cases && (
        <section className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Cases</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(44,49,59,0.08)]">
                    <th className="text-left p-4 font-serif font-semibold text-editorial-ink">Case</th>
                    <th className="text-left p-4 font-serif font-semibold text-editorial-ink">Pattern</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rule.cases).map(([key, value]) => (
                    <tr
                      key={`${rule.slug}-case-${key}`}
                      className="border-b border-[rgba(44,49,59,0.04)] last:border-0 hover:bg-white/50 transition-colors"
                    >
                      <td className="p-4 capitalize text-editorial-muted">{key}</td>
                      <td className="p-4 font-medium text-editorial-ink">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      )}

      {rule.examples.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Examples</h2>
          <div className="space-y-3">
            {rule.examples.map((example, index) => (
              <Card key={`${rule.slug}-example-${index}`}>
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <p className="text-editorial-ink font-medium flex-1">{example.native}</p>
                  <p className="text-editorial-muted flex-1">{example.en}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {rule.commonMistakes.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-editorial-ink">Common Mistakes</h2>
          <Card className="border-l-4 border-l-editorial-red">
            <CardContent className="p-6 space-y-3">
              {rule.commonMistakes.map((mistake, index) => (
                <div key={`${rule.slug}-mistake-${index}`} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-editorial-red flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-editorial-muted">{mistake}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}

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
