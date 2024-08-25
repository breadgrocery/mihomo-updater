export type Extensions = {
  [platform: string]: {
    zip: string;
    binary: string;
  };
};

const extensions: Extensions = {
  "darwin": { "zip": ".gz", "binary": "" },
  "freebsd": { "zip": ".gz", "binary": "" },
  "linux": { "zip": ".gz", "binary": "" },
  "win32": { "zip": ".zip", "binary": ".exe" }
};
export default extensions;
