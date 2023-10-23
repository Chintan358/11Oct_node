const route = require("express").Router()
const mongoose = require("mongoose")
const Category = require("../model/categories")
const Product = require("../model/products")

route.post("/", async (req, resp) => {
    try {
        const prod = new Product(req.body);
        const result = await prod.save()
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

route.get("/", async (req, resp) => {
    try {

        // const result = await Product.find();

        const result = await Product.aggregate([{
            $lookup: {
                from: "categories",
                localField: "catid",
                foreignField: "_id",
                as: "categoryInfo"
            }
        }])



        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

route.put("/:id", async (req, resp) => {

    try {
        const result = await Product.findByIdAndUpdate(req.params.id, req.body)
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

route.delete("/:id", async (req, resp) => {

    try {
        const result = await Product.findByIdAndDelete(req.params.id)
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

route.get("/:id", async (req, resp) => {

    const _id = new mongoose.Types.ObjectId(req.params.id);

    try {
        // const result = await Product.findOne({ _id: req.params.id })

        const result = await Product.aggregate([{ $match: { _id: _id } }, {
            $lookup: {
                from: "categories",
                localField: "catid",
                foreignField: "_id",
                as: "categoryInfo"
            }
        }])
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

route.get("/category/:id", async (req, resp) => {

    try {
     const result = await Product.find({ catid: req.params.id });
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})



module.exports = route