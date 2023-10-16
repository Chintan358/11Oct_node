const express = require("express")
const router = express.Router()
const Student = require("../model/students")

router.get("/students", async (req, resp) => {

    try {
        const data = await Student.find();
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }

})

router.post("/students", async (req, resp) => {

    const data = req.body
    try {
        const std = new Student(data)
        const result = await std.save()
        resp.send(result)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/students/:id", async (req, resp) => {
    const _id = req.params.id

    try {
        const data = await Student.findByIdAndUpdate(_id, req.body);
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }


})

router.delete("/students/:id", async (req, resp) => {

    const _id = req.params.id
    try {
        const data = await Student.findByIdAndDelete(_id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }

})

module.exports = router