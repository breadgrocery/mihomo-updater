import { getLatestVersion, getTarget } from "mihomo-updater";
import { arch, platform } from "node:process";

const stable = await getLatestVersion(false);
console.log(`Latest stable version: ${stable}`);

const alpha = await getLatestVersion(true);
console.log(`Latest alpha version: ${alpha}`);

console.log(`Current platform: ${platform}`);
console.log(`Current arch: ${arch}`);

const stableTarget = getTarget(platform, arch, stable, false);
console.log(stableTarget);

const alphaTarget = getTarget(platform, arch, alpha, true);
console.log(alphaTarget);

const mirror = "https://mirror.ghproxy.com";
stableTarget.saveTo("C:/mihomo-updater", target => `${mirror}/${target.url}`);
