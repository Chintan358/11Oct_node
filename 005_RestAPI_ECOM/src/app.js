const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const DBURL = process.env.DBURL
app.use(express.json())
const mongoose = require("mongoose")

mongoose.connect(DBURL).then(data => {
    console.log("Connected !!!!!");
}).catch(err => {
    console.log(err);
})


app.use("/users", require("../router/userrouter"))
app.use("/categories", require("../router/categoryrouter"))
app.use("/products", require("../router/productrouter"))

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})