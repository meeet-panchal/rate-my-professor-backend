const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../models/Users')

module.exports = async (req, res) => {
    const { email, password } = req.body

    //? empty fields
    if (!email || !password) {
        res.status(400).json({
            "message": "Email and Password are required."
        })
    }

    const user = await Users.findOne({ email })

    //? Email not registered
    if(!user) return res.status(404).json({
        "message" : "Email not found or not registered with us."
    }).send()

    const isPasswordValid = await bcrypt.compare(password,user.password)
    const {_id,firstName,lastName,department,institution,isStudent } = user


    if(isPasswordValid){
        const accessToken = jwt.sign(
            {'userData' : {email,isStudent}},
            process.env.ACCESS_TOKEN,
            { expiresIn: '2h' }
        )

        const refreshToken = jwt.sign(
            {'userData' : {email,isStudent}},
            process.env.REFRESH_TOKEN,
            { expiresIn: '2d' }
        )

        //? saving refreshToken in to the respective user
        Users.findOneAndUpdate({email},{refreshToken}).then(user => {

            //? setting cookie in the client side
            res.cookie('REFRESH', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 48 * 60 * 60 * 1000 });
    
    
            res.status(200).json({
                "message" : "Login successful",
                "data": {
                    userInfo:{_id,firstName,lastName,email,department,institution,isStudent},
                    accessToken
                }
            });
            
        })

    }else{
        res.status(401).json({
            "message" : "No user found for given combination.",
        })
    }

}