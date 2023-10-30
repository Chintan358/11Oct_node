const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    pass: {
        type: String
    }
})

userSchema.pre("save", async function () {

    if (this.isModified("pass")) {
        this.pass = await bcrypt.hash(this.pass, 10)
    }
})

userSchema.methods.generateToken = async function () {


    try {
        const token = await jwt.sign({ _id: this._id }, process.env.USKEY)
        return token
    } catch (error) {
        console.log(error);
    }

}


module.exports = new mongoose.model("User", userSchema)