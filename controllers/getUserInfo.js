const mongoose = require("mongoose");
const Ratings = require('../models/Ratings')
const Users = require('../models/Users')

module.exports = async(req,res) =>{
/*     if(req.query.department){
        Users.find({isStudent:req.query.isStudent,department:req.query.department})
        .populate({path:'institution',select:'universityname'}).populate({path:'department',select:'name'})
        .then(data=>res.json(data))

    } */

    if(req?.query?.id){
        Users.find({isStudent:req.query.isStudent,_id:req.query.id})
        .populate({path:'institution'}).populate({path:'department'})
        .then(data=>res.json(data))
    }else{
        Users.find({isStudent:req.query.isStudent})
        .populate({path:'institution'}).populate({path:'department'})
        .then(data=>res.json(data))
    }

}
/* Ratings.find().populate({path:'ratingGivenFor',select:'firstName lastName',populate:[{path:'institution', select:'universityname'}
,{path:'department', select:'name'}]}).populate({path:'ratingGivenBy',select:'firstName lastName'}) */
/* const calculatedRatings =  await Ratings.aggregate([
    { $match: { ratingGivenFor: mongoose.Types.ObjectId('638cae95801f4b1f4b252aa9') } },
    {
      $group:
        {
          _id: '$ratingGivenFor',
          avgOverallRating: { $avg: "$overallRating" },
          avgTeachingRating: { $avg: "$rateTeaching" },
          totalRecommendedRatings: { $sum: { $cmp: [ "$isRecommended", false ] } },
          totalRatings : {$sum:1},
        },
        
    }
  ]) */
//   res.json(req.query)

//   res.json(calculatedRatings)
// .then(data=>res.json(data))
    // Users.find().populate({path:'institution'}).populate({path:'department'}).then(data=>res.json(data))


/*     Ratings.aggregate([
        
        {$group:{
            _id: "$overallRating",
            totalRatings : {$sum:1},
        }},
        {$sort:{"overallRating" : 1}},

    ]).then(data=>res.json(data)) */