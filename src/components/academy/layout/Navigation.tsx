"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Compass,
  BookOpen,
  Globe,
  Languages,
  MessageSquare,
  GraduationCap,
  Clock,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"

const MAIN_NAV = [
  { href: "/", label: "Start", icon: Compass },
  { href: "/words", label: "1000 Words", icon: BookOpen },
  { href: "/topics", label: "Topics", icon: Globe },
  { href: "/grammar", label: "Grammar", icon: Languages },
  { href: "/phrases", label: "Phrases", icon: MessageSquare },
  { href: "/practice", label: "Practice", icon: GraduationCap },
]

const MORE_PAGES = [
  { href: "/timeline", label: "Your Timeline", icon: Clock },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const isMoreActive = MORE_PAGES.some((item) => pathname.startsWith(item.href))

  return (
    <header className="fixed top-0 left-0 right-0 sm:top-[18px] sm:left-[18px] sm:right-[18px] z-50 rounded-none sm:rounded-[18px] border-b sm:border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.78)] backdrop-blur-[16px] shadow-editorial-soft">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-[10px] bg-editorial-green flex items-center justify-center">
            <span className="text-white text-sm font-bold font-serif">ES</span>
          </div>
          <span className="hidden sm:inline font-serif text-lg font-semibold text-editorial-ink">
            Spanish Academy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {MAIN_NAV.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                  isActive
                    ? "text-editorial-ink bg-white/80 border border-[rgba(44,49,59,0.1)] shadow-sm"
                    : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            )
          })}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                isMoreActive
                  ? "text-editorial-ink bg-white/80 border border-[rgba(44,49,59,0.1)] shadow-sm"
                  : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
              )}
            >
              More
              <ChevronDown className={cn("h-3 w-3 transition-transform", moreOpen && "rotate-180")} />
            </button>
            {moreOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.95)] backdrop-blur-[20px] shadow-editorial p-2 space-y-0.5">
                  {MORE_PAGES.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm transition-all duration-200",
                          isActive
                            ? "text-editorial-ink bg-white/80 shadow-sm"
                            : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-[10px] hover:bg-white/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[rgba(44,49,59,0.08)] p-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted px-3 py-1">Learn</p>
          {MAIN_NAV.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm transition-all duration-200",
                  isActive
                    ? "text-editorial-ink bg-white/74 shadow-sm"
                    : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
          <div className="h-px bg-[rgba(44,49,59,0.08)] mx-3 my-2" />
          <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted px-3 py-1">More</p>
          {MORE_PAGES.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm transition-all duration-200",
                  isActive
                    ? "text-editorial-ink bg-white/74 shadow-sm"
                    : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
