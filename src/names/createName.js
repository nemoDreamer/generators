// TODO:
// - [ ] compute "language" config inside `createName`, then pass _that_ around
//   instead, to avoid constant `getLanguage`/`getRawCharForLanguage` calls?
// - [x] add "common syllable endings" per language for added realism!
// - [x] add "avoid implausible letter combinations" per language (could simply
//   be a per-language extension of `BAD` list?)
//
// FIXME:
// - [x] `BAD` matching needs to happen _before_ accents get added...
// - [x] `BAD` needs to be tested for _after_ syllables are combined...
// - [ ] JSDoc sucks at enums...

import { getRandom, getRange, doProbability } from "../helpers/random.js";

// c:spell:disable
/**
 * Language of generated name
 *
 * @readonly
 * @enum {string}
 */
const LANGUAGES = {
  /** No clear origin. */
  DEFAULT: "default",
  /** No weights. */
  RANDOM: "random",
  /** Hit-and-miss nordic sounding... */
  NORDIC: "nordic",
  /** Vaguely romance-language sounding... */
  ROMANCE: "romance",
  GOBLIN: "goblin",
  MOLE: "mole",
  SPIDER: "spider",
  BIBO: "bibo",
};

const EXCLUDE = [LANGUAGES.RANDOM]; // <- TODO: allow to define per `createName` call?

const SYLLABLE_PATTERNS = {
  default: ["ccv", "cvc", "cvc", "cvc", "vcc", "vcv", "vcv", "vcv"],
  random: ["ccv", "cvc", "vcc", "vcv", "vvv"],
  nordic: ["ccv", "ccvv", "cvc", "cvvc", "vcc", "vccv", "vcv", "vvcc"],
  romance: ["cvc", "cvc", "cvc", "cvv", "cvv", "vcc", "vcv", "vcv", "vcv"],
  bibo: ["cvc", "vcv"],
};

const CONSONANTS = {
  default: "bbccdddfffggghhjkkklllmmnnppqrrrsssttvvwwxz",
  random: "bcdfghjklmnpqrstvwxz",
  nordic: "tttttsssssrrrrrnnnnllllkkkkgggdddmmmvvhhffbbpjwz",
  romance: "nnnnnrrrrrsssssttttllllccccdddmmmffvvbbppggqhwy",
  goblin: "cfkqrstvz",
  mole: "bdgmnw",
  spider: "chkrs",
  bibo: "b",
};

const VOWELS = {
  default: "aaaeeeiioouuy",
  random: "aeiouy",
  nordic: "aaaeeeiiouy",
  romance: "aaaaeeeiiooou",
  goblin: "ai",
  mole: "ou",
  spider: "i",
  bibo: "io",
};

const SEPARATORS = {
  default: "", // <- no separators by default
  goblin: "-~'",
  mole: "-—~",
  spider: "-'",
};

const ACCENTS = {
  default: {
    a: "àáâäæãåā",
    c: "çćč",
    e: "èéêëēėę",
    i: "îïíīįì",
    l: "ł",
    n: "ñń",
    o: "ôöòóœøōõ",
    s: "ßśš",
    u: "ûüùúū",
    y: "ÿ",
    z: "žźż",
  },
  nordic: {
    a: "äæåā",
    e: "ëēė",
    i: "ïī",
    o: "öøō",
    s: "ß",
    u: "üū",
  },
  romance: {
    a: "àáâã",
    c: "ç",
    e: "èéê",
    i: "îíì",
    n: "ñ",
    o: "ôòóõ",
    u: "ûù",
  },
  goblin: {
    a: "àá",
    i: "íì",
  },
  mole: {
    o: "ôöøō",
    u: "ûū",
  },
  bibo: {},
};
// universal, language-agnostic "avoid these" - awkward/real-word-ish sounds:
const BAD = [
  /[fv][aeu][cgkq]/,
  /di[kcq]/,
  /[sz][au][kc]/,
  /[sz]ex/,
  /bu[tm]/,
  /[ck]um/,
  /(.)\1\1/, // <- no tripple letters
];

/**
 * Per-language phonotactics, layered on top of the universal `BAD` list.
 *
 * @readonly
 */
