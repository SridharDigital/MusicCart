import axios from "axios";

export const callApi = async (method, url, data = {}, headers = {}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  try {
    const response = await axios({
      method,
      url: `${baseUrl}${url}`,
      data,
      headers,
      params: method === "GET" ? data : {},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
