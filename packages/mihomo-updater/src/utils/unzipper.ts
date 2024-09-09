import { gzip, tar, tgz, zip } from "compressing";

export interface ZipOptions {
  source: string;
  ext: string;
  dest: string;
}

export const unzip = ({ source, ext, dest }: ZipOptions) => {
  const promise = (() => {
    ext = ext.startsWith(".") ? ext.substring(ext.indexOf(".") + 1) : ext;
    switch (ext) {
      case "gz":
        return gzip.uncompress(source, dest);
      case "tar":
        return tar.uncompress(source, dest);
      case "tgz":
        return tgz.uncompress(source, dest);
      case "zip":
        return zip.uncompress(source, dest);
      default:
        throw new Error(`Unsupported ext: ${ext}`);
    }
  })();

  return promise;
};
