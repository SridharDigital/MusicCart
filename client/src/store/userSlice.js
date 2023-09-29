import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { validateUserLoggedin } from "../utils/validateUserLoggedin"

const initialState = {
  isUserLoggedIn: validateUserLoggedin(),
  userId: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("The action payload is ", action.payload.user.id)
      console.log("loginUser action is executed")
      Cookies.set("jwt_token", action.payload.jwtToken, {
        expires: 30,
        path: "/",
      })
      state.userId = action.payload.user.id
      state.isUserLoggedIn = validateUserLoggedin()
    },
    logoutUser: (state) => {
      Cookies.remove("jwt_Token", {
        path: "/",
      })
      console.log("logoutUser action is executed")
      state.isUserLoggedIn = validateUserLoggedin()
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer
