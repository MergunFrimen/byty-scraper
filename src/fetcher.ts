import { client } from "./client";
import { config } from "./config";
import { logger } from "./logger";
import { Website, ApiRequest } from "./types";
import fetch from "node-fetch";

export async function fetchWebsite(website: Website): Promise<any> {
  let apiRequest: ApiRequest | undefined;

  if (website === "bezrealitky") {
    apiRequest = client.bezrealitky;
  }
  if (website === "ulovdomov") {
    apiRequest = client.ulovdomov;
  }
    
  if (!apiRequest) {
    logger.error({
      message: "Error setting up API request",
    });
    throw new TypeError();
  }

  try {
    logger.info(`Starting fetch for ${apiRequest.url}`);

    const response = await fetch(apiRequest.url, {
      method: "POST",
      headers: {
        "User-Agent": "curl/8.11.0",
        "Content-Type": "application/json",
      },
      body: apiRequest.body,
    });

    if (!response.ok) {
      logger.error({
        message: `HTTP error! status: ${response.status}`,
      });
      process.exit(1);
    }

    const data: any = await response.json();

    logger.info({
      message: "Fetch successful",
      statusCode: response.status,
      url: apiRequest.url,
    });

    return data;
  } catch (error) {
    logger.error({
      message: "Error fetching website",
      error: error instanceof Error ? error.message : "Unknown error",
      url: apiRequest.url,
    });
  }
}
