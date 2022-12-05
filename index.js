require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const corsMiddleware = require('./middlewares/cors.middleware')
var cors = require('cors')

 

const PORT = process.env.PORT;

//? connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, (error) => {
	console.log("Database Connected Successfully!");
	error?console.error("Error: ", error):undefined;
});

const app = new express();
app.use(cors())
app.use(cookies());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsMiddleware)

const registerUser = require('./controllers/registerUser')
app.post('/register',registerUser)

const loginUser = require('./controllers/loginUser')
app.post('/login',loginUser)

const refreshToken = require("./controllers/refreshToken")
app.post('/refreshToken',refreshToken)

const logoutUser = require("./controllers/logoutUser")
app.post('/logout',logoutUser)

const getAllDepartments = require('./controllers/getAllDepartments')
app.get('/departments',getAllDepartments)

const getAllInstitutions = require('./controllers/getAllInstitutions')
app.get('/institutions',getAllInstitutions)

const getUserInfo = require('./controllers/getUserInfo')
app.get("/user",getUserInfo)

const saveRatings = require('./controllers/saveRatings')
app.post('/saveRatings',saveRatings)

const getAllRatings = require('./controllers/getAllRatings')
app.get('/ratings',getAllRatings)

app.listen(PORT, () => {
	console.log(`Application is running on PORT: ${PORT}`);
});

