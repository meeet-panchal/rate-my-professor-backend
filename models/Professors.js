const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfessorsSchema = new Schema([{
    fullName: String,
    email: String,
    university: String,    
    password: String,
}]);

const Professors = mongoose.model("Professors", ProfessorsSchema);

module.exports = Professors;