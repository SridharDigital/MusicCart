const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const User = mongoose.model("User", {
  name: String,
  email: String,
  mobile: String,
  password: String,
})

app.post("/api/login", async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body
    const existingUser = await User.findOne({
      $or: [{ email: emailOrMobile.toLowerCase() }, { mobile: emailOrMobile }],
    })
    if (existingUser) {
      const existingHashedPassword = existingUser.password
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingHashedPassword
      )
      if (isPasswordMatch) {
        res.send({
          status: "SUCCESS",
          message: "Login Successful",
        })
      } else throw "Incorrect password"
      console.log("The password match status is", isPasswordMatch)
    } else {
      console.log("Error thrown")
      throw "User not found"
    }
    console.log({ existingUser })
  } catch (error) {
    console.log({ error })
    res.send({
      status: "FAIL",
      message: error,
    })
  }
})

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body
    const doEmailAlreadyExists = await User.findOne({
      email: email.toLowerCase(),
    })
    if (doEmailAlreadyExists) {
      throw "Email already exists"
      return
    }
    const doMobileAlreadyExists = await User.findOne({ mobile })
    if (doMobileAlreadyExists) {
      throw "Mobile number already exists"
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    const newUser = {
      name,
      email: email.toLowerCase(),
      mobile,
      password: hashedPassword,
    }
    await User.create(newUser)
    res.send({
      status: "SUCCESS",
      message: "The Account has been created successfully",
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`The server is running at http://localhost:${process.env.PORT}`)
  } catch (error) {
    console.log(error)
  }
})
