import "./checkout.css"
import leftArrow from "../../assets/leftArrow.svg"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"

const cartItem = {
  featuredImage:
    "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/i/o/h/-original-imags36kchxetkkk.jpeg?q=70",
  name: "Sony WH-CH720N",
  price: 3500,
  color: "Black",
  isAvailable: true,
}

const convenienceFee = 45
const totalAmount = 3545
const discount = 0
const totalNoOfItems = 1

const Checkout = () => {
  const mobileCheckout = () => {
    return (
      <div className="mobile-checkout">
        <ContentWrapper>
          <img src={leftArrow} className="left-arrow-icon" alt="left arrow" />{" "}
          <br />
          <h1 className="checkout-heading">Checkout</h1>
          <ol className="checkout-content-container">
            <li>Delivery address</li>
            <p>
              Akash Patel <br /> 104 <br />
              kk hh nagar, Lucknow <br /> Uttar Pradesh 226025
            </p>
            <li>Payment method</li>
            <p>Pay on delivery ( Cash/Card )</p>
            <li>Review items and delivery</li>
            <div className="checkout-item-content-container">
              <img
                src={cartItem.featuredImage}
                className="checkout-cart-item-featured-image"
              />
              <h2>{cartItem.name}</h2>
              <p>Colour : {cartItem.color}</p>
              <p>{cartItem.isAvailable ? "In Stock" : "Out of Stock"}</p>
              <p className="checkout-bold">
                Estimated delivery : Monday — FREE Standard Delivery
              </p>
            </div>
          </ol>
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-summary-container">
              <div>
                <p>Items</p>
                <p>₹{totalAmount.toLocaleString("en-US")}</p>
              </div>
              <div>
                <p>Delivery</p>
                <p>₹{convenienceFee}</p>
              </div>
            </div>
            <div className="order-total-container">
              <h2>Order Total :</h2>
              <h2>₹{totalAmount.toLocaleString("en-US")}</h2>
            </div>
            <button className="checkout-place-order-btn">
              Place your order
            </button>
          </div>
        </ContentWrapper>
      </div>
    )
  }

  return <>{mobileCheckout()}</>
}

export default Checkout
