import dotenv from "dotenv";
import { logger } from "./logger";
import { Config } from "./types";

dotenv.config();

if (!process.env.DISCORD_WEBHOOK_URL) {
  logger.error("DISCORD_WEBHOOK_URL is not set in environment variables");
  process.exit(1);
}

export const config: Config = {
  alertOnStopping: true,
  timeoutMs: 5000,
  discordWebhook: process.env.DISCORD_WEBHOOK_URL,
  maxMessageLength: 2000,
  checkInterval: "*/1 * * * *", // every hour
};
