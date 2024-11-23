import fetch, { Response } from "node-fetch";
import { config } from "./config";
import { logger } from "./logger";
import { Embed, Posting, WebhookMessage } from "./types";

export async function sendToDiscord(postings: Posting): Promise<void> {
  try {
    const embed: Embed = {
      title: "🏠 New posting",
      description: postings.url.substring(0, config.maxMessageLength - 100),
      url: postings.url.substring(0, config.maxMessageLength - 100),
      color: 65280,
      timestamp: new Date().toISOString(),
    };

    const webhookMessage: WebhookMessage = {
      username: "Website Monitor",
      embeds: [embed],
    };

    const response: Response = await fetch(config.discordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookMessage),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook error! Status: ${response.status}`);
    }

    logger.info("Successfully sent message to Discord");
  } catch (error) {
    logger.error({
      message: "Error sending to Discord",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
