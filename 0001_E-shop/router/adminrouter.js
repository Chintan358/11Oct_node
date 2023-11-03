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



//*******************category************** */
const Category = require("../model/categories")
route.get("/categories", aauth, async (req, resp) => {
    try {

        const data = await Category.find();
        resp.render("category", { catdata: data })
    } catch (error) {
        console.log(error);
    }
})

route.post("/addcategory", async (req, resp) => {
    try {
        const cat = new Category(req.body)
        await cat.save()
        resp.redirect("categories")
    } catch (error) {
        console.log(error);
    }
})

//****************products************* */
const Product = require("../model/products")
const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/productimg")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})

const uploadStorage = multer({ storage: storage })




route.get("/products", async (req, resp) => {
    try {

        const data = await Category.find();
        const pdata = await Product.find();
        resp.render("product", { cats: data, prod: pdata })
    } catch (error) {

    }
})


route.post("/addproduct", uploadStorage.single("img"), async (req, resp) => {

    const id = req.body.id
    try {

        if (id == "") {
            const prod = new Product({
                catid: req.body.catname,
                pname: req.body.pname,
                price: req.body.price,
                qty: req.body.qty,
                img: req.file.filename
            })
            await prod.save();
        }
        else {
            const udata = await Product.findByIdAndUpdate(id, {
                catid: req.body.catname,
                pname: req.body.pname,
                price: req.body.price,
                qty: req.body.qty,
                img: req.file.filename
            })
            fs.unlinkSync("./public/productimg/" + udata.img)
        }

        resp.redirect("products")
    } catch (error) {
        console.log(error);
    }

})

route.get("/deleteProduct", async (req, resp) => {

    const id = req.query.did
    try {
        const data = await Product.findByIdAndDelete(id);
        fs.unlinkSync("./public/productimg/" + data.img)
        resp.redirect("products")
    } catch (error) {
        console.log(error);
    }

})

route.get("/editProduct", async (req, resp) => {
    try {
        const _id = req.query.eid;
        const prod = await Product.findOne({ _id: _id })
        const data = await Category.find();
        const pdata = await Product.find();
        resp.render("product", { cats: data, prod: pdata, cprod: prod })
    } catch (error) {

    }
})

module.exports = route