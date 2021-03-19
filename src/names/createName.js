// TODO:
// - compute "language" config inside `createName`, then pass _that_ around
//   instead, to avoid constant `getLanguage`/`getCharForLanguage`?
// - add "common syllable endings" per language for added realism!
// - add "avoid implausible letter combinations" per language (could simply be a
//   per-language extension of `BAD` list?)
//
// FIXME:
// - `BAD` matching needs to happen _before_ accents get added...
// - JSDoc sucks at enums...

const { getRandom, getRange, doProbability } = require("../helpers/random");

// c:spell:disable
/**
 * Language of generated name
 *
 * @readonly
 * @enum {String}
 */
const LANGUAGES = {
  DEFAULT: "default", // <- no clear origin
  RANDOM: "random", // <- no weights
  NORDIC: "nordic", // <- hit-and-miss, since you still might get endings that sound latin...
  LATIN: "latin", // <- ... at least until we can add some post-processing
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
  latin: ["cvc", "cvc", "cvc", "cvv", "vcc", "vcc", "vcv", "vcv", "vcv"],
  bibo: ["cvc", "vcv"],
};
const CONSONANTS = {
  default: "bbccdddfffggghhjkkklllmmnnppqrrrsssttvvwwxz",
  random: "bcdfghjklmnpqrstvwxz",
  nordic: "dddfffggghhjkkkklllllmnprrrrsssstttttvvvwwwz",
  latin: "bccccdddghlllmmmnnnpqrrrssstttvwy",
  goblin: "cfkqrstvz",
  mole: "bdgmnw",
  spider: "chkrs",
  bibo: "b",
};
const VOWELS = {
  default: "aaaeeeiioouuy",
  random: "aeiouy",
  nordic: "aaaaaaeeeeeeiiiioouu",
  latin: "aeiou",
  goblin: "ai",
  mole: "ou",
  spider: "i",
  bibo: "io",
};
const SEPARATORS = {
  default: "-'oae",
  latin: "aeiou",
  goblin: "-~'hr",
  mole: "-—~o",
  spider: "-'",
  bibo: "io",
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
    o: "öœøō",
    s: "ß",
    u: "üū",
  },
  latin: {
    a: "àáâæ",
    c: "ç",
    e: "èéê",
    i: "îíì",
    n: "ñ",
    o: "ôòóœ",
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
const BAD = [
  /[fv][aeu][cgkq]/,
  /di[kcq]/,
  /[sz]au[kc]/,
  /[sz]ex/,
  /bu[tm]/,
  /[ck]um/,
];
// c:spell:enable

// TODO: make these language-dependent!
const SEPARATOR_PROBABILITY = 0.33;
const UPPERCASE_PROBABILITY = 0.5;
const ACCENT_PROBABILITY = 0.125;

// run-time constants:
const PAD_LENGTH = Object.values(LANGUAGES).reduce(
  (prev, curr) => (curr.length > prev ? curr.length : prev),
  0
);
const INCLUDE = Object.values(LANGUAGES).filter(
  (language) => !EXCLUDE.includes(language)
);

// --------------------------------------------------
// Helpers
// --------------------------------------------------

/**
 * @private
 *
 * @param {String} str
 *
 * @returns {Boolean} Whether the string matches a `BAD` pattern.
 */
const isBad = (str) => BAD.some((bad) => bad.test(str));

/**
 * @private
 *
 * @param {Object<Language,any>} collections - A hash of Language-keyed values.
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
 * @param {String} c - Single character.
 * @param {LANGUAGES} language
 *
 * @returns {String} Character with probable accent.
 */
const addAccent = (c, language) => {
  const accents = getLanguage(ACCENTS, language);

  if (accents[c] && doProbability(ACCENT_PROBABILITY)) {
    return getRandom(accents[c]);
  }

  return c;
};

/**
 * @private
 *
 * @param {Object<Language,any>} collections - A hash of Language keyed values.
 * @param {LANGUAGES} [language]
 *
 * @returns {String} A random (probably accented) character from the language or
 * default collection.
 */
const getCharForLanguage = (collections, language) => {
  const characters = getLanguage(collections, language);

  return characters ? addAccent(getRandom(characters), language) : "";
};

/**
 * @private
 *
 * @param {"c"|"v"} type - Determine vowel or consonant.
 * @param {LANGUAGES} [language]
 *
 * @returns {String} A random (language-specific, probably accented) vowel or
 * consonant.
 */
const getVowelOrConsonant = (type, language) =>
  getCharForLanguage(type === "v" ? VOWELS : CONSONANTS, language);

/**
 * @private
 *
 * @param {LANGUAGES} [language]
 *
 * @returns {String} A string (potentially bad) matching one of the
 * `SYLLABLE_PATTERNS`.
 */
const createSyllable = (language) =>
  getRandom(getLanguage(SYLLABLE_PATTERNS, language))
    .split("")
    .map((type) => getVowelOrConsonant(type, language))
    .join("");

/**
 * @private
 *
 * @param {LANGUAGES} [language]
 *
 * @returns {String} A clean syllable.
 */
const createCleanSyllable = (language) => {
  let syllable;

  do {
    syllable = createSyllable(language);
  } while (isBad(syllable));

  return syllable;
};

/**
 * Creates a name in a given language.
 *
 * "Languages" are approximations based on basic combination "rules" of selected
 * vowels/consonants.
 *
 * @module
 *
 * @param {Object} config
 * @param {Number} [config.min=1] - Minimum number of syllables.
 * @param {Number} [config.max=3] - Maximum number of syllables.
 * @param {LANGUAGES} [config.language] - The language of the name. If not
 * specified, a language will be picked at random.
 * @param {Boolean} [config.debug] - Return additional information.
 *
 * @returns {String} A clean, fully (potentially separated/accented) name.
 */
const createName = ({
  min = 1,
  max = 3,
  language = getRandom(Object.values(INCLUDE)),
  debug = false,
} = {}) => {
  const name = Array(getRange(min, max))
    .fill()
    .map((_v, index) => {
      let syllable = createCleanSyllable(language);

      // add separator?
      let separator = "";
      if (index !== 0 && doProbability(SEPARATOR_PROBABILITY)) {
        separator = getCharForLanguage(SEPARATORS, language);
      }

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
/**
 * @type {LANGUAGES}
 * @memberof module:createName
 */
createName.LANGUAGES = LANGUAGES;

// --------------------------------------------------

module.exports = createName;
