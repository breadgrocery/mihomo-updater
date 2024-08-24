import { renameSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { releases, tempDir } from "./constants";
import { download } from "./utils/download";
import { unzip } from "./utils/unzipper";

export const targetMap: { [platform: string]: { [arch: string]: string } } = {
  "darwin": {
    "arm64": "mihomo-darwin-arm64",
    "x64": "mihomo-darwin-amd64-compatible"
  },
  "freebsd": {
    "arm64": "mihomo-freebsd-arm64",
    "ia32": "mihomo-freebsd-386",
    "x64": "mihomo-freebsd-amd64-compatible"
  },
  "linux": {
    "arm": "mihomo-linux-armv7",
    "arm64": "mihomo-linux-arm64",
    "ia32": "mihomo-linux-386",
    "loong64": "mihomo-linux-loong64-abi2",
    "mips": "mihomo-linux-mips64",
    "mipsel": "mihomo-linux-mips64le",
    "riscv64": "mihomo-linux-riscv64",
    "s390x": "mihomo-linux-s390x",
    "x64": "mihomo-linux-amd64-compatible"
  },
  "win32": {
    "arm": "mihomo-windows-armv7",
    "arm64": "mihomo-windows-arm64",
    "ia32": "mihomo-windows-386",
    "x64": "mihomo-windows-amd64-compatible"
  }
};

export const extensionMap: {
  [platform: string]: {
    zip: string;
    binary: string;
  };
} = {
  "darwin": { zip: ".gz", binary: "" },
  "freebsd": { zip: ".gz", binary: "" },
  "linux": { zip: ".gz", binary: "" },
  "win32": { zip: ".zip", binary: ".exe" }
};

const stableReleases = `${releases}/download`;

const alphaReleases = `${releases}/download/Prerelease-Alpha`;

export interface Target {
  alpha: boolean;
  name: string;
  url: string;
  zipName: string;
  zipExt: string;
  binaryName: string;
  binaryExt: string;
  saveTo: (dest: string) => Promise<void>;
}

export const getTarget = (
  platform: string,
  arch: string,
  version: string,
  alpha: boolean,
  rename?: (target: Target) => string
): Target => {
  platform = platform || process.platform;
  arch = arch || process.arch;

  const name = targetMap[platform]?.[arch];

  const zipExt = extensionMap[platform].zip;
  const stableUrl = `${stableReleases}/${version}/${name}-${version}${zipExt}`;
  const alphaUrl = `${alphaReleases}/${name}-${version}${zipExt}`;
  const url = alpha ? alphaUrl : stableUrl;

  const zipName = url.substring(url.lastIndexOf("/") + 1);
  const binaryExt = extensionMap[platform].binary;
  const binaryName = `${name}${binaryExt}`;

  const target = {
    alpha,
    name,
    url,
    zipName,
    zipExt,
    binaryName,
    binaryExt,
    saveTo: async (dest: string) => {
      try {
        // Download the file
        const downloaded = await download(url, join(tempDir, zipName));
        console.log(`Download completed for url: ${url}`);

        // Unzip the downloaded file
        await unzip({ source: downloaded, format: zipExt, dest });
        console.log(`Unzip completed for file: ${downloaded} to ${dest}`);

        // Rename the file
        const defaultRename = (target: Target) =>
          `mihomo${target.alpha ? "-alpha" : ""}${target.binaryExt}`;
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
