import axios from "axios";
import { LocalStorageService } from "./local-storage-service";

const authToken = LocalStorageService.get('Bearer');
const baseURL = "https://api.themoviedb.org/3";
const Authorization = `Bearer ${authToken}`;

const instance = axios.create({
  baseURL,
  headers: {
    Authorization,
  },
});

axios.interceptors.request.use(function (config) {
  console.log("config");
  return config;
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log("response");
  // TODO: save token to local storage
  return response;
});

export { instance };
