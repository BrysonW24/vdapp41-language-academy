import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLanguageConfig, SUPPORTED_LANGUAGES } from "@/lib/languages"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  return {
    title: language ? `${language.name} Timeline` : "Timeline",
    description: language
      ? `A roadmap from zero to practical ${language.learningName} communication.`
      : "A learning roadmap.",
  }
}

export default async function TimelinePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const language = getLanguageConfig(lang)

  if (!language) notFound()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          {language.name} Timeline
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          A structured path from first words to confident everyday communication.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="p-8 text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-editorial-blue-soft flex items-center justify-center">
            <Clock className="h-8 w-8 text-editorial-blue" />
          </div>
          <Badge variant="coming-soon">Coming soon</Badge>
          <h2 className="text-xl font-serif font-semibold text-editorial-ink">Roadmap builder coming soon</h2>
          <p className="text-editorial-muted leading-relaxed">
            The shared app is ready for language-specific study plans. Next we can map words, topics, grammar, and practice into a single guided timeline.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
