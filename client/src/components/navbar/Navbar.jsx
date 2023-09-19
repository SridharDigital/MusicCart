import { useLocation } from "react-router-dom"
import "./navbar.css"
import phoneIcon from "../../assets/phoneIcon.svg"
import MobileNavbar from "./mobileNavbar/MobileNavbar"
import ContentWrapper from "../contentWrapper/ContentWrapper"

const Navbar = ({ displaySearchBarinMobile, history }) => {
  const location = useLocation()

  const navbarDisablePaths = ["/order-success", "/login", "/signup"]

  let hideDesktopNavbar = false
  if (navbarDisablePaths.includes(location.pathname)) {
    hideDesktopNavbar = true
  }

  const desktopNavbar = () => {
    return (
      <div className="desktop-navbar-container">
        <ContentWrapper customClasses={"desktop-navbar-container-el"}>
          <div className="navbar-flex-box">
            <img src={phoneIcon} alt="phone icon" className="phone-icon" />
            <p className="text-white">912121131313</p>
          </div>
          <div className="navbar-flex-box">
            <button className="navbar-btn">
              Get 50% off on selected items
            </button>
            <div className="hr-line-1"></div>
            <button className="navbar-btn">Shop Now</button>
          </div>
          <div className="navbar-flex-box">
            <button className="navbar-btn">Login</button>
            <div className="hr-line-2"></div>
            <button className="navbar-btn">Signup</button>
          </div>
        </ContentWrapper>
      </div>
    )
  }

  return (
    <>
      <MobileNavbar displaySearchBarinMobile={displaySearchBarinMobile} />
      {!hideDesktopNavbar && desktopNavbar()}
    </>
  )
}

export default Navbar
