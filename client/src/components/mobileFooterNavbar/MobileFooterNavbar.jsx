import "./mobileFooterNavbar.css"

import ContentWrapper from "../contentWrapper/ContentWrapper"
import navbarCartIcon from "../../assets/navbarCartIcon.svg"
import loginIcon from "../../assets/LoginIcon.svg"
import homeIcon from "../../assets/homeIcon.svg"

const MobileFooterNavbar = () => {
  return (
    <div className="footer-nav-outer-container">
      <ContentWrapper>
        <div className="mobile-footer-navbar">
          <div className="footer-nav-icon-box active">
            <img src={homeIcon} className="footer-nav-icon" />
            <p>Home</p>
          </div>
          <div className="footer-nav-icon-box">
            <img src={navbarCartIcon} className="footer-nav-icon" />
            <p>Cart</p>
          </div>
          <div className="footer-nav-icon-box">
            <img src={loginIcon} className="footer-nav-icon" />
            <p>Login</p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default MobileFooterNavbar
