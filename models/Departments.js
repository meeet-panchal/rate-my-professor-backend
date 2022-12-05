const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DepartmentsSchema = new Schema([{
   name:String
}]);

const Departmens = mongoose.model("departments", DepartmentsSchema);

module.exports = Departmens;