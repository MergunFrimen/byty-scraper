export interface Config {
  alertOnStopping: boolean;
  timeoutMs: number;
  discordWebhook: string;
  maxMessageLength: number;
  checkInterval: string;
}

export interface Embed {
  title?: string;
  description?: string;
  color?: number;
  url?: string;
  timestamp?: string;
  footer?: {
    text: string;
  };
  image?: EmbedImage;
}

export interface EmbedImage {
  url: string;
  height?: number;
  width?: number;
}

export interface WebhookMessage {
  username: string;
  embeds: Array<Embed>;
}

export interface Posting {
  id: string;
  postingUrl: string;
  imageUrl?: string;
  mapyczUrl?: string;
}

export type AdvertListVariables = {
  limit: number;
  offset: number;
  order: "TIMEORDER_DESC";
  locale: string;
  offerType: string[];
  estateType: string[];
  disposition: string[];
  regionOsmIds: string[];
  location: string;
  currency: string;
  construction: any[];
};

export type AdvertListResponse = {
  data: {
    listAdverts: {
      list: Array<{
        id: string;
        uri: string;
        estateType: string;
        offerType: string;
        disposition: string;
        // ... add other fields you need
      }>;
      totalCount: number;
      __typename: string;
    };
    actionList: {
      totalCount: number;
      __typename: string;
    };
  };
};
