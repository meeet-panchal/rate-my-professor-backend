const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingsSchema = new Schema([{
    overallRating: Number,
    tags: [String],
    rateTeaching: Number,
    isAttendanceMandatory: Boolean,
    isRecommended: Boolean,
    isCourseTakenForCredit: Boolean,
    isTextbookPreferred: Boolean,
    feedback: String,
    examTypes: [String],
    ratingGivenBy: { type: Schema.Types.ObjectId, ref: 'users' },
    ratingGivenFor: { type: Schema.Types.ObjectId, ref: 'users' },
    ratingGivenOn: Date
}]);

const Ratings = mongoose.model("ratings", RatingsSchema);

module.exports = Ratings;