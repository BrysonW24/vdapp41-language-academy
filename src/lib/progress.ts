import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface QuizResult {
  score: number
  total: number
}

export interface ProgressState {
  learnedWords: string[]
  completedTopics: string[]
  completedGrammar: string[]
  quizResults: Record<string, QuizResult>
  streakDays: number
  lastActiveDate: string | null

  learnWord: (spanish: string) => void
  completeTopic: (slug: string) => void
  completeGrammar: (slug: string) => void
  saveQuizResult: (topicSlug: string, score: number, total: number) => void
  updateStreak: () => void
  reset: () => void
}

const INITIAL = {
  learnedWords: [] as string[],
  completedTopics: [] as string[],
  completedGrammar: [] as string[],
  quizResults: {} as Record<string, QuizResult>,
  streakDays: 0,
  lastActiveDate: null as string | null,
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...INITIAL,

      learnWord: (spanish) =>
        set((s) => ({
          learnedWords: s.learnedWords.includes(spanish)
            ? s.learnedWords
            : [...s.learnedWords, spanish],
        })),

      completeTopic: (slug) =>
        set((s) => ({
          completedTopics: s.completedTopics.includes(slug)
            ? s.completedTopics
            : [...s.completedTopics, slug],
        })),

      completeGrammar: (slug) =>
        set((s) => ({
          completedGrammar: s.completedGrammar.includes(slug)
            ? s.completedGrammar
            : [...s.completedGrammar, slug],
        })),

      saveQuizResult: (topicSlug, score, total) =>
        set((s) => ({
          quizResults: { ...s.quizResults, [topicSlug]: { score, total } },
        })),

      updateStreak: () => {
        const today = todayStr()
        const state = get()
        if (state.lastActiveDate === today) return

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().slice(0, 10)

        set({
          streakDays: state.lastActiveDate === yesterdayStr ? state.streakDays + 1 : 1,
          lastActiveDate: today,
        })
      },

      reset: () => set(INITIAL),
    }),
    { name: "spanish-academy-progress" }
  )
)

export const WORD_GROUP_INFO: Record<string, { label: string; color: string; total: number }> = {
  "essential-50": { label: "Essential 50", color: "#386a58", total: 50 },
  "core-100": { label: "Core 100", color: "#2f4f79", total: 100 },
  "everyday-250": { label: "Everyday 250", color: "#6d28d9", total: 250 },
  "confident-350": { label: "Confident 350", color: "#a16a1f", total: 350 },
  "fluent-250": { label: "Fluent 250", color: "#a0453f", total: 250 },
}
