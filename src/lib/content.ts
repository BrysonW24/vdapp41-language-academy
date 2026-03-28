import fs from "fs"
import path from "path"
import {
  TopicSchema,
  WordSchema,
  GrammarRuleSchema,
  PhrasePackSchema,
  type Topic,
  type Word,
  type GrammarRule,
  type PhrasePack,
} from "@/types/curriculum"

const CONTENT_DIR = path.join(process.cwd(), "content/curriculum")

function readJsonDir<T>(dir: string, schema: { parse: (data: unknown) => T }): T[] {
  const fullPath = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(fullPath)) return []
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = JSON.parse(fs.readFileSync(path.join(fullPath, f), "utf-8"))
      return schema.parse(raw)
    })
}

function readJsonFile<T>(filePath: string, schema: { parse: (data: unknown) => T }): T | null {
  const fullPath = path.join(CONTENT_DIR, filePath)
  if (!fs.existsSync(fullPath)) return null
  const raw = JSON.parse(fs.readFileSync(fullPath, "utf-8"))
  return schema.parse(raw)
}

// --- Topics ---
export function getTopics(): Topic[] {
  return readJsonDir("topics", TopicSchema).sort((a, b) => a.order - b.order)
}

export function getTopic(slug: string): Topic | null {
  return readJsonFile(`topics/${slug}.json`, TopicSchema)
}

// --- Words ---
export function getWords(): Word[] {
  return readJsonDir("words", WordSchema).sort((a, b) => a.rank - b.rank)
}

export function getWordsByGroup(group: string): Word[] {
  return getWords().filter((w) => w.group === group)
}

export function getWordsByTopic(topic: string): Word[] {
  return getWords().filter((w) => w.topic === topic)
}

// --- Grammar ---
export function getGrammarRules(): GrammarRule[] {
  return readJsonDir("grammar", GrammarRuleSchema).sort((a, b) => a.order - b.order)
}

export function getGrammarRule(slug: string): GrammarRule | null {
  return readJsonFile(`grammar/${slug}.json`, GrammarRuleSchema)
}

// --- Phrase Packs ---
export function getPhrasePacks(): PhrasePack[] {
  return readJsonDir("phrases", PhrasePackSchema).sort((a, b) => a.order - b.order)
}

export function getPhrasePack(slug: string): PhrasePack | null {
  return readJsonFile(`phrases/${slug}.json`, PhrasePackSchema)
}
