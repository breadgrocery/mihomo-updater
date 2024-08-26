import ProgressBar from "progress";

export interface ProgressOptions {
  title?: string;
  total: number;
  width?: number;
}
export const createProgressBar = (options: ProgressOptions) => {
  const { title = "Processing", total, width = 50 } = options;
  return new ProgressBar(`${title} [:bar] :rate/bps :percent :etas`, {
    total,
    width,
    complete: "=",
    incomplete: " ",
    clear: false
  });
};
