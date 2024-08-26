import { gzip, tar, tgz, zip } from "compressing";

export interface ZipOptions {
  source: string;
  format: string;
  dest: string;
}

export const unzip = ({ source, format, dest }: ZipOptions) => {
  const promise = (() => {
    format = format.startsWith(".") ? format.substring(format.indexOf(".") + 1) : format;
    switch (format) {
      case "gzip":
        return gzip.uncompress(source, dest);
      case "tar":
        return tar.uncompress(source, dest);
      case "tgz":
        return tgz.uncompress(source, dest);
      case "zip":
        return zip.uncompress(source, dest);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  })();

  return promise;
};
