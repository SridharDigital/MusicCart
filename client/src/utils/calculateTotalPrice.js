export const calculateTotalPrice = (products) => {
  let totalPrice = 0
  for (const product of products) {
    totalPrice += product.price * product.quantity
  }
  return totalPrice
}
