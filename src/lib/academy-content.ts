import fs from "fs"
import path from "path"
import { z } from "zod"
import type { SupportedLanguage } from "@/lib/languages"
import {
  AcademyGrammarRuleSchema,
  AcademyPhrasePackSchema,
  AcademyTopicSchema,
  AcademyWordSchema,
  type AcademyGrammarRule,
  type AcademyPhrasePack,
  type AcademyTopic,
  type AcademyWord,
} from "@/types/academy"

const CONTENT_DIR = path.join(process.cwd(), "content/curriculum")

const SpanishWordSchema = z.object({
  rank: z.number(),
  spanish: z.string(),
  english: z.string(),
  pronunciation: z.string().optional(),
  partOfSpeech: z.enum(["noun", "verb", "adjective", "adverb", "preposition", "pronoun", "conjunction", "article", "interjection", "number"]),
  gender: z.enum(["masculine", "feminine", "neutral", "n/a"]).optional(),
  exampleEs: z.string(),
  exampleEn: z.string(),
  group: z.string(),
  topic: z.string(),
})

const ChineseWordSchema = z.object({
  rank: z.number(),
  chinese: z.string(),
  characters: z.string().optional(),
  pinyin: z.string().optional(),
  english: z.string(),
  pronunciation: z.string().optional(),
  partOfSpeech: z.enum(["noun", "verb", "adjective", "adverb", "preposition", "pronoun", "conjunction", "particle", "interjection", "number", "measure-word", "auxiliary"]),
  exampleZh: z.string(),
  exampleEn: z.string(),
  group: z.string(),
  topic: z.string(),
})

const GermanWordSchema = z.object({
  rank: z.number(),
  german: z.string(),
  english: z.string(),
  pronunciation: z.string().optional(),
  partOfSpeech: z.enum(["noun", "verb", "adjective", "adverb", "preposition", "pronoun", "conjunction", "article", "interjection", "number"]),
  gender: z.enum(["masculine", "feminine", "neuter", "n/a"]).optional(),
  article: z.string().optional(),
  exampleDe: z.string(),
  exampleEn: z.string(),
  group: z.string(),
  topic: z.string(),
})

const ThaiWordSchema = z.object({
  rank: z.number(),
  thai: z.string(),
  transliteration: z.string().optional(),
  english: z.string(),
  pronunciation: z.string().optional(),
  partOfSpeech: z.enum(["noun", "verb", "adjective", "adverb", "preposition", "pronoun", "conjunction", "article", "interjection", "number", "particle"]).optional().default("noun"),
  exampleTh: z.string(),
  exampleEn: z.string(),
  group: z.string(),
  topic: z.string(),
})

