import fetch from "node-fetch";
import { logger } from "../logger";

async function getAddressFromCoordinates(latitude: number, longitude: number) {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "json");
    url.searchParams.set("lat", `${latitude}`);
    url.searchParams.set("lon", `${longitude}`);
    url.searchParams.set("addressdetails", "1");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        // "User-Agent": "YourApp/1.0", // Replace with your app name
      },
    });

    if (!response.ok) {
      logger.error({
        message: `HTTP error! status: ${response.status} ${response.statusText}`,
      });
      process.exit(1);
    }

    const address = await response.json();

    // Format the address components
    const formattedAddress = {
      fullAddress: address.display_name,
      street: address.address.road || "",
      houseNumber: address.address.house_number || "",
      city:
        address.address.city ||
        address.address.town ||
        address.address.village ||
        "",
      state: address.address.state || "",
      country: address.address.country || "",
      postalCode: address.address.postcode || "",
      neighborhood:
        address.address.suburb || address.address.neighbourhood || "",
    };

    return formattedAddress;
  } catch (error) {
    logger.error({
      message: "Error getting address",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
