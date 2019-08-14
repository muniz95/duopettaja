import axios, { AxiosRequestConfig } from "axios";

const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
} as AxiosRequestConfig;

export const get = (url: string) => axios.get(url, header);
export const post = (url: string, data: any) => axios.post(url, data, header);
export const put = (url: string, data: any) => axios.post(url, data, header);

export default {
  get,
  post,
  put,
};
