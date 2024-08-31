# mihomo-updater

An updater API designed to simplify the process of downloading [Mihomo](https://github.com/MetaCubeX/mihomo) files.

### Install

```
npm install -D mihomo-updater
```

### Uasage

```typescript
import { getGeo, getLatestVersion, getTarget } from "mihomo-updater";
import { arch, platform } from "node:process";

const dest = "path/to/store/files";

// Download the latest version of mihomo
const alpha = false;
const version = await getLatestVersion(alpha);
await getTarget(platform, arch, version, alpha).saveTo(dest);

// Download mmdb and rename it to 'Country.mmdb'
await getGeo("mmdb", () => "Country.mmdb").saveTo(dest);
```
