import { Link } from "react-router-dom"
import "./orderSuccess.css"
import successImage from "../../assets/successImage.png"
import Logo from "../../components/logo/Logo"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"

const OrderSuccess = () => {
  return (
    <>
      <ContentWrapper customClasses={"order-success-center"}>
        <div className="logo-start">
          <Logo />
        </div>
        <div className="order-success-container">
          <img
            src={successImage}
            alt="success image"
            className="success-image"
          />
          <h1 className="order-success-heading">
            Order is placed successfully!
          </h1>
          <p className="order-success-text">
            You will be receiving a confirmation email with order details
          </p>
          <Link to="/">
            <button className="primary-button go-to-home-page-button">
              Go back to Home page
            </button>
          </Link>
        </div>
      </ContentWrapper>
    </>
  )
}

export default OrderSuccess
