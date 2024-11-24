import { Posting } from "./types";
import { createMapyCzUrl } from "./utils";

export function processUlovdomovData(data: any) {
  const offers = data.data.offers;
  const postings: Posting[] = offers.map((offer: any): Posting => {
    const posting = {
      id: offer.id,
      postingUrl: `https://www.ulovdomov.cz/inzerat/${offer.seo}/${offer.id}`,
      imageUrl: offer.photos[0]?.path ?? undefined,
      mapyczUrl: offer.geoCoordinates
        ? createMapyCzUrl(offer.geoCoordinates.lat, offer.geoCoordinates.lng)
        : undefined,
    };
    return posting;
  });

  return postings;
}

export function processBezrealitkyData(data: any) {
  const offers = data.data.listAdverts.list;
  const postings: Posting[] = offers.map((offer: any): Posting => {
    return {
      id: offer.id,
      postingUrl: `https://www.bezrealitky.cz/nemovitosti-byty-domy/${offer.id}`,
    };
  });

  return postings;
}
