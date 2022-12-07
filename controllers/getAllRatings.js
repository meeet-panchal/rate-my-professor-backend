const { default: mongoose } = require("mongoose")
const Ratings = require("../models/Ratings")



module.exports = async (req, res) => {
    if (req.query.id) {
        Ratings.find({ 'ratingGivenFor': req.query.id }).populate({path:'ratingGivenBy',select:'institution department',populate:[{path:'institution',select:'universityname'},{path:'department'}]}).then(async (data) => {
            const ratingDistribution = await Ratings.aggregate([
                { $match: { ratingGivenFor: mongoose.Types.ObjectId(req.query.id) } },
                
                {$group:{
                    _id: "$overallRating",
                    totalRatings : {$sum:1},
                }},
                
                {$sort:{overallRating : 1}},
        
            ])        

            res.json({data,ratingDistribution})
            return
        })
    } else if (req.query.ratingId){
        Ratings.findById(req.query.ratingId).then(data => res.json(data))
    } else {
        Ratings.find().then(data => res.json(data))

    }
}