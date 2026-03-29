import { z } from "zod"
import { SUPPORTED_LANGUAGES } from "@/lib/languages"

export const LanguageCodeSchema = z.enum(SUPPORTED_LANGUAGES)

export const AcademyPartOfSpeechSchema = z.enum([
  "noun",
  "verb",
  "adjective",
  "adverb",
  "preposition",
  "pronoun",
  "conjunction",
  "article",
  "interjection",
  "number",
  "particle",
  "measure-word",
  "auxiliary",
])

export const AcademyLevelSchema = z.enum(["beginner", "elementary", "pre-intermediate"])

export const AcademyWordSchema = z.object({
  rank: z.number(),
  language: LanguageCodeSchema,
  term: z.string(),
  secondary: z.string().optional(),
  transliteration: z.string().optional(),
  english: z.string(),
  pronunciation: z.string().optional(),
  partOfSpeech: AcademyPartOfSpeechSchema,
  gender: z.enum(["masculine", "feminine", "neuter"]).optional(),
  article: z.string().optional(),
  exampleNative: z.string(),
  exampleEn: z.string(),
  group: z.string(),
  topic: z.string(),
})

export type AcademyWord = z.infer<typeof AcademyWordSchema>

export const AcademyTopicSchema = z.object({
  slug: z.string(),
  language: LanguageCodeSchema,
  title: z.string(),
  nativeTitle: z.string(),
  shortSummary: z.string(),
  level: AcademyLevelSchema,
  order: z.number(),
  icon: z.string(),
  color: z.string(),
  culturalNote: z.string(),
  keyPhrases: z.array(
    z.object({
      native: z.string(),
      english: z.string(),
      pronunciation: z.string().optional(),
      context: z.string(),
    })
  ),
  grammar: z.array(
    z.object({
      rule: z.string(),
      explanation: z.string(),
      examples: z.array(z.object({ native: z.string(), en: z.string() })),
      commonMistake: z.string(),
    })
  ),
  dialogue: z.object({
    setup: z.string(),
    lines: z.array(
      z.object({
        speaker: z.string(),
        native: z.string(),
        secondary: z.string().optional(),
        english: z.string(),
      })
    ),
  }),
  quiz: z.array(
    z.object({
      type: z.enum(["translate", "fill-blank", "multiple-choice", "reorder"]),
      question: z.string(),
      options: z.array(z.string()).optional(),
      correctAnswer: z.string(),
      explanation: z.string(),
    })
  ),
  status: z.enum(["complete", "coming-soon"]),
})

export type AcademyTopic = z.infer<typeof AcademyTopicSchema>

export const AcademyGrammarRuleSchema = z.object({
  slug: z.string(),
  language: LanguageCodeSchema,
  name: z.string(),
  nativeName: z.string(),
  summary: z.string(),
  level: AcademyLevelSchema,
  order: z.number(),
  explanation: z.string(),
  pattern: z.string(),
  conjugation: z.record(z.string()).optional(),
  cases: z.record(z.string()).optional(),
  tones: z.string().optional(),
  examples: z.array(z.object({ native: z.string(), en: z.string() })),
  commonMistakes: z.array(z.string()),
  tip: z.string(),
})

export type AcademyGrammarRule = z.infer<typeof AcademyGrammarRuleSchema>

export const AcademyPhrasePackSchema = z.object({
  slug: z.string(),
  language: LanguageCodeSchema,
  title: z.string(),
  description: z.string(),
  situation: z.string(),
  order: z.number(),
  phrases: z.array(
    z.object({
      native: z.string(),
      english: z.string(),
      pronunciation: z.string().optional(),
      formality: z.enum(["formal", "informal", "neutral"]),
      tip: z.string().optional(),
    })
  ),
})

export type AcademyPhrasePack = z.infer<typeof AcademyPhrasePackSchema>

export const WORD_GROUPS = [
  { id: "essential-50", name: "The Essential 50", range: "1-50", desc: "The absolute foundation you see in nearly every sentence.", color: "#386a58" },
  { id: "core-100", name: "Core 100", range: "51-150", desc: "The next layer that makes basic conversation possible.", color: "#2f4f79" },
  { id: "everyday-250", name: "Everyday 250", range: "151-400", desc: "Daily life vocabulary for food, transport, family, and errands.", color: "#6d28d9" },
  { id: "confident-350", name: "Confident 350", range: "401-750", desc: "Words for opinions, stories, routines, and fuller expression.", color: "#a16a1f" },
  { id: "fluent-250", name: "Fluent 250", range: "751-1000", desc: "Nuance, precision, and more natural-sounding communication.", color: "#a0453f" },
] as const

export const TARGET_COUNTS = {
  words: 1000,
  topics: 15,
  grammar: 12,
  phrases: 8,
} as const
