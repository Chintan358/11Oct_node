const route = require("express").Router()
const Admin = require("../model/admins")
const jwt = require("jsonwebtoken")
const aauth = require("../middleware/adminauth")
route.get("/admin", (req, resp) => {
    resp.render("adminlogin")
})

route.get("/adminhome", aauth, (req, resp) => {
    resp.render("adminhome")
})

route.get("/categories", aauth, async (req, resp) => {
    try {
        resp.render("category")
    } catch (error) {

    }
})

route.post("/alogin", async (req, resp) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username })

        if (admin.pass === req.body.pass) {

            const token = await jwt.sign({ _id: admin._id }, process.env.ASKEY);
            resp.cookie("ajwt", token)
            resp.redirect("adminhome")
        }
        else {
            resp.render("adminlogin", { "err": "Invalid credentials" })
        }

    } catch (error) {
        resp.render("adminlogin", { "err": "Invalid credentials" })
    }
})


module.exports = route