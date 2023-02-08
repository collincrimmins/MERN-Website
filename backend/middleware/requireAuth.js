const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")

const requireAuth = async (Request, Response, next) => {
    // Verify Authentication
    const {authorization} = Request.headers
    if (!authorization) {
        return Response.status(401).json({error: "Authorization required."})
    }
    // Get Token
    const token = authorization.split(" ")[1]
    try {
        // Verify Token
        const {_id} = jwt.verify(token, process.env.SECRET_JWT_KEY)
        // Get User
        Request.user = await UserModel.findOne({_id}.select("_id"))
        next()
    } catch (error) {
        console.log(error)
        Response.status(401).json({error: "Request not authorized."})
    }
}

module.exports = requireAuth