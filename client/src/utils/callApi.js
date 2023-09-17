import axios from "axios"

const BASE_URL = "http://localhost:4100/api"

export const callApi = async (method, url, params) => {
  try {
    if (method === "GET") {
      const { data } = await axios.get(BASE_URL + url, params)
      console.log(data)
      return data
    } else if (method === "POST") {
      const { data } = await axios.post(BASE_URL + url, params)
      return data
    }
  } catch (error) {
    return error.response.data
  }
}
