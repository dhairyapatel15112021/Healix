const mongoose = require("mongoose");

mongoose.pluralize(null);

const statusSchema = new mongoose.Schema({
   appointmentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'appointment'
   },
    isVisited : {
        type : Number,
        enum : [0,1],
        default : 0
    },
    isAccepted : {
        type : Number,
        enum : [1,2,3],
        default : 1
    },
    // 1 is for appointment booked , 2 is for cancelled by user , 3 is rejected by doctor
    isPaid : {
        type : Number,
        enum : [0,1],
        default : 0
    }
});

const AppointmentStatus = mongoose.model("status",statusSchema);

module.exports = AppointmentStatus;