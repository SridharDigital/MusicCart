import axios from "axios"
import Cookies from "js-cookie"

const BASE_URL = "http://localhost:4100/api"

export const callApi = async (method, url, params) => {
  const jwtToken = Cookies.get("jwt_token")
  try {
    const response = await axios({
      method: method,
      url: BASE_URL + url,
      params: params,
      headers: {
        Authorization: jwtToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}
