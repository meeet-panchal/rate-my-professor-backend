const { default: mongoose } = require("mongoose")
const UniversityRating = require("../models/UniversityRating");


module.exports = (req, res) => {

    if (req.query?.id) {
        UniversityRating.find({ 'ratingGivenFor': req.query.id })
            .populate({
                path: 'ratingGivenBy', select: 'institution department',
                populate: [{ path: 'institution', select: 'universityname' }, { path: 'department' }]
            })
            .then(async (data) => {
                const ratingDistribution = await UniversityRating.aggregate([
                    { $match: { ratingGivenFor: mongoose.Types.ObjectId(req.query.id) } },

                    {
                        $group: {
                            _id: "$overallRating",
                            totalRatings: { $sum: 1 },
                        }
                    },

                    { $sort: { overallRating: 1 } },

                ])

                res.json({ data, ratingDistribution })
                return
            })
    } 
/*     else if (req.params.ratingId) {
        UniversityRating.findById(req.query.ratingId).then(data => res.json(data))
    } else {
        UniversityRating.find({}).then(data => res.json(data))
    } */

}