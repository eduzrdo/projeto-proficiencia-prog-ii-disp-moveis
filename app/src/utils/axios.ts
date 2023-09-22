import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.42.56:3333', // to use on development only!
})
