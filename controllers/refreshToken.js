const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/Users')

module.exports = async (req,res) => {
    const cookies = req.cookies;

    const REFRESH_TOKEN =  cookies?.REFRESH_TOKEN;
    

    if(!REFRESH_TOKEN){
        return res.status(401).json({
            "message": "Not a valid user"
        })
    }

    User.findOne({refreshToken: REFRESH_TOKEN}).then(userData=>{

        const { email,_id,isStudent } = userData

        jwt.verify(REFRESH_TOKEN,process.env.REFRESH_TOKEN,(error,decoded)=>{

            if(email !== decoded?.userData?.email || error) {
                res.status(403).json({
                    "message": "User is not authorized"
                })
            }
        })

        const accessToken = jwt.sign(
            {'userData' : {email,isStudent,_id}},
            process.env.ACCESS_TOKEN,
            { expiresIn: '2h' }
        );
        res.json({
            "message" : "New Access Token",
            "data" : {accessToken}
          })

    })

}