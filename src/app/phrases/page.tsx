import Link from "next/link"
import { ArrowRight, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPhrasePacks } from "@/lib/content"

export const metadata = {
  title: "Phrases",
  description: "Ready-to-use Spanish phrase packs for common real-life situations.",
}

export default function PhrasesPage() {
  const packs = getPhrasePacks()

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          Phrase Packs
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Ready-to-use phrases organised by situation. Learn these and you will be able
          to navigate real-life conversations with confidence.
        </p>
      </div>

      {packs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-editorial-muted">Phrase pack content is coming soon. Check back later.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packs.map((pack) => (
            <Link key={pack.slug} href={`/phrases/${pack.slug}`} className="block group">
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
                  <div className="mt-3 flex items-center text-sm font-medium group-hover:gap-2 gap-1 transition-all text-editorial-amber">
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
