import { logger } from "./logger";
import { ulovdomovExecute } from "./main";

// Initial fetch
ulovdomovExecute(false).then(() => {
  logger.info("Initial ulovdomov fetch completed");
  process.exit(0);
});
// bezrealitkyExecute(false).then(() => {
//   logger.info("Initial bezrealitky fetch completed");
// });
