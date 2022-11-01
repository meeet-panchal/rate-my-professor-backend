require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

const PORT = process.env.PORT;
const app = new express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/register',(req,res)=>{
    res.json({message: "Success"})
})


app.listen(PORT, () => {
	console.log(`Application is running on PORT: ${PORT}`);
});

