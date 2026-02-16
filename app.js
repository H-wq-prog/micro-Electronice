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
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ msg: "your acconte is not find " })


        const matchpassowrd = await bcrypt.compare(password, user.Password)
        if (!matchpassowrd) return res.status(400).json({ msg: "invalid password" })
        res.status(200).json({
            msg: "succes login"
        })
    } catch (error) {
        console.log(error)
    }
})

const Product = require("./models/prodact")


app.post("/products", async (req, res) => {
    try {
        const { productName, salrey } = req.body;


        const product = await Product.findOne({ productName: productName });
        if (product) {
            product.stock += 1;
            await product.save();

            return res.status(200).json({
                msg: "product is here",
                data: product
            });
        } else {

            const newProduct = new Product({
                productName,
                salrey,
                stock: 1
            });

            const savedProduct = await newProduct.save();
            return res.status(201).json({
                msg: "new product",
                data: savedProduct
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: "error",
        });
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ msg: "product is not find" });
    }
});


app.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "this prodact is not find" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: "error" });
    }
});

app.listen(post, () => {
    console.log(`the server work as ${post}`)
})