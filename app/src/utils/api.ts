import axios from "axios";

export const api = axios.create({
  // CHANGE TO SERVER ADDRESS AND PORT
  baseURL: 'http://192.168.15.26:3333',
})
