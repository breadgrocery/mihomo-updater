import fetch from "node-fetch";
import process from "node:process";
import { releases } from "./constants";
import { proxyAgent } from "./utils/proxy";

// Stable version URL
const stableVersionUrl = `${releases}/latest/download/version.txt`;
// Alpha version URL
const alphaVersionUrl = `${releases}/download/Prerelease-Alpha/version.txt`;

export const getLatestVersion = async (alpha: boolean) => {
  const url = alpha ? alphaVersionUrl : stableVersionUrl;
  try {
    const response = await fetch(url, {
      method: "GET",
      agent: proxyAgent()
    });
    const version = await response.text();
    return version.trim();
  } catch (error) {
    console.error(`Error fetching latest alpha version: ${error}`);
    process.exit(1);
  }
};
