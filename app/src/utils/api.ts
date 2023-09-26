import axios from "axios";

import { appConfig } from "@/config";

export const api = axios.create({
  // baseURL: 'http://192.168.15.26:3333', // home network
  baseURL: `http://${appConfig.serverAddress}:${appConfig.serverPort}`, // mobile network  
})
