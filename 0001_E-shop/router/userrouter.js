const route = require("express").Router()
const auth = require("../middleware/auth")
const Category = require("../model/categories")
const Product = require("../model/products")
route.get("/", async (req, resp) => {
    try {
        const cat = await Category.find();
        const prod = await Product.find();
        resp.render("index", { catdata: cat ,prod:prod})
    } catch (error) {

    }

})
route.get("/shop", (req, resp) => {
    resp.render("shop")
})

route.get("/detail", (req, resp) => {
    resp.render("detail")
})

route.get("/cart", auth, (req, resp) => {
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

//*************user registration**************** */
const User = require("../model/users")
const bcrypt = require("bcryptjs")
route.post("/ureg", async (req, resp) => {
    try {
        const user = new User(req.body)
        const data = await user.save();
        //console.log(data);
        resp.render("reg", { "msg": "Registration successful !!!" })
    } catch (error) {
        console.log(error);
    }
})



route.post("/ulogin", async (req, resp) => {
    try {

        const user = await User.findOne({ email: req.body.email })

        const isValid = await bcrypt.compare(req.body.pass, user.pass);
        if (isValid) {


            const token = await user.generateToken()
            resp.cookie("jwt", token)
            resp.render("index")
        }
        else {
            resp.render("login", { "err": "Invalid credentials" })
        }


    } catch (error) {
        resp.render("login", { "err": "Invalid credentials" })
    }
})





module.exports = route