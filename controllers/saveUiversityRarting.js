const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const UniversityRating = require('../models/UniversityRating');
const Institutions = require('../models/Institutions');

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

        await UniversityRating.create(ratings)

            .then(async (rating) => {
                
                const { ratingGivenFor } = rating

                await UniversityRating.aggregate([
                    { $match: { ratingGivenFor: mongoose.Types.ObjectId(ratingGivenFor) } },
                    {
                        $group:
                        {
                            _id: '$ratingGivenFor',
                            avgOverallRating: { $avg: "$overallRating" },
                            avgReputation: { $avg: "$reputation" },
                            avgOpportunities: { $avg: "$opportunities" },
                            avgFacilities: { $avg: "$facilities" },
                            avgInternet: { $avg: "$internet" },
                            avgFood: { $avg: "$food" },
                            avgClub: { $avg: "$club" },
                            avgSocial: { $avg: "$social" },
                            avgHappiness: { $avg: "$happiness" },
                            avgSafety: { $avg: "$safety" },
                            totalRatings: { $sum: 1 },
                        },

                    }
                ]).then(async (newMetrices) => {

                    const { avgOverallRating, avgReputation, avgOpportunities,avgFacilities, avgInternet, avgFood, avgClub,avgSocial,
                        avgHappiness,avgSafety } = newMetrices[0]

                    Institutions.findByIdAndUpdate(ratingGivenFor,
                        {
                            overallRating: avgOverallRating,
                            reputation:avgReputation, 
                            opportunities:avgOpportunities,
                            facilities:avgFacilities, 
                            internet:avgInternet, 
                            food:avgFood, 
                            club:avgClub,
                            social:avgSocial,
                            happiness:avgHappiness,
                            safety:avgSafety,
                        })
                        .then(_ => res.status(201).json({
                            "message": "Ratings has been submitted",                            
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