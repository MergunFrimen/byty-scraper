export type Website = "ulovdomov" | "bezrealitky";

export interface ApiRequest {
  url: string;
  body: any;
}

export interface Client {
  ulovdomov: ApiRequest;
  bezrealitky: ApiRequest;
}

export interface Config {
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
}

export interface WebhookMessage {
  username: string;
  embeds: Array<Embed>;
}

export interface Posting {
  id: string;
  url: string;
}
