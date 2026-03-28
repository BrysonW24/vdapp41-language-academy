import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPhrasePacks, getPhrasePack } from "@/lib/content"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return getPhrasePacks().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const pack = getPhrasePack(slug)
  if (!pack) return { title: "Phrase Pack" }
  return {
    title: pack.title,
    description: pack.description,
  }
}

const FORMALITY_STYLES: Record<string, { variant: "beginner" | "intermediate" | "outline"; label: string }> = {
  formal: { variant: "intermediate", label: "Formal" },
  informal: { variant: "beginner", label: "Informal" },
  neutral: { variant: "outline", label: "Neutral" },
}

export default async function PhrasePackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const pack = getPhrasePack(slug)
  if (!pack) notFound()

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-4xl">
      {/* Back link */}
      <Link
        href="/phrases"
        className="inline-flex items-center gap-1.5 text-sm text-editorial-muted hover:text-editorial-ink transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All phrase packs
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink">
          {pack.title}
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">{pack.description}</p>
        <Badge variant="secondary">{pack.situation}</Badge>
      </div>

      {/* Phrases */}
      <div className="space-y-4">
        {pack.phrases.map((phrase, i) => {
          const formality = FORMALITY_STYLES[phrase.formality] ?? FORMALITY_STYLES.neutral
          return (
            <Card key={i} className="hover:shadow-editorial-hover transition-all duration-200">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-serif font-semibold text-editorial-ink">
                      {phrase.spanish}
                    </p>
                    <p className="text-base text-editorial-muted mt-1">{phrase.english}</p>
                  </div>
                  <Badge variant={formality.variant} className="flex-shrink-0">
                    {formality.label}
                  </Badge>
                </div>

                <p className="text-sm text-editorial-muted italic">/{phrase.pronunciation}/</p>

                {phrase.tip && (
                  <div className="p-3 rounded-[12px] bg-editorial-green-soft/40">
                    <p className="text-sm text-editorial-green">
                      <strong>Tip:</strong> {phrase.tip}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
