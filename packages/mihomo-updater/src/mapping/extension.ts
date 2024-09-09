export type Extensions = {
  [platform: string]: {
    archive: string;
    binary: string;
  };
};

const extensions: Extensions = {
  "darwin": { archive: ".gz", binary: "" },
  "freebsd": { archive: ".gz", binary: "" },
  "linux": { archive: ".gz", binary: "" },
  "win32": { archive: ".zip", binary: ".exe" }
};
export default extensions;
