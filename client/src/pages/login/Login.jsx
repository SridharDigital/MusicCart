import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import "./login.css"
import Navbar from "../../components/navbar/Navbar"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import Logo from "../../components/logo/Logo"

const initialUserValues = { emailOrMobile: "", password: "" }

const Login = () => {
  const [user, setUser] = useState(initialUserValues)
  const [errors, setErrors] = useState({})

  const handleOnInput = (event) => {
    setUser((prevUsers) => ({
      ...prevUsers,
      [event.target.name]: event.target.value,
    }))
  }

  const handleBlur = (event) => {
    if (event.target.value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: "Field cannot be empty",
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: false,
      }))
    }
  }

  const handleForm = (event) => {
    console.log(event)
    event.preventDefault()
    const isValidationSuccess = validateForm()
    if (isValidationSuccess) {
      setUser(initialUserValues)
      console.log("Execute Apis")
    } else {
      console.log(false)
    }
  }

  const validateForm = () => {
    let isValidationSuccess = true
    const userInputFields = Object.keys(user)
    userInputFields.map((eachField) => {
      if (!user[eachField]) {
        isValidationSuccess = false
        setErrors((prevErrors) => ({
          ...prevErrors,
          [eachField]: "Field cannot be empty",
        }))
      }
    })

    // if (!user.password) {
    //   isValidationSuccess = false
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     password: "Field cannot be empty",
    //   }))
    // }
    return isValidationSuccess
  }
  console.log(user)
  return (
    <>
      <Navbar displaySearchBarinMobile={false} />
      <ContentWrapper customClasses={"contentwrapper-login"}>
        <div>
          <h1 className="login-signup-heading">Welcome</h1>
          <div className="form-page-logo">
            <Logo />
          </div>
          <form className="login-signup-form" onSubmit={handleForm}>
            <p className="form-heading">
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
              value={user.emailOrMobile}
              onInput={handleOnInput}
              onBlur={handleBlur}
            />
            {errors.emailOrMobile && (
              <p className="form-input-error-msg">{errors.emailOrMobile}</p>
            )}
            <label htmlFor="loginPassword" className="label-text">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="loginPassword"
              className="input-bar"
              value={user.password}
              onInput={handleOnInput}
              onBlur={handleBlur}
            />
            {errors.password && (
              <p className="form-input-error-msg">{errors.password}</p>
            )}
            <button className="primary-button" type="submit">
              Continue
            </button>
            <p className="privacy-notice">
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </form>
          <div className="login-new-to-musicart">
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
