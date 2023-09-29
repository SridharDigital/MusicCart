import { useLocation, Link } from "react-router-dom"
import Logo from "../logo/Logo"
import ContentWrapper from "../contentWrapper/ContentWrapper"
import viewCartIcon from "../../assets/viewCartIcon.svg"

import "./desktopHeader.css"

const DesktopHeader = ({ displayViewCart, displayPath }) => {
  const location = useLocation()
  const pathText =
    location.pathname === "/" ? "home" : location.pathname.slice(1)
  const pathName = pathText[0].toUpperCase() + pathText.slice(1)

  return (
    <ContentWrapper>
      <div className="desktop-header-container">
        <div className="logo-and-breadcrumb-container">
          <Logo extraClassNames={"remove-logo-margin"} />
          <p className="path-text">{displayPath}</p>
        </div>

        {displayViewCart && (
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <button className="view-cart-btn">
              <img src={viewCartIcon} alt="cart icon" className="cart-icon" />
              View Cart
            </button>
          </Link>
        )}
      </div>
    </ContentWrapper>
  )
}

export default DesktopHeader
