import Link from "next/link"
import { GraduationCap, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Practice",
  description: "Interactive practice exercises for Spanish learning.",
}

export default function PracticePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          Practice
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          Interactive exercises to reinforce what you have learned.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="p-8 text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-editorial-green-soft flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-editorial-green" />
          </div>
          <Badge variant="coming-soon">Coming soon</Badge>
          <h2 className="text-xl font-serif font-semibold text-editorial-ink">
            Practice exercises coming soon
          </h2>
          <p className="text-editorial-muted leading-relaxed">
            Dedicated practice exercises are on the way. In the meantime, each topic has a
            built-in quiz you can use to test your knowledge right now.
          </p>
          <Link
            href="/topics"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-editorial-green hover:gap-2.5 transition-all"
          >
            Browse topics with quizzes <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
