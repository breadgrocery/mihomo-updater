export type Targets = {
  [platform: string]: {
    [arch: string]: string;
  };
};

const targets: Targets = {
  "darwin": {
    "arm64": "mihomo-darwin-arm64",
    "x64": "mihomo-darwin-amd64-compatible"
  },
  "freebsd": {
    "arm64": "mihomo-freebsd-arm64",
    "ia32": "mihomo-freebsd-386",
    "x64": "mihomo-freebsd-amd64-compatible"
  },
  "linux": {
    "arm": "mihomo-linux-armv7",
    "arm64": "mihomo-linux-arm64",
    "ia32": "mihomo-linux-386",
    "loong64": "mihomo-linux-loong64-abi2",
    "mips": "mihomo-linux-mips64",
    "mipsel": "mihomo-linux-mips64le",
    "riscv64": "mihomo-linux-riscv64",
    "s390x": "mihomo-linux-s390x",
    "x64": "mihomo-linux-amd64-compatible"
  },
  "win32": {
    "arm": "mihomo-windows-armv7",
    "arm64": "mihomo-windows-arm64",
    "ia32": "mihomo-windows-386",
    "x64": "mihomo-windows-amd64-compatible"
  }
};

export default targets;
