import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Timeline",
  description: "A 3-month roadmap from zero to basic Spanish conversation.",
}

export default function TimelinePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-editorial-ink mb-2">
          Your Timeline
        </h1>
        <p className="text-editorial-muted text-lg leading-relaxed">
          A structured 3-month roadmap from zero to basic conversation.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="p-8 text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-editorial-blue-soft flex items-center justify-center">
            <Clock className="h-8 w-8 text-editorial-blue" />
          </div>
          <Badge variant="coming-soon">Coming soon</Badge>
          <h2 className="text-xl font-serif font-semibold text-editorial-ink">
            3-month roadmap coming soon
          </h2>
          <p className="text-editorial-muted leading-relaxed">
            A week-by-week plan that takes you from zero to basic conversation.
            Start with the Essential 50 words and your first topic while this page is being built.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
