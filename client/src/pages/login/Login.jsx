import { Link } from "react-router-dom"

import "./login.css"
import Navbar from "../../components/navbar/Navbar"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import Logo from "../../components/logo/Logo"

const Login = () => {
  return (
    <>
      <Navbar displaySearchBarinMobile={false} />
      <ContentWrapper customClasses={"contentwrapper-login"}>
        <div>
          <h1 className="login-heading">Welcome</h1>
          <div className="logo-center">
            <Logo />
          </div>
          <form className="login-form">
            <p className="weight-500 signin-text">
              Sign in.{" "}
              <span className="form-span-text">
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  Don’t have an account?
                </Link>
              </span>
            </p>
            <label htmlFor="emailOrMobile" className="label-text">
              Enter your email or mobile number
            </label>
            <input
              name="emailOrMobile"
              type="text"
              id="emailOrMobile"
              className="input-bar"
            />
            <label htmlFor="loginPassword" className="label-text">
              Password
            </label>
            <input
              name="password"
              type="text"
              id="loginPassword"
              className="input-bar"
            />
            <button className="primary-button">Continue</button>
            <p className="privacy-notice">
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </form>
          <div className="login-new-to-merchant">
            <div className="hr-container">
              <hr />
            </div>
            <p className="login-new-to-musicart-text">New to Musicart?</p>
            <div className="hr-container">
              <hr />
            </div>
          </div>

          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <button className="create-acc-button">
              Create your Musicart account
            </button>
          </Link>
        </div>
      </ContentWrapper>
    </>
  )
}

export default Login
