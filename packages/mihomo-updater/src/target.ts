import { renameSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { releases, tempDir } from "./constants";
import extensions from "./mapping/extension";
import targets from "./mapping/target";
import { download, unzip } from "./utils";

// Stable version releases
const stableReleases = `${releases}/download`;
// Alpha version releases
const alphaReleases = `${releases}/download/Prerelease-Alpha`;

export interface Target {
  alpha: boolean;
  name: string;
  url: string;
  zipName: string;
  zipExt: string;
  binaryName: string;
  binaryExt: string;
  saveTo: (dest: string, mirror?: (target: Target) => string) => Promise<void>;
}

/**
 * Returns the corresponding target based on the specified platform, architecture, version.
 * @param platform The operating system platform.
 * @param arch The CPU architecture.
 * @param version The version of mihomo.
 * @param alpha A boolean indicating whether the version is an alpha release.
 * @param rename An optional callback function to modify the filename before saving.
 * @returns
 */
export const getTarget = (
  platform: string,
  arch: string,
  version: string,
  alpha: boolean,
  rename?: (target: Target) => string
): Target => {
  platform = platform || process.platform;
  arch = arch || process.arch;

  const name = targets[platform]?.[arch];

  const zipExt = extensions[platform].archive;
  const stableUrl = `${stableReleases}/${version}/${name}-${version}${zipExt}`;
  const alphaUrl = `${alphaReleases}/${name}-${version}${zipExt}`;
  const url = alpha ? alphaUrl : stableUrl;

  const zipName = url.substring(url.lastIndexOf("/") + 1);
  const binaryExt = extensions[platform].binary;
  const binaryName = `${name}${binaryExt}`;

  const target = {
    alpha,
    name,
    url,
    zipName,
    zipExt,
    binaryName,
    binaryExt,
    saveTo: async (dest: string, mirror?: (target: Target) => string) => {
      try {
        // Download the file
        const link = mirror ? mirror(target) : url;
        console.log(`Downloading from url: ${link}`);
        const downloaded = await download(link, join(tempDir, zipName));
        console.log(`Download completed from url: ${link}`);

        // Unzip the downloaded file
        console.log(`Unzipping file: ${downloaded} to ${dest}`);
        await unzip({ source: downloaded, ext: zipExt, dest });
        console.log(`Unzip completed for file: ${downloaded} to ${dest}`);

        // Rename the file
        const defaultRename = (target: Target) => {
          return `mihomo${target.alpha ? "-alpha" : ""}${target.binaryExt}`;
        };
        const newName = (rename || defaultRename)(target);
        renameSync(join(dest, binaryName), join(dest, newName));
      } catch (error) {
        console.error(`Error processing target: ${error}`);
        throw error;
      }
    }
  };

  return target;
};
