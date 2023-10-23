const route = require("express").Router()
const Category = require("../model/categories")


route.post("/", async (req, resp) => {
    try {
        const cat = new Category(req.body);
        const result = await cat.save()
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

route.get("/", async (req, resp) => {
    try {

        const result = await Category.find();
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

route.put("/:id", async (req, resp) => {

    try {
        const result = await Category.findByIdAndUpdate(req.params.id, req.body)
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

route.delete("/:id", async (req, resp) => {

    try {
        const result = await Category.findByIdAndDelete(req.params.id)
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})


module.exports = route