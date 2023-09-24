import { python } from "bunpy";
import { longJapaneseString } from "./longJapaneseString";

console.log("Running…");
main(longJapaneseString);
console.log("…Survived!");

export function main(japaneseText: string): string {
  const { GenericTagger } = python.import("fugashi");
  const { DICDIR } = python.import("unidic");

  const tagger = GenericTagger(`-d "${DICDIR.toString()}"`);

  let pron = "";
  for (const line of japaneseText.split("\n")) {
    pron += getPronunciation(line, tagger) + "\n";
  }

  return pron;
}

export function getPronunciation(
  text: string,
  tagger: Fugashi["GenericTagger"]
): string {
  let acc = "";
  const pronIndex = 9;

  for (const word of tagger(text)) {
    // The crash will happen around here, during the proxy
    // accesses. I'm not too clear which access is faulty.
    let pron =
      word.proxy.feature.valueOf().length > pronIndex
        ? word.proxy.feature.valueOf()[pronIndex].valueOf()
        : word.proxy.surface.valueOf();

    if (pron === "*") {
      pron = word.proxy.surface.valueOf();
    }

    acc = acc + pron;
  }

  return acc;
}

interface Fugashi {
  GenericTagger(args: string): PythonArray<Word>;
}

interface Word {
  proxy: {
    feature: PythonArray<PythonString>;
    surface: PythonString;
  };
}

type PythonArray<T> = {
  [Symbol.iterator](): Iterator<T>;
  valueOf(): Array<T>;
};

interface PythonString {
  valueOf(): string;
}
