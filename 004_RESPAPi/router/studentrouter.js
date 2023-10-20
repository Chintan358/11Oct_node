const express = require("express")
const router = express.Router()
const Student = require("../model/students")

router.get("/students", async (req, resp) => {

    try {
        const data = await Student.find();

        var mydata = [];
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            const dt = {
                name: data[i].name,
                email: data[i].email,
                pass: data[i].pass,
                date: new Date(data[i].date).toLocaleDateString(),
                Time: new Date(data[i].date).toLocaleTimeString()
            }
            mydata[count] = dt;
            count++;
        }


        resp.send(mydata)
    } catch (error) {
        resp.send(error)
    }

})

router.post("/students", async (req, resp) => {

    const data = { name: req.body.name, email: req.body.email, pass: req.body.pass, date: Date.now() }
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