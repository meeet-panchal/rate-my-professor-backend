const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersSchema = new Schema([{
    firstName: String,
    lastName:String,
    email: String,
    password: String,
    isStudent: Boolean,
    institution: String,
    department: String,
    refreshToken: {type:String,default:""}
}]);

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;