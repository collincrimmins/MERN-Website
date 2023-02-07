require("dotenv").config() // Use Env Variables into the App
const express = require("express")
const app = express()
const mongoose = require("mongoose") // Connect to the Mongo Database

// Middleware Function for all API Calls
app.use((Request, Response, next) => {
    console.log(Request.path + " (" + Request.method + ")")
    next()
})
app.use(express.json()) // Allows for Request.Body

// API
app.get("/", (Request, Response) => {
    Response.json({Message: "Welcome to API"})
})

// API Workouts
let APIWorkouts = require("./api/workouts")
app.use("/api/workouts", APIWorkouts)

// API Users
let APIUsers = require("./api/users")
app.use("/api/users", APIUsers)

// Connect to Database
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to Mongo Database...")
})
.catch((error) => {console.log(error)})

// Listen
app.listen(process.env.PORT, () => {
    console.log("Node Server Started on Port " + process.env.PORT + "...")
})