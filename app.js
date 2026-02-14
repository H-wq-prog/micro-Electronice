require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
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
app.listen(post, () => {
    console.log(`the server work as ${post}`)
})