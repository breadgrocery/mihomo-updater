import { renameSync } from "node:fs";
import { join } from "node:path";
import { GeoX } from "./mapping/geos";
import geos from "./mapping/geos";
import { download } from "./utils/download";

export interface Geo {
  url: string;
  saveTo: (dest: string, mirror?: (geo: Geo) => string) => Promise<void>;
}

/**
 * Returns the corresponding geo based on the specified type.
 * @param geoX Geo type.
 * @param rename An optional callback function to modify the filename before saving.
 * @returns
 */
export const getGeo = (geoX: GeoX, rename?: (geo: Geo) => string) => {
  const url = geos[geoX];
  const filename = url.substring(url.lastIndexOf("/") + 1);

  const geo: Geo = {
    url,
    saveTo: async (dest: string, mirror?: (geo: Geo) => string) => {
      // Download the file
      const link = mirror ? mirror(geo) : url;
      console.log(`Downloading from url: ${link}`);
      const downloaded = await download(link, join(dest, filename));

      // Rename the file
      const defaultRename = () => filename;
      const newName = (rename || defaultRename)(geo);
      renameSync(downloaded, join(dest, newName));
    }
  };
  return geo;
};
