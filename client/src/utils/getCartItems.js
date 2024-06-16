import { callApi } from "./callApi";
import Cookies from "js-cookie";

export const getCartItems = async (userId) => {
  const token = Cookies.get("jwt_token");
  console.log({ token });
  let cartItems = [];
  try {
    cartItems = await callApi(
      "GET",
      "/cart",
      { userId },
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    console.log(error);
  }

  return cartItems;
};
