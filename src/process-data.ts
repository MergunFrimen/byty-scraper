import { Posting } from "./types";

export function processUlovdomovData(data: any) {
  const offers = data.data.offers;
  const postings: Posting[] = offers.map((offer: any): Posting => {
    return {
      id: offer.id,
      url: `https://www.ulovdomov.cz/inzerat/${offer.seo}/${offer.id}`,
    };
  });

  return postings;
}

export function processBezrealitkyData(data: any) {
  const offers = data.data.listAdverts.list;
  const postings: Posting[] = offers.map((offer: any): Posting => {
    return {
      id: offer.id,
      url: `https://www.bezrealitky.cz/nemovitosti-byty-domy/${offer.id}`,
    };
  });

  return postings;
}
