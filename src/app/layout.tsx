import type { Metadata } from "next"
import { Navigation } from "@/components/academy/layout/Navigation"
import { Footer } from "@/components/academy/layout/Footer"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Spanish Academy",
    template: "%s | Spanish Academy",
  },
  description:
    "Learn Spanish with 1,000 carefully chosen words. A visual, content-driven academy using the Pareto principle to get you conversational fast.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col relative z-[1]">
        <Navigation />
        <div className="h-[60px] sm:h-[80px]" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
