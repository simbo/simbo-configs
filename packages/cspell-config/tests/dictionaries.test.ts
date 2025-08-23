import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const readDictionary = async (filename: string): Promise<string[]> => {
  const content = await readFile(resolve(import.meta.dirname, '../dictionaries', filename), 'utf8');
  const lines: string[] = [];
  for (const raw of content.split('\n')) {
    const line = raw.trim();
    if (line && !line.startsWith('#')) {
      lines.push(line);
    }
  }
  return lines;
};

const DICTS = {
  abbreviations: await readDictionary('abbreviations.txt'),
  words: await readDictionary('words.txt'),
};

describe('Dictionaries', () => {
  it('should have known dictionaries with content', () => {
    expect(DICTS.abbreviations).toBeDefined();
    expect(DICTS.abbreviations.length).toBeGreaterThan(0);
    expect(DICTS.words).toBeDefined();
    expect(DICTS.words.length).toBeGreaterThan(0);
  });

  it('should not contain duplicates', async () => {
    for (const lines of Object.values(DICTS)) {
      const uniqueLines = new Set(lines);
      expect(uniqueLines.size).toBe(lines.length);
    }
  });

  it('should be sorted in natural order', () => {
    for (const lines of Object.values(DICTS)) {
      const sortedLines = lines.toSorted((a, b) => a.localeCompare(b));
      expect(sortedLines).toEqual(lines);
    }
  });

  it('should not contain the same word in different cases', () => {
    for (const lines of Object.values(DICTS)) {
      const uniqueLowerCaseLines = new Set(lines.map(line => line.toLowerCase()));
      expect(uniqueLowerCaseLines.size).toBe(lines.length);
    }
  });

  it('should not contain the same word in multiple dictionaries', () => {
    const allWords = new Set([...DICTS.abbreviations, ...DICTS.words].map(word => word.toLowerCase()));
    expect(allWords.size).toBe(DICTS.abbreviations.length + DICTS.words.length);
  });
});
