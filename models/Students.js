const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentsSchema = new Schema([{
    firstName: String,
    lastName:String,
    email: String,
    password: String,
    isStudent: Boolean,
    institution: String,
    department: String
}]);

const Students = mongoose.model("Students", StudentsSchema);

module.exports = Students;