const LINGUISTIC_RULES = {
  nordic: {
    // most frequent sounds, occasionally favored as a name's ending:
    common: ["en", "rik", "strand", "berg", "gard"],
    // rudimentary "this would never occur in nordic" rules:
    exclude: [
      /[jwy]{2}/, // <- clashing semivowels, e.g. "jw", "wy"
      /h[jw]/, // <- "h" doesn't lead into "j"/"w"
      /pw|wp/, // <- "p" and "w" don't cluster
      /z[^aeiou]/, // <- "z" always leads into a vowel, never another consonant
    ],
  },
  romance: {
    // most frequent sounds, occasionally favored as a name's ending:
    common: ["ia", "ana", "etta", "ino", "os", "que"],
    exclude: [
      /q[^u]/, // <- "q" is always followed by "u"
      /h[^aeiou]/, // <- "h" always leads into a vowel
      /[wy]{2}/, // <- "w"/"y" are rare loan letters - never doubled or paired
      /[wv][ck]/,
      /[ck][wvp]/,
      /p[vw]/,
      /bw/,
      /mr/,
    ],
  },
  // goblin: {
  //   exclude: [/[kqt]{2}/], // <- no stacked voiceless stops
  // },
  mole: {
    exclude: [
      /[bdg]{2}/, // <- moles mumble - no stacked plosives
    ],
  },
  // spider: {
  //   exclude: [/(.)\1/], // <- don't repeat a sound twice in a row
  // },
};
// c:spell:enable

// TODO: make these language-dependent!
const SEPARATOR_PROBABILITY = 0.33;
const UPPERCASE_PROBABILITY = 0.5;
const ACCENT_PROBABILITY = 0.125;
const COMMON_PROBABILITY = 0.66;

// run-time constants:
const PAD_LENGTH = Object.values(LANGUAGES).reduce(
  (prev, curr) => (curr.length > prev ? curr.length : prev),
  0,
);
const INCLUDE = Object.values(LANGUAGES).filter(
  (language) => !EXCLUDE.includes(language),
);

// --------------------------------------------------
// Helpers
// --------------------------------------------------

/**
 * NOTE: checks both the universal `BAD` list and any `LINGUISTIC_RULES`
 * exclusions for the given `language`.
 *
 * @private
 *
 * @param {string} str
 * @param {LANGUAGES} [language]
 *
 * @returns {boolean} Whether the string matches a `BAD` pattern.
 */
const isBad = (str, language) =>
  [...BAD, ...(LINGUISTIC_RULES[language]?.exclude || [])].some((bad) =>
    bad.test(str),
  );

/**
 * @private
 *
 * @param {Object<string,any>} collections - A hash of Language-keyed values.
 * @param {LANGUAGES} [language]
 *
 * @returns {any} The value for the given `language`, or the default.
 */
const getLanguage = (collections, language) => {
  const collection = collections[language];

  // allow languages to not drop down to default:
  if (collection === false) {
    return "";
  }

  return collection || collections.default;
};

/**
 * @private
 *
 * @param {string} c - Single character.
 * @param {LANGUAGES} language
 *
 * @returns {string} Character with probable accent.
 */
const addAccent = (c, language) => {
  const accents = getLanguage(ACCENTS, language);

  if (accents?.[c] && doProbability(ACCENT_PROBABILITY)) {
    return getRandom(accents[c]);
  }

  return c;
};

/**
 * @private
 *
 * @param {Object<string,any>} collections - A hash of Language keyed values.
 * @param {LANGUAGES} [language]
 *
 * @returns {string} A random (unaccented) character from the language or
 * default collection.
 */
const getRawCharForLanguage = (collections, language) => {
  const characters = getLanguage(collections, language);

  return characters ? getRandom(characters) : "";
};

/**
 * @private
 *
 * @param {"c"|"v"} type - Determine vowel or consonant.
 * @param {LANGUAGES} [language]
 *
 * @returns {string} A random (language-specific, unaccented) vowel or
 * consonant.
 */
const getVowelOrConsonant = (type, language) =>
  getRawCharForLanguage(type === "v" ? VOWELS : CONSONANTS, language);

