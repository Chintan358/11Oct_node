const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 3000
const path = require("path")
const mongoose = require("mongoose")
app.use(express.json())

const url = process.env.DBURL
mongoose.connect(url).then(data => {
    console.log("Db connected");
}).catch(err => {
    console.log(err);
})


app.use("/", require("../router/studentrouter"))





app.listen(PORT, () => {
    console.log(`server runningon port ${PORT}`);
})