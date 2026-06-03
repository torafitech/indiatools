const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "is","it","its","this","that","was","are","be","as","by","from","have",
  "had","has","not","he","she","we","they","you","i","my","your","their",
  "our","do","did","does","will","would","can","could","should","may","might",
]);

export interface WordCountResult {
  words: number;
  uniqueWords: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMin: number;
  speakingTimeMin: number;
  fleschScore: number;
  fleschLabel: string;
  topKeywords: { word: string; count: number; pct: number }[];
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|[^laeiouy]ed|[aeiouy](?:ing|tion))$/i, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

/**
 * Analyse text and return all metrics.
 * Flesch formula: 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
 */
export function analyzeText(text: string): WordCountResult {
  if (!text.trim()) {
    return {
      words: 0, uniqueWords: 0, characters: 0, charactersNoSpaces: 0,
      sentences: 0, paragraphs: 0, readingTimeMin: 0, speakingTimeMin: 0,
      fleschScore: 0, fleschLabel: "—", topKeywords: [],
    };
  }

  const wordList = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const words = wordList.length;

  const cleanWords = wordList.map((w) => w.toLowerCase().replace(/[^a-z0-9']/g, ""));
  const uniqueWords = new Set(cleanWords).size;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (words > 0 ? 1 : 0);

  const readingTimeMin = Math.max(1, Math.ceil(words / 200));
  const speakingTimeMin = Math.max(1, Math.ceil(words / 130));

  // Flesch Reading Ease
  const totalSyllables = cleanWords.reduce((s, w) => s + countSyllables(w), 0);
  const avgWordsPerSentence = sentences > 0 ? words / sentences : words;
  const avgSyllablesPerWord = words > 0 ? totalSyllables / words : 0;
  const fleschRaw = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const fleschScore = Math.round(Math.min(100, Math.max(0, fleschRaw)));

  let fleschLabel = "Very Difficult";
  if (fleschScore >= 90) fleschLabel = "Very Easy";
  else if (fleschScore >= 70) fleschLabel = "Easy";
  else if (fleschScore >= 60) fleschLabel = "Standard";
  else if (fleschScore >= 50) fleschLabel = "Fairly Difficult";
  else if (fleschScore >= 30) fleschLabel = "Difficult";

  // Keyword density — exclude stop words
  const freq: Record<string, number> = {};
  cleanWords.forEach((w) => {
    if (w.length >= 3 && !STOP_WORDS.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  });
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      pct: Math.round((count / words) * 1000) / 10,
    }));

  return {
    words, uniqueWords, characters, charactersNoSpaces,
    sentences, paragraphs, readingTimeMin, speakingTimeMin,
    fleschScore, fleschLabel, topKeywords,
  };
}
