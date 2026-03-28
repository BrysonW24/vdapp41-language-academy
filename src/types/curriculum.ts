import { z } from "zod"

// --- Word ---
export const WordSchema = z.object({
  rank: z.number(),
  spanish: z.string(),
  english: z.string(),
  pronunciation: z.string(),
  partOfSpeech: z.enum(["noun", "verb", "adjective", "adverb", "preposition", "pronoun", "conjunction", "article", "interjection", "number"]),
  gender: z.enum(["masculine", "feminine", "neutral", "n/a"]).optional(),
  exampleEs: z.string(),
  exampleEn: z.string(),
  group: z.string(),
  topic: z.string(),
})

export type Word = z.infer<typeof WordSchema>

// --- Topic Module ---
export const TopicSchema = z.object({
  slug: z.string(),
  title: z.string(),
  titleEs: z.string(),
  shortSummary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  icon: z.string(),
  color: z.string(),
  culturalNote: z.string(),
  keyPhrases: z.array(z.object({
    spanish: z.string(),
    english: z.string(),
    pronunciation: z.string(),
    context: z.string(),
  })),
  grammar: z.array(z.object({
    rule: z.string(),
    explanation: z.string(),
    examples: z.array(z.object({ es: z.string(), en: z.string() })),
    commonMistake: z.string(),
  })),
  dialogue: z.object({
    setup: z.string(),
    lines: z.array(z.object({
      speaker: z.string(),
      spanish: z.string(),
      english: z.string(),
    })),
  }),
  quiz: z.array(z.object({
    type: z.enum(["translate", "fill-blank", "multiple-choice", "reorder"]),
    question: z.string(),
    options: z.array(z.string()).optional(),
    correctAnswer: z.string(),
    explanation: z.string(),
  })),
  status: z.enum(["complete", "coming-soon"]).default("coming-soon"),
})

export type Topic = z.infer<typeof TopicSchema>

// --- Grammar Rule ---
export const GrammarRuleSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameEs: z.string(),
  summary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  explanation: z.string(),
  pattern: z.string(),
  conjugation: z.object({
    yo: z.string(),
    tu: z.string(),
    el: z.string(),
    nosotros: z.string(),
    vosotros: z.string(),
    ellos: z.string(),
  }).optional(),
  examples: z.array(z.object({ es: z.string(), en: z.string() })),
  commonMistakes: z.array(z.string()),
  tip: z.string(),
})

export type GrammarRule = z.infer<typeof GrammarRuleSchema>

// --- Phrase Pack ---
export const PhrasePackSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  situation: z.string(),
  order: z.number(),
  phrases: z.array(z.object({
    spanish: z.string(),
    english: z.string(),
    pronunciation: z.string(),
    formality: z.enum(["formal", "informal", "neutral"]),
    tip: z.string().optional(),
  })),
})

export type PhrasePack = z.infer<typeof PhrasePackSchema>

// --- Word Group metadata ---
export const WORD_GROUPS = [
  { id: "essential-50", name: "The Essential 50", range: "1-50", desc: "The absolute foundation — you'll see these in every sentence", color: "#386a58" },
  { id: "core-100", name: "Core 100", range: "51-150", desc: "Basic conversation becomes possible", color: "#2f4f79" },
  { id: "everyday-250", name: "Everyday 250", range: "151-400", desc: "Navigate daily life — shops, restaurants, transport", color: "#6d28d9" },
  { id: "confident-350", name: "Confident 350", range: "401-750", desc: "Express opinions, describe experiences, tell stories", color: "#a16a1f" },
  { id: "fluent-250", name: "Fluent 250", range: "751-1000", desc: "Nuance, precision, natural-sounding speech", color: "#a0453f" },
] as const

// --- Level metadata ---
export const LEVELS = [
  { id: "beginner", name: "A1 — Beginner", desc: "Survival Spanish", color: "#386a58" },
  { id: "elementary", name: "A1+ — Elementary", desc: "Simple conversations", color: "#2f4f79" },
  { id: "pre-intermediate", name: "A2 — Pre-Intermediate", desc: "Independent communication", color: "#6d28d9" },
] as const
