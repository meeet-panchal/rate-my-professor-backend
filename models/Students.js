const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema([{
    date: String,
    time:String,
    isTimeSlotAvailable:{type:Boolean,default:true},
    isSlotActive: {type:Boolean,default:false}
}]);

const Appointments = mongoose.model("Appointments", AppointmentsSchema);

module.exports = Appointments;