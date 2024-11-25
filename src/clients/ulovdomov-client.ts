import fetch from "node-fetch";
import { logger } from "../logger";

export class UlovdomovClient {
  private static readonly _endpoint =
    "https://ud.api.ulovdomov.cz/v1/offer/find?page=1&perPage=2000&sorting=latest";
  private static readonly _body = {
    bounds: {
      northEast: { lat: 49.294485, lng: 16.7278532 },
      southWest: { lat: 49.1096552, lng: 16.4280678 },
    },
    offerType: "rent",
    propertyType: "flat",
    disposition: ["threePlusOne", "threePlusKk", "twoPlusOne"],
  };

  static async getPostings(): Promise<any | undefined> {
    try {
      logger.info("Starting fetch for ulovdomov");

      const response = await fetch(this._endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this._body),
      });

      if (!response.ok) {
        logger.error({
          message: `HTTP error! status: ${response.status} ${response.statusText}`,
        });
        process.exit(1);
      }

      const data = await response.json();

      logger.info({
        message: "Fetch to ulovdomov successful",
      });

      return data;
    } catch (error) {
      logger.error({
        message: "Error fetching from ulovdomov",
        error: error instanceof Error ? error.message : "Unknown error",
        url: this._endpoint,
      });
    }
  }
}
