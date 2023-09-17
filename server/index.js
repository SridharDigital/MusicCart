const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

const User = mongoose.model("User", {
  name: String,
  email: String,
  mobile: Number,
  password: String,
})

app.post("/api/user", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.send({
        status: "FAIL",
        message: "The email already exists in the database",
      })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      console.log(hashedPassword)
      const newUser = { name, email, mobile, password: hashedPassword }
      await User.create(newUser)
      res.send({
        status: "SUCCESS",
        message: "The Account has been created successfully",
      })
    }
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
