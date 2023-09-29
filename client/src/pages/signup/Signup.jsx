import { Link, useNavigate, Navigate } from "react-router-dom"
import { useState } from "react"
import { callApi } from "../../utils/callApi"
import { useSelector, useDispatch } from "react-redux"
import { loginUser } from "../../store/userSlice"

import "./signup.css"
import Logo from "../../components/logo/Logo"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"

const initialUserValues = { name: "", mobile: "", email: "", password: "" }

const Signup = () => {
  const [user, setUser] = useState(initialUserValues)
  const [errors, setErrors] = useState({})
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (isUserLoggedIn) {
    return <Navigate to="/" />
  }

  const handleOnInput = (event) => {
    if (event.target.name === "mobile" && user.mobile.length >= 10) {
      return
    } else {
      setUser((prevUsers) => ({
        ...prevUsers,
        [event.target.name]: event.target.value,
      }))
    }
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
    event.preventDefault()
    setErrors({})
    const isValidationSuccess = validateForm()
    if (isValidationSuccess) {
      const response = await callApi("POST", "/signup", user)
      setUser(initialUserValues)
      if (response.status === "FAIL") {
        setErrors({ apiError: response.message })
      } else {
        dispatch(loginUser(response.data))
        navigate("/")
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
            <input
              name="name"
              type="text"
              id="name"
              className="input-bar"
              value={user.name}
              onInput={handleOnInput}
              onBlur={handleBlur}
            />
            {errors.name && (
              <p className="form-input-error-msg">{errors.name}</p>
            )}
            <label htmlFor="loginPassword" className="label-text">
              Mobile Number
            </label>
            <input
              name="mobile"
              type="number"
              id="mobile"
              className="input-bar"
              value={user.mobile}
              onInput={handleOnInput}
              onBlur={handleBlur}
            />
            {errors.mobile && (
              <p className="form-input-error-msg">{errors.mobile}</p>
            )}
            <label htmlFor="emailId" className="label-text">
              Email id
            </label>
            <input
              name="email"
              type="email"
              id="emailId"
              className="input-bar"
              value={user.email}
              onInput={handleOnInput}
              onBlur={handleBlur}
            />
            {errors.email && (
              <p className="form-input-error-msg">{errors.email}</p>
            )}
            <label htmlFor="loginPassword" className="label-text">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="input-bar"
              value={user.password}
              onInput={handleOnInput}
              onBlur={handleBlur}
            />
            {errors.password && (
              <p className="form-input-error-msg">{errors.password}</p>
            )}
            <p className="consent-msg">
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </p>
            <button className="primary-button">Continue</button>
            {errors.apiError && (
              <p className="form-input-error-msg">{errors.apiError}</p>
            )}
            <p className="privacy-notice">
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
            {errors.password && (
              <p className="form-input-error-msg">{errors.password}</p>
            )}
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
