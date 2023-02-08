const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Check if Record Exists
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.statics.login = async function(email, password) {
    // Validate Email & Password
    if (!email || !password) {
        throw Error("All Fields must be filled in.")
    }
    // Check User
    const user = await this.findOne({email})
    if (!user) {
        throw Error("Login Combination is not Valid.")
    }
    // Check Password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("Login Combination is not Valid.")
    }
    // Return
    return user
}

userSchema.statics.signup = async function(email, password) {
    // Validate Email & Password
    if (!email || !password) {
        throw Error("All Fields must be filled in.")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is Invalid.")
    }
    if (!validator.isStrongPassword(password)) {
        // throw Error("Password is not strong enough.")
    }
    // Check Email Exists
    const emailExists = await this.findOne({email})
    if (emailExists) {
        throw Error("Email already in Use.")
    }
    // Create Password Salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    // Create User
    const user = await this.create({email, password: hash})
    return user
}

module.exports = mongoose.model("User", userSchema)