const SpanishTopicSchema = z.object({
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
    pronunciation: z.string().optional(),
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

const ChineseTopicSchema = z.object({
  slug: z.string(),
  title: z.string(),
  titleZh: z.string(),
  shortSummary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  icon: z.string(),
  color: z.string(),
  culturalNote: z.string(),
  keyPhrases: z.array(z.object({
    chinese: z.string(),
    pinyin: z.string().optional(),
    english: z.string(),
    context: z.string(),
  })),
  grammar: z.array(z.object({
    rule: z.string(),
    explanation: z.string(),
    examples: z.array(z.object({ zh: z.string(), en: z.string() })),
    commonMistake: z.string(),
  })),
  dialogue: z.object({
    setup: z.string(),
    lines: z.array(z.object({
      speaker: z.string(),
      chinese: z.string(),
      pinyin: z.string().optional(),
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

const GermanTopicSchema = z.object({
  slug: z.string(),
  title: z.string(),
  titleDe: z.string(),
  shortSummary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  icon: z.string(),
  color: z.string(),
  culturalNote: z.string(),
  keyPhrases: z.array(z.object({
    german: z.string(),
    english: z.string(),
    pronunciation: z.string().optional(),
    context: z.string(),
  })),
  grammar: z.array(z.object({
    rule: z.string(),
    explanation: z.string(),
    examples: z.array(z.object({ de: z.string(), en: z.string() })),
    commonMistake: z.string(),
  })),
  dialogue: z.object({
    setup: z.string(),
    lines: z.array(z.object({
      speaker: z.string(),
      german: z.string(),
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

const ThaiTopicSchema = z.object({
  slug: z.string(),
  title: z.string(),
  titleTh: z.string(),
  shortSummary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  icon: z.string(),
  color: z.string(),
  culturalNote: z.string(),
  keyPhrases: z.array(z.object({
    thai: z.string(),
    pronunciation: z.string().optional(),
    english: z.string(),
    context: z.string(),
  })),
  grammar: z.array(z.object({
    rule: z.string(),
    explanation: z.string(),
    examples: z.array(z.object({ th: z.string(), en: z.string() })),
    commonMistake: z.string(),
  })),
  dialogue: z.object({
    setup: z.string(),
    lines: z.array(z.object({
      speaker: z.string(),
      thai: z.string(),
      pronunciation: z.string().optional(),
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

const SpanishGrammarSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameEs: z.string(),
  summary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  explanation: z.string(),
  pattern: z.string(),
  conjugation: z.record(z.string()).optional(),
  examples: z.array(z.object({ es: z.string(), en: z.string() })),
  commonMistakes: z.array(z.string()),
  tip: z.string(),
})

const ChineseGrammarSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameZh: z.string(),
  summary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  explanation: z.string(),
  pattern: z.string(),
  tones: z.string().optional(),
  examples: z.array(z.object({ zh: z.string(), en: z.string() })),
  commonMistakes: z.array(z.string()),
  tip: z.string(),
})

const GermanGrammarSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameDe: z.string(),
  summary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  explanation: z.string(),
  pattern: z.string(),
  conjugation: z.record(z.string()).optional(),
  cases: z.record(z.string()).optional(),
  examples: z.array(z.object({ de: z.string(), en: z.string() })),
  commonMistakes: z.array(z.string()),
  tip: z.string(),
})

const ThaiGrammarSchema = z.object({
  slug: z.string(),
  name: z.string(),
  nameTh: z.string(),
  summary: z.string(),
  level: z.enum(["beginner", "elementary", "pre-intermediate"]),
  order: z.number(),
  explanation: z.string(),
  pattern: z.string(),
  examples: z.array(z.object({ th: z.string(), en: z.string() })),
  commonMistakes: z.array(z.string()),
  tip: z.string(),
})

const SpanishPhrasePackSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  situation: z.string(),
  order: z.number(),
  phrases: z.array(z.object({
    spanish: z.string(),
    english: z.string(),
    pronunciation: z.string().optional(),
    formality: z.enum(["formal", "informal", "neutral"]),
    tip: z.string().optional(),
  })),
})

const ChinesePhrasePackSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  situation: z.string(),
  order: z.number(),
  phrases: z.array(z.object({
    chinese: z.string(),
    pinyin: z.string().optional(),
    english: z.string(),
    formality: z.enum(["formal", "informal", "neutral"]),
    tip: z.string().optional(),
  })),
})

const GermanPhrasePackSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  situation: z.string(),
  order: z.number(),
  phrases: z.array(z.object({
    german: z.string(),
    english: z.string(),
    pronunciation: z.string().optional(),
    formality: z.enum(["formal", "informal", "neutral"]),
    tip: z.string().optional(),
  })),
})

const ThaiPhrasePackSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  situation: z.string(),
  order: z.number(),
  phrases: z.array(z.object({
    thai: z.string(),
    pronunciation: z.string().optional(),
    english: z.string(),
    formality: z.enum(["formal", "informal", "neutral"]),
    tip: z.string().optional(),
  })),
})

function resolveLanguageDir(language: SupportedLanguage) {
  const fullPath = path.join(CONTENT_DIR, language)
  if (fs.existsSync(fullPath)) return fullPath
  return language === "es" ? CONTENT_DIR : fullPath
}

function readJsonDir<T>(
  language: SupportedLanguage,
  dir: string,
  parser: (raw: unknown) => T
): T[] {
  const fullPath = path.join(resolveLanguageDir(language), dir)
  if (!fs.existsSync(fullPath)) return []

  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(fullPath, file), "utf-8"))
      return parser(raw)
    })
}

function readJsonFile<T>(
  language: SupportedLanguage,
  filePath: string,
  parser: (raw: unknown) => T
): T | null {
  const fullPath = path.join(resolveLanguageDir(language), filePath)
  if (!fs.existsSync(fullPath)) return null
  const raw = JSON.parse(fs.readFileSync(fullPath, "utf-8"))
  return parser(raw)
}

function normalizeGender(gender?: string) {
  if (!gender || gender === "n/a") return undefined
  if (gender === "neutral") return "neuter" as const
  return gender as "masculine" | "feminine" | "neuter"
}

function parseWord(language: SupportedLanguage, raw: unknown): AcademyWord {
  if (language === "es") {
    const word = SpanishWordSchema.parse(raw)
    return AcademyWordSchema.parse({
      rank: word.rank,
      language,
      term: word.spanish,
      english: word.english,
      pronunciation: word.pronunciation,
      partOfSpeech: word.partOfSpeech,
      gender: normalizeGender(word.gender),
      exampleNative: word.exampleEs,
      exampleEn: word.exampleEn,
      group: word.group,
      topic: word.topic,
    })
  }

  if (language === "zh") {
    const word = ChineseWordSchema.parse(raw)
    return AcademyWordSchema.parse({
      rank: word.rank,
      language,
      term: word.chinese,
      secondary: word.characters && word.characters !== word.chinese ? word.characters : undefined,
      transliteration: word.pinyin,
      english: word.english,
      pronunciation: word.pronunciation ?? word.pinyin,
      partOfSpeech: word.partOfSpeech,
      exampleNative: word.exampleZh,
      exampleEn: word.exampleEn,
      group: word.group,
      topic: word.topic,
    })
  }

  if (language === "de") {
    const word = GermanWordSchema.parse(raw)
    return AcademyWordSchema.parse({
      rank: word.rank,
      language,
      term: word.german,
      english: word.english,
      pronunciation: word.pronunciation,
      partOfSpeech: word.partOfSpeech,
      gender: normalizeGender(word.gender),
      article: word.article,
      exampleNative: word.exampleDe,
      exampleEn: word.exampleEn,
      group: word.group,
      topic: word.topic,
    })
  }

  const word = ThaiWordSchema.parse(raw)
  return AcademyWordSchema.parse({
    rank: word.rank,
    language,
    term: word.thai,
    transliteration: word.transliteration,
    english: word.english,
    pronunciation: word.pronunciation ?? word.transliteration,
    partOfSpeech: word.partOfSpeech,
    exampleNative: word.exampleTh,
    exampleEn: word.exampleEn,
    group: word.group,
    topic: word.topic,
  })
}

function parseTopic(language: SupportedLanguage, raw: unknown): AcademyTopic {
  if (language === "es") {
    const topic = SpanishTopicSchema.parse(raw)
    return AcademyTopicSchema.parse({
      slug: topic.slug,
      language,
      title: topic.title,
      nativeTitle: topic.titleEs,
      shortSummary: topic.shortSummary,
      level: topic.level,
      order: topic.order,
      icon: topic.icon,
      color: topic.color,
      culturalNote: topic.culturalNote,
      keyPhrases: topic.keyPhrases.map((phrase) => ({
        native: phrase.spanish,
        english: phrase.english,
        pronunciation: phrase.pronunciation,
        context: phrase.context,
      })),
      grammar: topic.grammar.map((rule) => ({
        rule: rule.rule,
        explanation: rule.explanation,
        examples: rule.examples.map((example) => ({ native: example.es, en: example.en })),
        commonMistake: rule.commonMistake,
      })),
      dialogue: {
        setup: topic.dialogue.setup,
        lines: topic.dialogue.lines.map((line) => ({
          speaker: line.speaker,
          native: line.spanish,
          english: line.english,
        })),
      },
      quiz: topic.quiz,
      status: topic.status,
    })
  }

  if (language === "zh") {
    const topic = ChineseTopicSchema.parse(raw)
    return AcademyTopicSchema.parse({
      slug: topic.slug,
      language,
      title: topic.title,
      nativeTitle: topic.titleZh,
      shortSummary: topic.shortSummary,
      level: topic.level,
      order: topic.order,
      icon: topic.icon,
      color: topic.color,
      culturalNote: topic.culturalNote,
      keyPhrases: topic.keyPhrases.map((phrase) => ({
        native: phrase.chinese,
        english: phrase.english,
        pronunciation: phrase.pinyin,
        context: phrase.context,
      })),
      grammar: topic.grammar.map((rule) => ({
        rule: rule.rule,
        explanation: rule.explanation,
        examples: rule.examples.map((example) => ({ native: example.zh, en: example.en })),
        commonMistake: rule.commonMistake,
      })),
      dialogue: {
        setup: topic.dialogue.setup,
        lines: topic.dialogue.lines.map((line) => ({
          speaker: line.speaker,
          native: line.chinese,
          secondary: line.pinyin,
          english: line.english,
        })),
      },
      quiz: topic.quiz,
      status: topic.status,
    })
  }

  if (language === "de") {
    const topic = GermanTopicSchema.parse(raw)
    return AcademyTopicSchema.parse({
      slug: topic.slug,
      language,
      title: topic.title,
      nativeTitle: topic.titleDe,
      shortSummary: topic.shortSummary,
      level: topic.level,
      order: topic.order,
      icon: topic.icon,
      color: topic.color,
      culturalNote: topic.culturalNote,
      keyPhrases: topic.keyPhrases.map((phrase) => ({
        native: phrase.german,
        english: phrase.english,
        pronunciation: phrase.pronunciation,
        context: phrase.context,
      })),
      grammar: topic.grammar.map((rule) => ({
        rule: rule.rule,
        explanation: rule.explanation,
        examples: rule.examples.map((example) => ({ native: example.de, en: example.en })),
        commonMistake: rule.commonMistake,
      })),
      dialogue: {
        setup: topic.dialogue.setup,
        lines: topic.dialogue.lines.map((line) => ({
          speaker: line.speaker,
          native: line.german,
          english: line.english,
        })),
      },
      quiz: topic.quiz,
      status: topic.status,
    })
  }

  const topic = ThaiTopicSchema.parse(raw)
  return AcademyTopicSchema.parse({
    slug: topic.slug,
    language,
    title: topic.title,
    nativeTitle: topic.titleTh,
    shortSummary: topic.shortSummary,
    level: topic.level,
    order: topic.order,
    icon: topic.icon,
    color: topic.color,
    culturalNote: topic.culturalNote,
    keyPhrases: topic.keyPhrases.map((phrase) => ({
      native: phrase.thai,
      english: phrase.english,
      pronunciation: phrase.pronunciation,
      context: phrase.context,
    })),
    grammar: topic.grammar.map((rule) => ({
      rule: rule.rule,
      explanation: rule.explanation,
      examples: rule.examples.map((example) => ({ native: example.th, en: example.en })),
      commonMistake: rule.commonMistake,
    })),
    dialogue: {
      setup: topic.dialogue.setup,
      lines: topic.dialogue.lines.map((line) => ({
        speaker: line.speaker,
        native: line.thai,
        secondary: line.pronunciation,
        english: line.english,
      })),
    },
    quiz: topic.quiz,
    status: topic.status,
  })
}

function parseGrammarRule(language: SupportedLanguage, raw: unknown): AcademyGrammarRule {
  if (language === "es") {
    const rule = SpanishGrammarSchema.parse(raw)
    return AcademyGrammarRuleSchema.parse({
      slug: rule.slug,
      language,
      name: rule.name,
      nativeName: rule.nameEs,
      summary: rule.summary,
      level: rule.level,
      order: rule.order,
      explanation: rule.explanation,
      pattern: rule.pattern,
      conjugation: rule.conjugation,
      examples: rule.examples.map((example) => ({ native: example.es, en: example.en })),
      commonMistakes: rule.commonMistakes,
      tip: rule.tip,
    })
  }

  if (language === "zh") {
    const rule = ChineseGrammarSchema.parse(raw)
    return AcademyGrammarRuleSchema.parse({
      slug: rule.slug,
      language,
      name: rule.name,
      nativeName: rule.nameZh,
      summary: rule.summary,
      level: rule.level,
      order: rule.order,
      explanation: rule.explanation,
      pattern: rule.pattern,
      tones: rule.tones,
      examples: rule.examples.map((example) => ({ native: example.zh, en: example.en })),
      commonMistakes: rule.commonMistakes,
      tip: rule.tip,
    })
  }

  if (language === "de") {
    const rule = GermanGrammarSchema.parse(raw)
    return AcademyGrammarRuleSchema.parse({
      slug: rule.slug,
      language,
      name: rule.name,
      nativeName: rule.nameDe,
      summary: rule.summary,
      level: rule.level,
      order: rule.order,
      explanation: rule.explanation,
      pattern: rule.pattern,
      conjugation: rule.conjugation,
      cases: rule.cases,
      examples: rule.examples.map((example) => ({ native: example.de, en: example.en })),
      commonMistakes: rule.commonMistakes,
      tip: rule.tip,
    })
  }

  const rule = ThaiGrammarSchema.parse(raw)
  return AcademyGrammarRuleSchema.parse({
    slug: rule.slug,
    language,
    name: rule.name,
    nativeName: rule.nameTh,
    summary: rule.summary,
    level: rule.level,
    order: rule.order,
    explanation: rule.explanation,
    pattern: rule.pattern,
    examples: rule.examples.map((example) => ({ native: example.th, en: example.en })),
    commonMistakes: rule.commonMistakes,
    tip: rule.tip,
  })
}

function parsePhrasePack(language: SupportedLanguage, raw: unknown): AcademyPhrasePack {
  if (language === "es") {
    const pack = SpanishPhrasePackSchema.parse(raw)
    return AcademyPhrasePackSchema.parse({
      slug: pack.slug,
      language,
      title: pack.title,
      description: pack.description,
      situation: pack.situation,
      order: pack.order,
      phrases: pack.phrases.map((phrase) => ({
        native: phrase.spanish,
        english: phrase.english,
        pronunciation: phrase.pronunciation,
        formality: phrase.formality,
        tip: phrase.tip,
      })),
    })
  }

  if (language === "zh") {
    const pack = ChinesePhrasePackSchema.parse(raw)
    return AcademyPhrasePackSchema.parse({
      slug: pack.slug,
      language,
      title: pack.title,
      description: pack.description,
      situation: pack.situation,
      order: pack.order,
      phrases: pack.phrases.map((phrase) => ({
        native: phrase.chinese,
        english: phrase.english,
        pronunciation: phrase.pinyin,
        formality: phrase.formality,
        tip: phrase.tip,
      })),
    })
  }

  if (language === "de") {
    const pack = GermanPhrasePackSchema.parse(raw)
    return AcademyPhrasePackSchema.parse({
      slug: pack.slug,
      language,
      title: pack.title,
      description: pack.description,
      situation: pack.situation,
      order: pack.order,
      phrases: pack.phrases.map((phrase) => ({
        native: phrase.german,
        english: phrase.english,
        pronunciation: phrase.pronunciation,
        formality: phrase.formality,
        tip: phrase.tip,
      })),
    })
  }

  const pack = ThaiPhrasePackSchema.parse(raw)
  return AcademyPhrasePackSchema.parse({
    slug: pack.slug,
    language,
    title: pack.title,
    description: pack.description,
    situation: pack.situation,
    order: pack.order,
    phrases: pack.phrases.map((phrase) => ({
      native: phrase.thai,
      english: phrase.english,
      pronunciation: phrase.pronunciation,
      formality: phrase.formality,
      tip: phrase.tip,
    })),
  })
}

export function getWords(language: SupportedLanguage): AcademyWord[] {
  return readJsonDir(language, "words", (raw) => parseWord(language, raw)).sort(
    (a, b) => a.rank - b.rank
  )
}

export function getWordsByGroup(language: SupportedLanguage, group: string): AcademyWord[] {
  return getWords(language).filter((word) => word.group === group)
}

export function getTopics(language: SupportedLanguage): AcademyTopic[] {
  return readJsonDir(language, "topics", (raw) => parseTopic(language, raw)).sort(
    (a, b) => a.order - b.order
  )
}

export function getTopic(language: SupportedLanguage, slug: string): AcademyTopic | null {
  return readJsonFile(language, `topics/${slug}.json`, (raw) => parseTopic(language, raw))
}

export function getGrammarRules(language: SupportedLanguage): AcademyGrammarRule[] {
  return readJsonDir(language, "grammar", (raw) => parseGrammarRule(language, raw)).sort(
    (a, b) => a.order - b.order
  )
}

export function getGrammarRule(
  language: SupportedLanguage,
  slug: string
): AcademyGrammarRule | null {
  return readJsonFile(language, `grammar/${slug}.json`, (raw) =>
    parseGrammarRule(language, raw)
  )
}

export function getPhrasePacks(language: SupportedLanguage): AcademyPhrasePack[] {
  return readJsonDir(language, "phrases", (raw) => parsePhrasePack(language, raw)).sort(
    (a, b) => a.order - b.order
  )
}

export function getPhrasePack(
  language: SupportedLanguage,
  slug: string
): AcademyPhrasePack | null {
  return readJsonFile(language, `phrases/${slug}.json`, (raw) =>
    parsePhrasePack(language, raw)
  )
}

export function getAcademyStats(language: SupportedLanguage) {
  return {
    words: getWords(language).length,
    topics: getTopics(language).length,
    grammar: getGrammarRules(language).length,
    phrases: getPhrasePacks(language).length,
  }
}
