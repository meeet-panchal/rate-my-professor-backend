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

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None'});
        return userData

    }).then(userData=>{

        const {_id} = userData

        User.findByIdAndUpdate(_id,{refreshToken:""}).then(_=>{
            res.status(200).json({
                "message": "User has been logged out"
            })
        })
    }).catch(error=>{ 
        res.status(401).json({
            "message": error.message
        })
    })
}