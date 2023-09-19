import { useLocation } from "react-router-dom"
import Logo from "../logo/Logo"
import ContentWrapper from "../contentWrapper/ContentWrapper"
import cartIcon from "../../assets/cartIcon.svg"

import "./desktopHeader.css"

const DesktopHeader = () => {
  const location = useLocation()
  const pathText =
    location.pathname === "/" ? "home" : location.pathname.slice(1)
  const pathName = pathText[0].toUpperCase() + pathText.slice(1)

  return (
    <ContentWrapper>
      <div className="desktop-header-container">
        <div className="logo-and-breadcrumb-container">
          <Logo extraClassNames={"remove-logo-margin"} />
          <p className="path-text">{pathName}</p>
        </div>
        <button className="view-cart-btn">
          <img src={cartIcon} alt="cart icon" className="cart-icon" />
          View Cart
        </button>
      </div>
    </ContentWrapper>
  )
}

export default DesktopHeader
