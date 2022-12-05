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
        const { userData: { _id } } = decoded

        const ratings = { ...req.body, ratingGivenBy: _id, ratingGivenOn: new Date() }

        await Ratings.create(ratings)

            .then(async (rating) => {
                console.log("Rating Created !!");
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

                    console.log("Aggregate Function Called!!");
                    console.info("newMetrices : ",newMetrices)

                    const { avgOverallRating, avgTeachingRating, totalRecommendedRatings, totalRatings } = newMetrices[0]

                    Users.findByIdAndUpdate(ratingGivenFor,
                        {
                            recomendationRate: parseInt((totalRecommendedRatings/totalRatings) * 100),
                            overallRating: avgOverallRating,
                            rateTeaching: avgTeachingRating
                        })
                        .then(_ => res.status(201).json({
                            "message": "Ratings has been submitted",                            
                        }))
                        .catch(e => console.error("Updating User : ", e))
                }).catch(e => console.error("Error : ", e))
                
            })
/*             .catch(error => res.status(406).json({
                "message": "Rating can't be submitted at the moment",
                "error": JSON.stringify(error)
            })) */

        // res.json(ratings)
    })
}

/* (error,decoded)=>{

    if(email !== decoded?.userData?.email || error) {
        res.status(403).json({
            "message": "User is not authorized"
        })
    }
} */