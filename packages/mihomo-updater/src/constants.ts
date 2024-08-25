import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const releases = "https://github.com/MetaCubeX/mihomo/releases";

export const modulePath = fileURLToPath(import.meta.url);

export const tempDir = join(modulePath, "../../../.mihomo-updater");
