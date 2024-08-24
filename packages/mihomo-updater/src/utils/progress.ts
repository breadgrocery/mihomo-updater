import ProgressBar from "progress";

export interface Options {
  total: number;
  width?: number;
}
export const createProgressBar = (options: Options) => {
  const { total, width = 50 } = options;
  return new ProgressBar("Downloading [:bar] :percent :etas", {
    total,
    width,
    complete: "=",
    incomplete: " "
  });
};
