const express = require("express")
const app = express()
require("dotenv").config();
const path = require("path")
const hbs = require("hbs")
const PORT = process.env.PORT

const viewPath = path.join(__dirname, "../templetes/views")
const partialPath = path.join(__dirname, "../templetes/partials")
const publicPath = path.join(__dirname, "../public")

app.set("view engine", "hbs")
app.set("views", viewPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialPath)

app.use("/", require("../router/userrouter"))
app.use("/", require("../router/adminrouter"))
app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
})
