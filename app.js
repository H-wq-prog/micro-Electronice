require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const app = express();
app.use(express.json());
const post = process.env.PORT || 3000;

async function dbconnection() {
    try {
        const url = process.env.URL;
        await mongoose.connect(url);
        console.log("DB is connect")
    } catch (error) {
        console.log(error)
    }
}

dbconnection();

const User = require("./models/User")
app.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password)
            return res.status(400).json({ msg: "invaild data" })


        const existUser = await User.findOne({ email })
        if (existUser) return res.status(400).json({ msg: "accont already exist" })
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashPassword,
            role
        })
        res.status(201).json({
            msg: "data created User",
            data: user,
        })

    } catch (error) {
        console.log(error)
    }
})

app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email, !password)
            return res.status(400).json({ msg: "find one" })
        const usre = await User.findOne({ email })
        if (!user) return res.status(404).json({ msg: "your acconte is " })


        const matchpassowrd = await bcrypt.compare(password, user.hashPassword)
        if (!hashPassword) return res.status(400).json({ msg: "invalid password" })
        res.status(200).json({
            msg: "succes login"
        })
    } catch (error) {
        console.log(error)
    }
})
app.listen(post, () => {
    console.log(`the server work as ${post}`)
})