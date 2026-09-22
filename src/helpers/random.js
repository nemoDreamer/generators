/**
 * @module random
 * @memberof module:helpers
 */

// --------------------------------------------------
// Randomization helpers
// --------------------------------------------------

/**
 * @param {any[]} arr - Input array.
 * @returns {any} Random element from input array.
 */
export const getRandom = (arr) =>
  arr[Math.round(Math.random() * (arr.length - 1))];

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} A random number between `min` and `max` (including).
 */
export const getRange = (min = 1, max = 10) =>
  Math.round(Math.random() * (max - min)) + min;

/**
 * @param {number} p - Probability as float between 0-1.
 * @returns {boolean}
 */
export const doProbability = (p) => Math.random() <= p;
