const express = require("express")
const app = express()
const Razorpay = require("razorpay")
const cors = require("cors")
app.use(cors())
app.get("/payment", (req, resp) => {

    const amt = Number(req.query.amt);
    console.log(amt);
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

app.listen(3000, () => {
    console.log("Server running on port : 3000");
})