import fetch from "node-fetch";
import { createWriteStream, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { createProgressBar } from "./progress";
import { proxyAgent } from "./proxy";

export const download = async (url: string, path: string) => {
  return new Promise<string>((resolve, reject) => {
    fetch(url, {
      method: "GET",
      agent: proxyAgent(),
      headers: { "Content-Type": "application/octet-stream" }
    })
      .then(async response => {
        mkdirSync(dirname(path), { recursive: true });
        if (response.body) {
          const progress = createProgressBar({
            total: Number(response.headers.get("Content-Length")) || 0
          });
          response.body.on("data", chunk => progress.tick(chunk.length));

          response.body
            .pipe(createWriteStream(path))
            .on("finish", () => resolve(path))
            .on("error", reject);
        } else {
          reject(new Error("Empty response body"));
        }
      })
      .catch(reject);
  });
};
