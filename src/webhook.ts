import fetch, { Response } from "node-fetch";
import { config } from "./config";
import { logger } from "./logger";
import { Embed, Posting, WebhookMessage } from "./types";
import { formatCZK } from "./utils";

export async function notifyAboutNewPosting(posting: Posting): Promise<void> {
  const description = [
    `Price: ${formatCZK(posting.price)}`,
    posting.postingUrl,
    posting.mapyczUrl,
  ];
  const image = posting.imageUrl
    ? {
        url: posting.imageUrl,
      }
    : undefined;
  const embed: Embed = {
    title: "🏠 New posting",
    description: description.join("\n\n"),
    color: Number("0x00ff00"),
    timestamp: new Date().toISOString(),
    image: image,
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
