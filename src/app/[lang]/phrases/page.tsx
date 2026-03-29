import Link from "next/link"
import { ArrowRight, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPhrasePacks } from "@/lib/academy-content"
import { getLanguageConfig, langHref, SUPPORTED_LANGUAGES } from "@/lib/languages"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  return {
    title: language ? `${language.name} Phrases` : "Phrases",
    description: language
      ? `Ready-to-use ${language.learningName} phrase packs for common situations.`
      : "Ready-to-use phrase packs.",
  }
}

export default async function PhrasesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  if (!language) notFound()

  const packs = getPhrasePacks(language.code)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          {language.name} Phrase Packs
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Ready-to-use phrases for common real-life situations and travel moments.
        </p>
      </div>

      {packs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">
            Phrase packs for {language.name} are still on the way. Start with high-frequency words for now.
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
          {packs.map((pack) => (
            <Link key={`${language.code}-${pack.slug}`} href={langHref(language.code, `phrases/${pack.slug}`)} className="block group">
              <Card className="h-full hover:shadow-editorial-hover hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <MessageSquare className="h-5 w-5 text-editorial-amber" />
                    <span className="text-xs text-editorial-muted">
                      {pack.phrases.length} phrase{pack.phrases.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{pack.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{pack.description}</CardDescription>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {pack.situation}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-editorial-amber transition-all group-hover:gap-2">
                    View phrases <ArrowRight className="h-3.5 w-3.5" />
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
