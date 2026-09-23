#!/usr/bin/env node

import path from "node:path";
import markdownMagic from "markdown-magic";
import JSDOC from "markdown-magic-jsdoc";

const config = {
  exclude: ["node_modules"],
  transforms: {
    JSDOC,
  },
};

const markdownPath = path.join(import.meta.dirname, "..", "README.md");

markdownMagic(markdownPath, config);
