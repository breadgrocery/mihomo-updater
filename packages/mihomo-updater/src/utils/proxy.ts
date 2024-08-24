import { Agent } from "http";
import { HttpsProxyAgent } from "https-proxy-agent";

export type Proxy = Agent | undefined;

export const proxyAgent = (): Proxy => {
  const variables = ["http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY"];
  const proxy = variables.map(variable => process.env[variable]).find(value => value);
  return proxy ? new HttpsProxyAgent(proxy) : undefined;
};
