import axios from "axios";

const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
};

export const get = (url) => axios.get(url, header);
export const post = (url, data) => axios.post(url, data, header);
export const put = (url, data) => axios.post(url, data, header);

export default {
  get,
  post,
  put
};
