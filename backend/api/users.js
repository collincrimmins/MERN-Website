const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const UserModel = require("../models/userModel.js")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_JWT_TOKEN, {expiresIn: "3d"})
}

// POST Login
router.post("/login", async (Request, Response) => {
    const {email, password} = Request.body
    // Login
    try {
        // Login
        const user = await UserModel.login(email, password)
        // Create Token
        const token = createToken(user._id)
        // Return
        Response.status(200).json({email, token})
    } catch (error) {
        Response.status(400).json({error: error.message})
    }
})

// POST Signup
router.post("/signup", async (Request, Response) => {
    const {email, password} = Request.body
    // Signup
    try {
        // Signup
        const user = await UserModel.signup(email, password)
        // Create Token
        const token = createToken(user._id)
        // Return
        Response.status(200).json({email, token})
    } catch (error) {
        Response.status(400).json({error: error.message})
    }
})

module.exports = router