const route = require("express").Router()
const auth = require("../middleware/auth")
const Category = require("../model/categories")
const Product = require("../model/products")
route.get("/", async (req, resp) => {
    try {
        const cat = await Category.find();
        const prod = await Product.find();

        resp.render("index", { catdata: cat, prod: prod })
    } catch (error) {

    }

})

route.get("/home", auth, async (req, resp) => {
    try {
        const cat = await Category.find();
        const prod = await Product.find();
        const cart = await Cart.find({ uid: req.user._id })
        resp.render("index", { catdata: cat, prod: prod, totalproduct: cart.length })
    } catch (error) {

    }

})
route.get("/shop", (req, resp) => {
    resp.render("shop")
})

route.get("/detail", (req, resp) => {
    resp.render("detail")
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
            resp.redirect("home")
        }
        else {
            resp.render("login", { "err": "Invalid credentials" })
        }


    } catch (error) {
        resp.render("login", { "err": "Invalid credentials" })
    }
})

//**************cart**************** */
const Cart = require("../model/carts")
const products = require("../model/products")
route.get("/addtocart", auth, async (req, resp) => {
    try {

        const pid = req.query.pid
        const uid = req.user._id
        const prod = await Product.findOne({ _id: pid })
        const cart = new Cart({ pid: pid, uid: uid, qty: 1, total: prod.price })
        const cdata = await cart.save()
        console.log(cdata);
        resp.send("Product added into cart")
    } catch (error) {
        console.log(error);
    }
})

route.get("/cart", auth, async (req, resp) => {

    try {

        const cdata = await Cart.aggregate([{ $match: { uid: req.user._id } }, {
            $lookup: {
                from: "products",
                localField: "pid",
                foreignField: "_id",
                as: "product"
            }
        }])

        var total = 0;
        for (var i = 0; i < cdata.length; i++) {
            total = total + cdata[i].total
        }




        resp.render("cart", { cdata: cdata, total: total, totalproduct: cdata.length })

    } catch (error) {
        console.log(error);
    }

})

route.get("/removeCart", async (req, resp) => {
    try {
        const id = req.query.cartid
        const data = await Cart.findByIdAndDelete(id);
        resp.send("product deleted")
    } catch (error) {
        console.log(error);
    }
})

route.get("/changeQty", async (req, resp) => {
    try {
        const cartid = req.query.cartid
        const qty = req.query.qty

        const cartdata = await Cart.findOne({ _id: cartid })
        const pdata = await Product.findOne({ _id: cartdata.pid })

        const q = cartdata.qty + Number(qty);
        if (q < 0) {

        }
        else {
            const total = q * pdata.price;

            const data = await Cart.findByIdAndUpdate(cartid, { qty: q, total: total })

            console.log(data);
        }
        resp.send("updated")
    } catch (error) {
        console.log(error);
    }
})

//***************payment************** */
const Razorpay = require("razorpay")

route.get("/payment", (req, resp) => {

    const amt = Number(req.query.amt);

    var instance = new Razorpay({
        key_id: 'rzp_test_d9JbS1BeWue9U8',
        key_secret: 'AFZZpaM2Cv5SZ4jbVvA1waRj'
    });

    var options = {
        amount: amt * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {

        if (err) {
            console.log(err);
            return;
        }
        resp.send(order)
    });

})
//************************order**** */
const Order = require("../model/orders")

route.get("/order", auth, async (req, resp) => {
    const payid = req.query.payid
    const user = req.user
    try {

        const carts = await Cart.find({ uid: user._id })

        var product = [];
        for (var i = 0; i < carts.length; i++) {
            product[i] = {
                pid: carts[i].pid,
                qty: carts[i].qty
            }
        }

        const order = new Order({ uid: user._id, payid: payid, product: product })
        await order.save()

        await Cart.deleteMany({ uid: user._id });

        resp.send("order confirmed !!!")


    } catch (error) {

    }
})



module.exports = route