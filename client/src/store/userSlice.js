import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { validateUserLoggedin } from "../utils/validateUserLoggedin"

const initialState = {
  isUserLoggedIn: validateUserLoggedin(),
  userId: Cookies.get("userId"),
  cartToatal: 0,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      // console.log("The action payload is ", action.payload.user.id)
      // console.log("loginUser action is executed")
      Cookies.set("jwt_token", action.payload.jwtToken, {
        expires: 30,
        path: "/",
      })
      Cookies.set("userId", action.payload.user.id, {
        expires: 30,
        path: "/",
      })
      state.userId = action.payload.user.id
      state.isUserLoggedIn = validateUserLoggedin()
    },
    logoutUser: (state) => {
      Cookies.remove("jwt_token", { path: "/" })
      Cookies.remove("userId", { path: "/" })
      console.log("logoutUser action is executed")
      state.isUserLoggedIn = validateUserLoggedin()
    },
    updateCartTotal: (state, action) => {
      state.cartToatal = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, updateCartTotal } = userSlice.actions

export default userSlice.reducer
