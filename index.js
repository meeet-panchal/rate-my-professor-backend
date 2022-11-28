require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");

const PORT = process.env.PORT;

//? connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, (error) => {
	console.log("Database Connected Successfully!");
	error?console.error("Error: ", error):undefined;
});

const app = new express();
app.use(cookies());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

const registerUser = require('./controllers/registerUser')
app.post('/register',registerUser)

const loginUser = require('./controllers/loginUser')
app.post('/login',loginUser)

const refreshToken = require("./controllers/refreshToken")
app.post('/refreshToken',refreshToken)

const logoutUser = require("./controllers/logoutUser")
app.post('/logout',logoutUser)


app.listen(PORT, () => {
	console.log(`Application is running on PORT: ${PORT}`);
});

