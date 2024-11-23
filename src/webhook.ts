import fetch, { Response } from "node-fetch";
import { config } from "./config";
import { logger } from "./logger";
import { Embed, Posting, WebhookMessage } from "./types";

export async function notifyAboutNewPosting(postings: Posting): Promise<void> {
  const embed: Embed = {
    title: "🏠 New posting",
    description: postings.url.substring(0, config.maxMessageLength - 100),
    url: postings.url.substring(0, config.maxMessageLength - 100),
    color: Number("0x00ff00"),
    timestamp: new Date().toISOString(),
  };
  sendToDiscord(embed);
}

export async function alertAboutStopping(): Promise<void> {
  if (!config.alertOnStopping) return;

  const embed: Embed = {
    title: "🚨 Bot killed 💀",
    color: Number("0xff0000"),
    timestamp: new Date().toISOString(),
  };
  sendToDiscord(embed);
}

async function sendToDiscord(embed: Embed): Promise<void> {
  try {
    const webhookMessage: WebhookMessage = {
      username: "Byty Bot",
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
