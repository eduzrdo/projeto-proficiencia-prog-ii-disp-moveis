import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.15.26:3333', // home network
  // baseURL: 'http://192.168.42.56:3333', // mobile network
})
