export const SUPPORTED_LANGUAGES = ["es", "zh", "de", "th"] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export interface LanguageConfig {
  code: SupportedLanguage
  name: string
  nativeName: string
  shortCode: string
  learningName: string
  scriptLabel: string
  academyName: string
  description: string
}

export const DEFAULT_LANGUAGE: SupportedLanguage = "es"

export const LANGUAGE_CONFIG: Record<SupportedLanguage, LanguageConfig> = {
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Espanol",
    shortCode: "ES",
    learningName: "Spanish",
    scriptLabel: "Spanish",
    academyName: "Spanish Academy",
    description: "Build practical Spanish with 1,000 high-frequency words and real-world lessons.",
  },
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    shortCode: "ZH",
    learningName: "Mandarin Chinese",
    scriptLabel: "Chinese",
    academyName: "Chinese Academy",
    description: "Build practical Mandarin with high-frequency vocabulary and everyday situations.",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    shortCode: "DE",
    learningName: "German",
    scriptLabel: "German",
    academyName: "German Academy",
    description: "Build practical German through frequency-ranked vocabulary and useful phrase packs.",
  },
  th: {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    shortCode: "TH",
    learningName: "Thai",
    scriptLabel: "Thai",
    academyName: "Thai Academy",
    description: "A Thai track is ready in the unified academy structure and waiting for curriculum content.",
  },
}

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)
}

export function getLanguageConfig(value: string): LanguageConfig | null {
  return isSupportedLanguage(value) ? LANGUAGE_CONFIG[value] : null
}

export function pathnameHasLanguage(pathname: string): boolean {
  const [firstSegment] = pathname.split("/").filter(Boolean)
  return !!firstSegment && isSupportedLanguage(firstSegment)
}

export function getLanguageFromPathname(pathname: string): SupportedLanguage {
  const [firstSegment] = pathname.split("/").filter(Boolean)
  return firstSegment && isSupportedLanguage(firstSegment) ? firstSegment : DEFAULT_LANGUAGE
}

export function getPathWithoutLanguage(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments[0] && isSupportedLanguage(segments[0])) {
    return segments.slice(1).join("/")
  }
  return segments.join("/")
}

export function langHref(language: SupportedLanguage, path = ""): string {
  const cleanPath = path.replace(/^\/+/, "")
  return cleanPath ? `/${language}/${cleanPath}` : `/${language}`
}

export function getLanguageSwitchHref(pathname: string, targetLanguage: SupportedLanguage): string {
  if (!pathnameHasLanguage(pathname)) {
    return langHref(targetLanguage)
  }

  const path = getPathWithoutLanguage(pathname)
  const segments = path.split("/").filter(Boolean)

  if (segments.length === 0) {
    return langHref(targetLanguage)
  }

  const [section] = segments

  if (section === "words" || section === "practice" || section === "timeline") {
    return langHref(targetLanguage, segments.join("/"))
  }

  if (section === "topics" || section === "grammar" || section === "phrases") {
    return langHref(targetLanguage, section)
  }

  return langHref(targetLanguage)
}
