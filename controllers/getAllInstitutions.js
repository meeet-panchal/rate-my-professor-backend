const Institutions = require('../models/Institutions')

module.exports = async(req,res)=>{
    Institutions.find().then(data=>res.json({
        "message": "",
        data
    }))
}