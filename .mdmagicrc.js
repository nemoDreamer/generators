const JSDOC = require("markdown-magic-jsdoc");

module.exports = {
  ignore: ["node_modules"],
  transforms: {
    JSDOC,
  },
};
