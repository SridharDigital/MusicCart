import { Link, Navigate } from "react-router-dom"
import { useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { loginUser } from "../../store/userSlice"

import "./login.css"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import Logo from "../../components/logo/Logo"
import { callApi } from "../../utils/callApi"

const initialUserValues = { emailOrMobile: "", password: "" }

const Login = () => {
  const [user, setUser] = useState(initialUserValues)
  const [errors, setErrors] = useState({})
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn)

  const dispatch = useDispatch()

  if (isUserLoggedIn) {
    return <Navigate to="/" />
  }

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

  const handleForm = async (event) => {
    setErrors({})
    event.preventDefault()
    const isValidationSuccess = validateForm()
    if (isValidationSuccess) {
      const response = await callApi("POST", "/login", user)
      console.log(response)

      setUser(initialUserValues)
      if (response.status === "FAIL") {
        setErrors({ apiError: response.message })
      } else {
        dispatch(loginUser(response.data))
        console.log("navigation executed")
        return <Navigate to="/" />
      }
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
    return isValidationSuccess
  }

  return (
    <>
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
            {errors.apiError && (
              <p className="form-input-error-msg">{errors.apiError}</p>
            )}
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
