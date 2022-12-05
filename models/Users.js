const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersSchema = new Schema([{
    firstName: String,
    lastName:String,
    email: String,
    password: String,
    isStudent: Boolean,
    institution: { type: Schema.Types.ObjectId, ref: 'universities' },
    department: { type: Schema.Types.ObjectId, ref: 'departments' },
    year:Number,
    refreshToken: {type:String,default:""},
    recomendationRate:Number,
    overallRating:Number,
    rateTeaching: Number,
}]);

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;