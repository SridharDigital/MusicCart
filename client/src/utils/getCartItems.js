import { callApi } from "./callApi"

export const getCartItems = async (userId) => {
  let cartItems = []
  try {
    cartItems = await callApi("GET", "/get-cart-items", { userId })
  } catch (error) {
    console.log(error)
  }

  return cartItems
}
