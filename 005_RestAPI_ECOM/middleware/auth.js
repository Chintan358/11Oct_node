const jwt = require("jsonwebtoken")

const auth = async (req, resp, next) => {

    const token = req.header("auth-token")

    try {

        const user = await jwt.verify(token, process.env.SKEY)
        if (user) {
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