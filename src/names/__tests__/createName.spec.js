#!/usr/bin/env nodemon

import log from "npmlog";
import createName from "../createName";

log.heading = "names";

/**
 * Dumb little console dump.
 */
const main = () => {
  log.verbose("--------------------------------------------------");

  for (let x = 0; x < 50; x++) {
    const debug = createName({
      // language: createName.LANGUAGES.NORDIC,
      debug: true,
    });

    log.info(debug.languagePadded, debug.name);
  }
};

main();
