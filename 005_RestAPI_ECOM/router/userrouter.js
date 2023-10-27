const router = require("express").Router()
const User = require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

router.get("/", async (req, resp) => {
    try {
        const data = await User.find()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/:id", async (req, resp) => {
    try {
        const data = await User.findOne({ _id: req.params.id })
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})



router.post("/", async (req, resp) => {
    try {
        const user = new User(req.body)

        const savedUser = await user.save();
        resp.send(savedUser)

    } catch (error) {
        resp.send(error)
    }
})


router.put("/", auth, async (req, resp) => {
    const id = req.params.id
    const cuurentUser = req.userdata;
   
    try {
        const data = await User.findByIdAndUpdate(cuurentUser._id, req.body)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.delete("/:id", async (req, resp) => {
    const id = req.params.id
    try {
        const data = await User.findByIdAndDelete(id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.post("/login", async (req, resp) => {

    const email = req.body.email;
    const pass = req.body.pass

    try {

        const data = await User.findOne({ email: email })

        var isValid = await bcrypt.compare(pass, data.pass);
        if (isValid) {

            const token = await jwt.sign({ _id: data._id, email: data.email }, process.env.SKEY)
            resp.send("Hii ," + data.username + " this is your token - auth-token : " + token)
        }
        else {
            resp.send("Invalid credentials !!!")
        }


        // if (data) {

        //     var isValid = await bcrypt.compare(pass, data.pass)
        //     if (isValid) {
        //         resp.send("Welcome : " + data.username)
        //     }
        //     else {
        //         resp.send("Invalid credentials !!!")
        //     }

        // }
        // else {
        //     resp.send("Invalid credentials !!!")
        // }


    } catch (error) {
        resp.send("Invalid credentials...!!!")

    }

})


module.exports = router