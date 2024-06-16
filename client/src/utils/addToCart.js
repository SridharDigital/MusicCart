import { callApi } from "./callApi";
import Cookies from "js-cookie";

export const addToCart = async (userId, productId) => {
  // console.log("add to cart user id is ", userId);

  const token = Cookies.get("jwt_token");
  try {
    const response = await callApi(
      "POST",
      "/cart",
      {
        userId,
        productId: productId,
      },
      { Authorization: `Bearer ${token}` }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
