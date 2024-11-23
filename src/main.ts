import cron from "node-cron";
import { config } from "./config";
import { logger } from "./logger";
import { sendToDiscord } from "./webhook";
import { processData } from "./process-data";
import { fetchWebsite } from "./fetcher";
import {
  combineAndSortPostings,
  findNewPostings,
  readJsonFile,
  writeJsonFile,
} from "./utils";
import { Posting } from "./types";

async function ulovdomov(notifyByDiscord: boolean = false) {
  const ulovdomovData = await fetchWebsite("ulovdomov");
  const ulovdomovCurrentPostings: Posting[] = processData(
    "ulovdomov",
    ulovdomovData
  );
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
      await sendToDiscord(posting);
    }
  }
}

async function main() {
  await ulovdomov(true);
}

// Initial fetch
ulovdomov(false).then(() => {
  logger.info("Initial fetch completed");
});

// Schedule task
cron.schedule(config.checkInterval, async () => {
  logger.info("Starting scheduled task");
  await main();
});

// Handle process termination
process.on("SIGTERM", () => {
  logger.info("Application shutting down");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("Application shutting down");
  process.exit(0);
});
