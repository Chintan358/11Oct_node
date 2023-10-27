const route = require("express").Router()


route.get("/", (req, resp) => {
    resp.render("index")
})
route.get("/shop", (req, resp) => {
    resp.render("shop")
})

route.get("/detail", (req, resp) => {
    resp.render("detail")
})

route.get("/cart", (req, resp) => {
    resp.render("cart")
})

route.get("/contact", (req, resp) => {
    resp.render("contact")
})

route.get("/login", (req, resp) => {
    resp.render("login")
})

route.get("/reg", (req, resp) => {
    resp.render("reg")
})

module.exports = route