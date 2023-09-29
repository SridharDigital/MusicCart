import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateCartTotal } from "../../store/userSlice"

import "./cart.css"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import leftArrow from "../../assets/leftArrow.svg"
import myCartIcon from "../../assets/myCartIcon.svg"
import DesktopHeader from "../../components/desktopHeader/DesktopHeader"
import { getCartItems } from "../../utils/getCartItems"
import { calculateTotalPrice } from "../../utils/calculateTotalPrice"

const convenienceFee = 45
const discount = 0

// const initialCartItems = [
//   {
//     featuredImage:
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/i/o/h/-original-imags36kchxetkkk.jpeg?q=70",
//     name: "Sony WH-CH720N",
//     price: 3500,
//     color: "Black",
//     isAvailable: true,
//   },
//   {
//     featuredImage:
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/i/o/h/-original-imags36kchxetkkk.jpeg?q=70",
//     name: "Sony WH-CH720N",
//     price: 4200,
//     color: "Blue",
//     isAvailable: true,
//   },
// ]

const Cart = () => {
  const [cartItems, setCartItems] = useState("")
  const userId = useSelector((state) => state.user.userId)

  const dispatch = useDispatch()

  console.log(userId)
  useEffect(() => {
    ;(async () => {
      const cartItems = await getCartItems(userId)
      console.log("The cart Item fetching is executed")
      console.log(cartItems)
      setCartItems(cartItems)
    })()
  }, [])

  const handleQuantity = (e) => {
    const productItemId = e.target.id
    const updatedQuantity = Number(e.target.value)

    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productItemId) {
        return { ...item, quantity: updatedQuantity }
      } else {
        return item
      }
    })

    setCartItems(updatedCartItems)

    // console.log({ updatedCartItems })
  }

  const totalAmount = cartItems.length > 0 && calculateTotalPrice(cartItems)
  dispatch(updateCartTotal(totalAmount))

  const MobileCart = () => {
    return (
      <ContentWrapper>
        <div className="mobile-cart-container">
          <Link to="/">
            <img src={leftArrow} className="left-arrow-icon" alt="left arrow" />
          </Link>
          <br />
          {/* <div className="cart-items-container">
            <img
              src={cartItem.featuredImage}
              className="cart-item-featured-image"
            />
            <div className="cart-items-content-container">
              <h1>{cartItem.name}</h1>
              <h2>₹{cartItem.price.toLocaleString("en-US")}</h2>
              <p>Colour : {cartItem.color}</p>
              {cartItem.isAvailable ? "In Stock" : "Out of Stock"}
              <p>Convenience Fee ₹{convenienceFee}</p>
            </div>
          </div> */}
          {cartItems.map((cartItem) => (
            <div className="cart-items-container">
              <img
                src={cartItem.featuredImage}
                className="cart-item-featured-image"
              />
              <div className="cart-items-content-container">
                <h1>{cartItem.name}</h1>
                <h2>₹{cartItem.price.toLocaleString("en-US")}</h2>
                <p>Colour : {cartItem.color}</p>
                {cartItem.isAvailable ? "In Stock" : "Out of Stock"}
                <p>Convenience Fee ₹{convenienceFee}</p>
              </div>
            </div>
          ))}
          <div className="mobile-total-container">
            <div className="total-amount-container">
              <p>Total : </p>
              <p>₹{totalAmount.toLocaleString("en-US")}</p>
            </div>
          </div>
          <hr />
          <h1 className="total-amt-heading">
            Total Amount{" "}
            <span>
              ₹{(totalAmount + convenienceFee).toLocaleString("en-US")}
            </span>
          </h1>
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <button className="place-order-btn">PLACE ORDER</button>
          </Link>
        </div>
      </ContentWrapper>
    )
  }

  const DesktopCart = () => {
    return (
      <div className="desktop-cart-container">
        <DesktopHeader displayViewCart displayPath="Home/ View Cart" />
        <ContentWrapper>
          <Link to="/" style={{ textDecoration: "none", color: "White" }}>
            <button className="product-details-back-to-products-btn">
              Back to products
            </button>
          </Link>
          <div className="my-cart-heading-flex-container">
            <div className="my-cart-heading">
              <img src={myCartIcon} className="my-cart-icon" alt="cart" />
              <h1 className="my-cart-heading-text">My Cart</h1>
            </div>
          </div>
          <div className="dt-cart-items-flex-container">
            {/* <div className="dt-cart-item-container">
              <div className="dt-cart-item-content-container">
                <img
                  src={cartItem.featuredImage}
                  alt={cartItem.name}
                  className="dt-cart-item-featured-image"
                />
                <div className="dt-cart-item-name-container">
                  <h2>{cartItem.name}</h2>
                  <p>Colour : {cartItem.color}</p>
                  <p>{cartItem.isAvailable ? "In Stock" : "Out of Stock"}</p>
                </div>
                <div className="dt-cart-item-price-container">
                  <h2>Price</h2>
                  <p>₹{cartItem.price.toLocaleString("en-US")}</p>
                </div>
                <div className="dt-cart-item-quantity-container">
                  <h2>Quantity</h2>
                  <select>
                    {Array.from(Array(8)).map((_, i) => (
                      <option value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="dt-cart-item-total-container">
                  <h2>Total</h2>
                  <p>₹{totalAmount.toLocaleString("en-US")}</p>
                </div>
              </div>
              <div className="dt-cart-items-total-container">
                <div>
                  <h3>{totalNoOfItems} Item</h3>
                  <h3>₹{totalAmount.toLocaleString("en-US")}</h3>
                </div>
              </div>
            </div> */}
            <div className="dt-cart-item-container">
              {cartItems.map((cartItem) => (
                <div className="dt-cart-item-content-container">
                  <img
                    src={cartItem.featuredImage}
                    alt={cartItem.name}
                    className="dt-cart-item-featured-image"
                  />
                  <div className="dt-cart-item-name-container">
                    <h2>{cartItem.name}</h2>
                    <p>Colour : {cartItem.color}</p>
                    <p>{cartItem.isAvailable ? "In Stock" : "Out of Stock"}</p>
                  </div>
                  <div className="dt-cart-item-price-container">
                    <h2>Price</h2>
                    <p>₹{cartItem.price.toLocaleString("en-US")}</p>
                  </div>
                  <div className="dt-cart-item-quantity-container">
                    <h2>Quantity</h2>
                    <select onChange={handleQuantity} id={cartItem.id}>
                      {Array.from(Array(8)).map((_, i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dt-cart-item-total-container">
                    <h2>Total</h2>
                    <p>
                      ₹
                      {(cartItem.price * cartItem.quantity).toLocaleString(
                        "en-US"
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div className="dt-cart-items-total-container">
                <div>
                  <h3>{cartItems.length} Item</h3>
                  <h3>₹{totalAmount.toLocaleString("en-US")}</h3>
                </div>
              </div>
            </div>

            <div className="dt-cart-item-price-details-container">
              <div className="dt-cart-item-super-container">
                <div className="dt-cart-item-price-details-list-container">
                  <h2>PRICE DETAILS</h2>
                  <div>
                    <p>Total MRP</p>
                    <p>₹{totalAmount.toLocaleString("en-US")}</p>
                  </div>
                  <div>
                    <p>Discount on MRP</p>
                    <p>₹{discount.toLocaleString("en-US")}</p>
                  </div>
                  <div>
                    <p>Convenience Fee</p>
                    <p>₹{convenienceFee.toLocaleString("en-US")}</p>
                  </div>
                </div>
                <div className="dt-cart-total-amt-place-order-btn-container">
                  <div>
                    <h3>Total Amount</h3>
                    <h3>
                      ₹{(totalAmount + convenienceFee).toLocaleString("en-US")}
                    </h3>
                  </div>
                  <Link to="/checkout" style={{ textDecoration: "none" }}>
                    <button className="place-order-btn">PLACE ORDER</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    )
  }

  return (
    <div className="cart-container">
      {cartItems.length > 0 ? (
        <>
          {MobileCart()}
          {DesktopCart()}
        </>
      ) : (
        <div className="min-page">
          <h1>Please add items to cart</h1>
        </div>
      )}
    </div>
  )
}

export default Cart
