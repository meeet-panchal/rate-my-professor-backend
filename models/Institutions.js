const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstitutionsSchema = new Schema([{
   universityname: String,
   location:String
}]);

const Institution = mongoose.model("universities", InstitutionsSchema);

module.exports = Institution;