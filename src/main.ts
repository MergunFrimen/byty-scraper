import cron from "node-cron";
import { BezrealityClient } from "./clients/bezrealitky-client";
import { UlovdomovClient } from "./clients/ulovdomov-client";
import { config } from "./config";
import { logger } from "./logger";
import { processBezrealitkyData, processUlovdomovData } from "./process-data";
import { Posting } from "./types";
import {
  combineAndSortPostings,
  findNewPostings,
  readJsonFile,
  writeJsonFile,
} from "./utils";
import { alertAboutStopping, notifyAboutNewPosting } from "./webhook";

async function ulovdomovExecute(notifyByDiscord: boolean = false) {
  const ulovdomovData = await UlovdomovClient.getPostings();
  const ulovdomovCurrentPostings: Posting[] =
    processUlovdomovData(ulovdomovData);
  const ulovdomovSeenPostings: Posting[] = await readJsonFile(
    "./data/ulovdomov-seen.json"
  );
  const ulovdomovNewPostings = findNewPostings(
    ulovdomovSeenPostings,
    ulovdomovCurrentPostings
  );
  const ulovdomovAllPostings = combineAndSortPostings(
    ulovdomovSeenPostings,
    ulovdomovNewPostings
  );

  writeJsonFile("./data/ulovdomov-seen.json", ulovdomovAllPostings);

  if (notifyByDiscord) {
    for (const posting of ulovdomovNewPostings) {
      await notifyAboutNewPosting(posting);
    }
  }
}

async function bezrealitkyExecute(notifyByDiscord: boolean = false) {
  const bezrealitkyData = await BezrealityClient.getPostings();
  const bezrealitkyCurrentPostings: Posting[] =
    processBezrealitkyData(bezrealitkyData);
  const bezrealitkySeenPostings: Posting[] = await readJsonFile(
    "./data/bezrealitky-seen.json"
  );
  const bezrealitkyNewPostings = findNewPostings(
    bezrealitkySeenPostings,
    bezrealitkyCurrentPostings
  );
  const bezrealitkyAllPostings = combineAndSortPostings(
    bezrealitkySeenPostings,
    bezrealitkyNewPostings
  );

  writeJsonFile("./data/bezrealitky-seen.json", bezrealitkyAllPostings);

  if (notifyByDiscord) {
    for (const posting of bezrealitkyNewPostings) {
      await notifyAboutNewPosting(posting);
    }
  }
}

async function main() {
  await ulovdomovExecute(true);
  // await bezrealitkyExecute(true);
}

// Initial fetch
ulovdomovExecute(false).then(() => {
  logger.info("Initial ulovdomov fetch completed");
});
// bezrealitkyExecute(false).then(() => {
//   logger.info("Initial bezrealitky fetch completed");
// });

// Schedule task
cron.schedule(config.checkInterval, async () => {
  logger.info("Starting scheduled task");
  await main();
});

// Handle process termination
process.on("exit", async (code) => {
  await alertAboutStopping();
  logger.info("exit", `Process exit with code: ${code}`);
});

process.on("SIGTERM", async () => {
  await alertAboutStopping();
  logger.info("Application shutting down SIGTERM");
  process.exit(0);
});

process.on("SIGINT", async () => {
  await alertAboutStopping();
  logger.info("Application shutting down SIGINT");
  process.exit(0);
});

// Handle unexpected errors
process.on("uncaughtException", async (error) => {
  await alertAboutStopping();
  logger.error(
    "uncaughtException",
    `Error: ${error.message}\nStack: ${error.stack}`
  );
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", async (reason) => {
  await alertAboutStopping();
  logger.error("unhandledRejection", `Reason: ${reason}`);
  process.exit(1);
});
