const route = require("express").Router()

route.get("/admin", (req, resp) => {
    resp.render("adminlogin")
})

route.get("/adminhome", (req, resp) => {
    resp.render("adminhome")
})
module.exports = route