#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import markdownMagic from "markdown-magic";
import jsdoc2md from "jsdoc-to-markdown";

// markdown-magic passes block options as strings, but jsdoc-to-markdown
// expects typed values:
const parseValue = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^\d+$/.test(value)) return Number(value);
  return value;
};

/**
 * Renders markdown documentation from JSDoc-annotated source files.
 *
 * Usage: `<!-- AUTO-GENERATED-CONTENT:START (JSDOC:files=src/**\/*.js&heading-depth=3) -->`
 */
const JSDOC = async (_content, options = {}) => {
  const renderOptions = Object.fromEntries(
    Object.entries(options).map(([key, value]) => [key, parseValue(value)]),
  );

  const doc = await jsdoc2md.render(renderOptions);

  return doc.length > 0
    ? doc
    : `*THERE WAS AN ERROR PROCESSING ${options.files}*`;
};

const config = {
  exclude: ["node_modules"],
  transforms: {
    JSDOC,
  },
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const markdownPath = path.resolve(__dirname, "..", "README.md");

markdownMagic(markdownPath, config);
