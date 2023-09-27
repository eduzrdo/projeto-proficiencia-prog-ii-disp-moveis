import { serverConfig } from "@/config";

export const images = (id: string) => {
  return `${serverConfig.address}/avatar/${id}.png`;
};
