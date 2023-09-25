import "./cart.css"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import leftArrow from "../../assets/leftArrow.svg"

const convenienceFee = 45
const totalAmount = 3545

const Cart = () => {
  const cartItem = {
    featuredImage:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/i/o/h/-original-imags36kchxetkkk.jpeg?q=70",
    name: "Sony WH-CH720N",
    price: 3500,
    color: "Black",
    isAvailable: true,
  }

  const MobileCart = () => {
    return (
      <div className="mobile-cart-container">
        <img src={leftArrow} className="left-arrow-icon" alt="left arrow" />{" "}
        <br />
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
        <div className="mobile-total-container">
          <div className="total-amount-container">
            <p>Total : </p>
            <p>₹{totalAmount.toLocaleString("en-US")}</p>
          </div>
        </div>
        <hr />
        <h1 className="total-amt-heading">
          Total Amount <span>₹{totalAmount.toLocaleString("en-US")}</span>
        </h1>
        <button className="place-order-btn">PLACE ORDER</button>
      </div>
    )
  }
  return (
    <div className="cart-container">
      <ContentWrapper>{MobileCart()}</ContentWrapper>
    </div>
  )
}

export default Cart
