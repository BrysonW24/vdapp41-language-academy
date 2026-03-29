import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGrammarRules } from "@/lib/academy-content"
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
    title: language ? `${language.name} Grammar` : "Grammar",
    description: language
      ? `Essential ${language.learningName} grammar rules with patterns, examples, and learning notes.`
      : "Essential grammar rules.",
  }
}

export default async function GrammarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  if (!language) notFound()

  const rules = getGrammarRules(language.code)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          {language.name} Grammar
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Essential rules, patterns, and examples to help your vocabulary turn into real sentences.
        </p>
      </div>

      {rules.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">
            Grammar content for {language.name} is still being added. Start with the word ladder for now.
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
          {rules.map((rule) => (
            <Link key={`${language.code}-${rule.slug}`} href={langHref(language.code, `grammar/${rule.slug}`)} className="block group">
              <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={LEVEL_VARIANT[rule.level] ?? "beginner"}>{rule.level}</Badge>
                    <span className="text-xs text-editorial-muted">#{rule.order}</span>
                  </div>
                  <CardTitle className="text-lg">{rule.name}</CardTitle>
                  {rule.nativeName !== rule.name && (
                    <p className="text-sm text-editorial-muted italic">{rule.nativeName}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription>{rule.summary}</CardDescription>
                  <div className="mt-3 flex items-center gap-3 text-xs text-editorial-muted">
                    <span>{rule.examples.length} examples</span>
                    {rule.conjugation && <span>Forms</span>}
                    {rule.cases && <span>Cases</span>}
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-editorial-green transition-all group-hover:gap-2">
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
