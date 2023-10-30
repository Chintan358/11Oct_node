const jwt = require("jsonwebtoken")
const Admin = require("../model/admins")
const auth = async (req, resp, next) => {

    const token = req.cookies.ajwt
    try {
        const Verify = await jwt.verify(token, process.env.ASKEY)
        if (Verify) {
            const admin = await Admin.findOne({ _id: Verify._id })

            req.token = token
            req.admin = admin
            next()
        }
        else {
            resp.render("adminlogin", { "err": "Please login first" })
        }


    } catch (error) {
        resp.render("adminlogin", { "err": "Please login first" })
    }
}

module.exports = auth