const jwt = require("jsonwebtoken")
const User = require("../model/users")
const auth = async (req, resp, next) => {

    const token = req.cookies.jwt
    try {
        const Verify = await jwt.verify(token, process.env.USKEY)
        if (Verify) {
            const user = await User.findOne({ _id: Verify._id })

            req.token = token
            req.user = user
            next()
        }
        else {
            resp.render("login", { "err": "Please login first" })
        }


    } catch (error) {
        resp.render("login", { "err": "Please login first" })
    }
}

module.exports = auth