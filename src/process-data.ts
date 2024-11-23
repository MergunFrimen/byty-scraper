import { Posting, Website } from "./types";

export function processData(website: Website, data: any) {
  switch (website) {
    case "bezrealitky":
      return processBezrealitkyData(data);
    case "ulovdomov":
      return processUlovdomovData(data);
    default:
      throw new TypeError();
  }
}

function processUlovdomovData(data: any) {
  const offers = data.data.offers;
  const postings: Posting[] = offers.map((offer: any): Posting => {
    return {
      id: offer.id,
      url: `https://www.ulovdomov.cz/inzerat/${offer.seo}/${offer.id}`,
    };
  });

  return postings;
}

function processBezrealitkyData(data: any) {
  const offers = data.data.listAdverts.list;
  const postings: Posting[] = offers.map((offer: any): Posting => {
    return {
      id: offer.id,
      url: `https://www.bezrealitky.cz/nemovitosti-byty-domy/${offer.id}`,
    };
  });

  return postings;
}
