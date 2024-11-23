import winston from "winston";
import { config } from "./config";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      dirname: "logs",
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({ dirname: "logs", filename: "combined.log" }),
    new winston.transports.Console(),
  ],
});

// logger.info("Starting application with config:", {
//   ulovdomov: config.ulovdomov,
//   bezrealitky: config.bezrealitky,
//   timeoutMs: config.timeoutMs,
//   maxMessageLength: config.maxMessageLength,
//   checkInterval: config.checkInterval,
// });
