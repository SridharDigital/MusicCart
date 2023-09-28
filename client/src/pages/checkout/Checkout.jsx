import "./checkout.css"
import leftArrow from "../../assets/leftArrow.svg"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import DesktopHeader from "../../components/desktopHeader/DesktopHeader"

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

  const desktopCheckout = () => {
    return (
      <div className="desktop-checkout">
        <DesktopHeader />
        <ContentWrapper>
          <button className="back-to-cart-btn">Back to cart</button>
          <div className="dt-checkout-heading-flex-container">
            <h1>Checkout</h1>
          </div>
          <div className="dt-checkout-main-flex-container">
            <div className="dt-checkout-details-content-container">
              <ol className="dt-checkout-details-ol-container">
                <li>
                  <h2>1. Delivery address</h2>
                  <p>
                    Akash Patel <br /> 104 <br />
                    kk hh nagar, Lucknow <br /> Uttar Pradesh 226025
                  </p>
                </li>
                <li>
                  <h2>2. Payment method</h2>
                  <p>Pay on delivery ( Cash/Card )</p>
                </li>
                <li>
                  <h2>3. Review items and delivery</h2>
                  <div className="dt-checkout-item-content-container">
                    <img
                      src={cartItem.featuredImage}
                      className="checkout-cart-item-featured-image"
                    />
                    <h3>{cartItem.name}</h3>
                    <p>Colour : {cartItem.color}</p>
                    <p>{cartItem.isAvailable ? "In Stock" : "Out of Stock"}</p>
                    <p className="checkout-bold">
                      Estimated delivery : <br /> Monday — FREE Standard
                      Delivery
                    </p>
                  </div>
                </li>
              </ol>
              <div className="dt-place-order-container">
                <button className="checkout-place-order-btn">
                  Place your order
                </button>
                <div>
                  <h3>Order Total : ₹{totalAmount.toLocaleString("en-US")}</h3>
                  <p>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </p>
                </div>
              </div>
            </div>
            <div className="dt-place-your-order-summary-flex-container">
              <div className="dt-place-your-order-summary-container">
                <button className="checkout-place-order-btn">
                  Place your order
                </button>
                <p>
                  By placing your order, you agree to Musicart privacy notice
                  and conditions of use.
                </p>
                <hr className="checkout-hr" />
                <h3>Order Summary</h3>
                <div className="dt-order-summary-container">
                  <div>
                    <p>Items</p>
                    <div className="price-div">
                      <p>₹{totalAmount.toLocaleString("en-US")}</p>
                    </div>
                  </div>
                  <div>
                    <p>Delivery</p>
                    <div className="price-div">
                      <p>₹{convenienceFee}</p>
                    </div>
                  </div>
                </div>
                <hr className="checkout-hr" />
                <div className="dt-order-total-container">
                  <h3>Order Total :</h3>
                  <h3>₹{totalAmount.toLocaleString("en-US")}</h3>
                </div>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    )
  }

  return (
    <>
      {mobileCheckout()}
      {desktopCheckout()}
    </>
  )
}

export default Checkout
