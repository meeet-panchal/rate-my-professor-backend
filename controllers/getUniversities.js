const Institution = require('../models/Institutions')
module.exports = (req,res) => {
    if(req.query?.id){
        Institution.findById(req.query.id)
        .then(data=>res.json(data))
    }else{
        Institution.find()
        .then(data=>res.json(data))
    }
}