const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstitutionsSchema = new Schema([{
   universityname: String,
   location:String,
   overallRating:Number,
   reputation:Number,
   opportunities:Number,
   facilities:Number,
   internet:Number,
   food:Number,
   club:Number,
   social:Number,
   happiness:Number,
   safety:Number
   
}]);

const Institution = mongoose.model("universities", InstitutionsSchema);

module.exports = Institution;