import axios from 'axios'

const header = {
  'Access-Control-Allow-Origin': '*'
}

export const get = (url) => axios.get(url, header)

export default {
  get
}
