const jwt = require("jsonwebtoken")
const User = require("../model/users")


const auth = async (req, resp, next) => {

    const token = req.header("auth-token")

    try {

        const user = await jwt.verify(token, process.env.SKEY)
        const userdata = await User.findOne({ _id: user._id })

        if (user) {
            req.userdata = userdata;
            next()
        }
        else {
            resp.send("Invalid token")
        }

    } catch (error) {
        resp.send("Invalid token")
    }


}

module.exports = auth