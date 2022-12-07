const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Ratings = require('../models/Ratings');
const Users = require('../models/Users');

module.exports = async (req, res) => {

    if (!req?.headers?.authorization) {
        res.status(401).json({
            "message": "You are not authorised to make this request"
        })
        return
    }

    const authToken = req?.headers?.authorization.split(" ")[1]

    jwt.verify(authToken, process.env.ACCESS_TOKEN, async (error, decoded) => {

        if (error) {

            res.status(406).json({
                "message": "Auth token is not valid, please make request with valid token"
            })

            return
        }
        const {ratingId} = req.params

        await Ratings.findByIdAndUpdate(ratingId,req.body)

            .then(async (rating) => {
                
                const { ratingGivenFor } = rating

                await Ratings.aggregate([
                    { $match: { ratingGivenFor: mongoose.Types.ObjectId(ratingGivenFor) } },
                    {
                        $group:
                        {
                            _id: '$ratingGivenFor',
                            avgOverallRating: { $avg: "$overallRating" },
                            avgTeachingRating: { $avg: "$rateTeaching" },
                            totalRecommendedRatings: { $sum: { $cmp: ["$isRecommended", false] } },
                            totalRatings: { $sum: 1 },
                        },

                    }
                ]).then(async (newMetrices) => {

                    const { avgOverallRating, avgTeachingRating, totalRecommendedRatings, totalRatings } = newMetrices[0]

                    Users.findByIdAndUpdate(ratingGivenFor,
                        {
                            recomendationRate: parseInt((totalRecommendedRatings/totalRatings) * 100),
                            overallRating: avgOverallRating,
                            rateTeaching: avgTeachingRating
                        })
                        .then(_ => res.status(201).json({
                            "message": "Ratings has been updated!",  
                            "data" : {ratingGivenFor}                          
                        }))
                        .catch(e => console.error("Updating User : ", e))
                }).catch(e => console.error("Error : ", e))
                
            })
            .catch(error => res.status(406).json({
                "message": "Rating can't be submitted at the moment",
                "error": JSON.stringify(error)
            }))

    })
}