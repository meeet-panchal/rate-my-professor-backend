const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingsSchema = new Schema([{
    overallRating: Number,
    reputation:Number,
    opportunities:Number,
    facilities: Number,
    internet: Number,
    food:Number,
    club: Number,
    social:Number,
    happiness:Number,
    safety:Number,
    feedback:String,
    ratingGivenBy: { type: Schema.Types.ObjectId, ref: 'users' },
    ratingGivenFor: { type: Schema.Types.ObjectId, ref: 'universities' },
    ratingGivenOn: Date
}]);

const UniversityRating = mongoose.model("uniRatings", RatingsSchema);

module.exports = UniversityRating;