export type GeoX = "geoip" | "geosite" | "mmdb" | "asn";

export type Geos = {
  [geo in GeoX]: string;
};

const geos: Geos = {
  "geoip": "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip.dat",
  "geosite": "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
  "mmdb": "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country.mmdb",
  "asn": "https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
};

export default geos;
