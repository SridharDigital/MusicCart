import { useLocation, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../../store/userSlice"

import "./navbar.css"
import phoneIcon from "../../assets/phoneIcon.svg"
import MobileNavbar from "./mobileNavbar/MobileNavbar"
import ContentWrapper from "../contentWrapper/ContentWrapper"

const navbarDisablePaths = ["/order-success", "/login", "/signup"]

const Navbar = ({ displaySearchBarinMobile, history }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn)
  const userId = useSelector((state) => state.user.userId)
  const dispatch = useDispatch()
  const location = useLocation()

  let hideDesktopNavbar = false
  if (navbarDisablePaths.includes(location.pathname)) {
    hideDesktopNavbar = true
  }

  console.log("The user Id is", userId)

  const desktopNavbar = () => {
    return (
      <div className="desktop-navbar-container">
        <ContentWrapper customClasses={"desktop-navbar-container-el"}>
          <div className="navbar-flex-box">
            <img src={phoneIcon} alt="phone icon" className="phone-icon" />
            <p className="text-white">912121131313</p>
          </div>
          <div className="navbar-flex-box navbar-center-box">
            <button className="navbar-btn">
              Get 50% off on selected items
            </button>
            <div className="hr-line-1"></div>
            <Link to="/">
              <button className="navbar-btn">Shop Now</button>
            </Link>
          </div>
          <div className="navbar-flex-box authentication-box">
            {isUserLoggedIn ? (
              <button
                className="navbar-btn"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="navbar-btn">Login</button>
                </Link>
                <div className="hr-line-2"></div>
                <Link to="/signup">
                  <button className="navbar-btn">Signup</button>
                </Link>
              </>
            )}
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
