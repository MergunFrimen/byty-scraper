import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Posting } from "./types";

interface WriteJsonOptions {
  /**
   * Number of spaces to use for indentation (default: 2)
   */
  indent?: number;
  /**
   * Create directories if they don't exist (default: true)
   */
  createDirectories?: boolean;
  /**
   * Base directory for relative paths (default: process.cwd())
   */
  baseDir?: string;
}

export async function writeJsonFile<T>(
  filePath: string,
  data: T,
  options: WriteJsonOptions = {}
): Promise<void> {
  const {
    indent = 2,
    createDirectories = true,
    baseDir = process.cwd(),
  } = options;

  try {
    // Resolve the full path
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(baseDir, filePath);

    // Create directories if they don't exist
    if (createDirectories) {
      const directoryPath = path.dirname(fullPath);
      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }
    }

    // Convert data to formatted JSON string
    const jsonString = JSON.stringify(data, null, indent);

    // Write to file
    await writeFile(fullPath, jsonString, "utf-8");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error writing JSON file '${filePath}': ${error.message}`
      );
    }
    throw new Error(
      `An unknown error occurred while writing JSON file '${filePath}'`
    );
  }
}
export async function readJsonFile(
  filePath: string,
  baseDir: string = process.cwd()
): Promise<any> {
  try {
    // Resolve the full path
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(baseDir, filePath);

    // Read the file contents
    const fileContent = await readFile(fullPath, "utf-8");

    // Parse the JSON content
    const jsonData = JSON.parse(fileContent);

    return jsonData;
  } catch (error) {
    return [];
  }
}
export function findNewPostings(
  seenPostings: Posting[],
  newPostings: Posting[]
): Posting[] {
  const seenPostingIdsSet = new Set(seenPostings.map((posting) => posting.id));
  return newPostings.filter((posting) => !seenPostingIdsSet.has(posting.id));
}

export function combineAndSortPostings(
  seenPostings: Posting[],
  newPostings: Posting[]
): Posting[] {
  const newPosts = findNewPostings(seenPostings, newPostings);
  return [...seenPostings, ...newPosts].sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}

export function createMapyCzUrl(latitude: number, longitude: number) {
  const baseUrl = "https://mapy.cz/fnc/v1/showmap";
  const url = new URL(baseUrl);

  url.searchParams.set("mapset", "basic");
  url.searchParams.set("center", `${longitude},${latitude}`);
  url.searchParams.set("zoom", "14");
  url.searchParams.set("marker", "true");

  return url.toString();
}

export function getCurrentTimestamp(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatCZK(amount: number): string {
  const formatted = new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatted;
}
