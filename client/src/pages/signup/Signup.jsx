import { Link } from "react-router-dom"

import "./signup.css"
import Navbar from "../../components/navbar/Navbar"
import Logo from "../../components/logo/Logo"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"

const Signup = () => {
  return (
    <>
      <Navbar displaySearchBarinMobile={false} />
      <ContentWrapper customClasses={"contentwrapper-login"}>
        <div>
          <h1 className="login-signup-heading">Welcome</h1>
          <div className="form-page-logo">
            <Logo />
          </div>
          <form className="login-signup-form">
            <h2 className="form-heading">
              Create account.{" "}
              <span className="form-span-text">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  Already a customer?
                </Link>
              </span>
            </h2>
            <label htmlFor="name" className="label-text">
              Your Name
            </label>
            <input name="name" type="text" id="name" className="input-bar" />
            <label htmlFor="loginPassword" className="label-text">
              Mobile Number
            </label>
            <input
              name="mobile"
              type="number"
              id="mobile"
              className="input-bar"
            />
            <label htmlFor="emailId" className="label-text">
              Email id
            </label>
            <input
              name="email"
              type="email"
              id="emailId"
              className="input-bar"
            />
            <label htmlFor="loginPassword" className="label-text">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="input-bar"
            />
            <p className="consent-msg">
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </p>
            <button className="primary-button">Continue</button>
            <p className="privacy-notice">
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </form>
          <p className="already-have-account">
            Already have an account?{" "}
            <span className="signin-option">
              {/* <a href="/login">Sign in</a> */}
              <Link to="/login">Sign in</Link>
            </span>
          </p>
        </div>
      </ContentWrapper>
    </>
  )
}

export default Signup
