const Departments = require('../models/Departments')

module.exports = async(req,res)=>{
    Departments.find().then(data=>res.json({
        "message": "",
        data
    }))
}