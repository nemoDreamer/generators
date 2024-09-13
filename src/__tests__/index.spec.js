#!/usr/bin/env nodemon

import log from "npmlog";
import generators from "../index";

log.heading = "index";

log.info("generators:", generators);

const name = generators.names.createName({ debug: true });
const rnd = generators.helpers.random.getRange(2, 5);

log.info("name:", name);
log.info("rnd:", rnd);