/**
 * @private
 *
 * @param {LANGUAGES} [language]
 *
 * @returns {string[]} Unaccented characters (potentially bad) matching one of
 * the `SYLLABLE_PATTERNS`.
 */
const createSyllable = (language) =>
  getRandom(getLanguage(SYLLABLE_PATTERNS, language))
    .split("")
    .map((type) => getVowelOrConsonant(type, language));

/**
 * @private
 *
 * @param {string[]} rawSyllable - Unaccented syllable characters.
 * @param {LANGUAGES} [language]
 *
 * @returns {string} The syllable, with accents applied per character.
 */
const decorateSyllable = (rawSyllable, language) =>
  rawSyllable.map((c) => addAccent(c, language)).join("");

/**
 * @private
 *
 * @param {number} min - Minimum number of syllables.
 * @param {number} max - Maximum number of syllables.
 * @param {LANGUAGES} [language]
 *
 * @returns {{syllables: string[][], separators: string[], combined: string}}
 * Raw (unaccented) syllables, the raw separator preceding each one (`""` for
 * none), and their (potentially BAD) combination.
 */
const createRawCandidate = (min, max, language) => {
  const syllables = Array(getRange(min, max))
    .fill()
    .map(() => createSyllable(language));

  // occasionally favor a common, language-specific ending, for realism:
  const common = LINGUISTIC_RULES[language]?.common;
  if (common && doProbability(COMMON_PROBABILITY)) {
    syllables[syllables.length - 1] = getRandom(common).split("");
  }

  const separators = syllables.map((_syllable, index) =>
    index !== 0 && doProbability(SEPARATOR_PROBABILITY)
      ? getRawCharForLanguage(SEPARATORS, language, false)
      : "",
  );

  const combined = syllables
    .map((syllable, index) => separators[index] + syllable.join(""))
    .join("");

  return { syllables, separators, combined };
};

/**
 * @private
 *
 * @param {number} min - Minimum number of syllables.
 * @param {number} max - Maximum number of syllables.
 * @param {LANGUAGES} [language]
 *
 * @returns {{syllables: string[][], separators: string[]}} Raw (unaccented)
 * syllables, and the raw separator preceding each one.
 */
const createRawName = (min, max, language) => {
  let candidate;

  do {
    candidate = createRawCandidate(min, max, language);
  } while (isBad(candidate.combined, language));

  return candidate;
};

/**
 * Creates a name in a given language.
 *
 * "Languages" are approximations based on basic combination "rules" of selected
 * vowels/consonants.
 *
 * @memberof module:generators.module:names
 *
 * @param {Object} config
 * @param {number} [config.min=1] - Minimum number of syllables.
 * @param {number} [config.max=3] - Maximum number of syllables.
 * @param {LANGUAGES} [config.language] - The language of the name. If not
 * specified, a language will be picked at random.
 * @param {boolean} [config.debug] - Return additional information.
 *
 * @returns {string|{language: LANGUAGES, languagePadded: string, name: string}}
 * A clean, fully (potentially separated/accented) name, or (if `config.debug`)
 * an object with additional information.
 */
const createName = ({
  min = 1,
  max = 3,
  language = getRandom(Object.values(INCLUDE)),
  debug = false,
} = {}) => {
  const { syllables, separators } = createRawName(min, max, language);

  const name = syllables
    .map((rawSyllable, index) => {
      const separator = addAccent(separators[index], language);
      let syllable = decorateSyllable(rawSyllable, language);

      // upper-case?
      if (
        // first letter?
        index === 0 ||
        // or non-letter separator?
        (/[^a-z]/i.test(separator) && doProbability(UPPERCASE_PROBABILITY))
      ) {
        syllable = syllable[0].toUpperCase() + syllable.slice(1);
      }

      return `${separator}${syllable}`;
    })
    .join("");

  if (debug) {
    return {
      language,
      languagePadded: language.padEnd(PAD_LENGTH),
      name,
    };
  }

  return name;
};

// attach constants

createName.LANGUAGES = LANGUAGES;

// --------------------------------------------------

export default createName;
