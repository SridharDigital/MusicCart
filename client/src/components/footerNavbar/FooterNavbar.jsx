import { Link, useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../../store/userSlice"

import "./footerNavbar.css"

import ContentWrapper from "../contentWrapper/ContentWrapper"
import navbarCartIcon from "../../assets/navbarCartIcon.svg"
import loginIcon from "../../assets/LoginIcon.svg"
import homeIcon from "../../assets/homeIcon.svg"

const navbarDisablePaths = ["/login", "/signup"]

const MobileFooterNavbar = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  let hideMobileFooterNavbar = false
  if (navbarDisablePaths.includes(location.pathname)) {
    hideMobileFooterNavbar = true
  }

  const onClickLogin = () => {
    navigate("/login")
  }

  const onClickLogout = () => {
    dispatch(logoutUser())
  }

  console.log("the current user status is = ", isUserLoggedIn)
  return (
    <>
      {!hideMobileFooterNavbar && (
        <div className="footer-nav-outer-container">
          <ContentWrapper>
            <div className="mobile-footer-navbar">
              <Link to="/">
                <button className="footer-nav-icon-button active">
                  <img src={homeIcon} className="footer-nav-icon" />
                  <p>Home</p>
                </button>
              </Link>
              <Link to="/cart">
                <button className="footer-nav-icon-button" name="home">
                  <img src={navbarCartIcon} className="footer-nav-icon" />
                  <p>Cart</p>
                </button>
              </Link>
              <button
                className="footer-nav-icon-button"
                onClick={isUserLoggedIn ? onClickLogout : onClickLogin}
              >
                <img src={loginIcon} className="footer-nav-icon" />
                <p>{isUserLoggedIn ? "Logout" : "Login"}</p>
              </button>
            </div>
          </ContentWrapper>
        </div>
      )}
      <div className="desktop-footer">
        <p>Musicart | All rights reserved</p>
      </div>
    </>
  )
}

export default MobileFooterNavbar
