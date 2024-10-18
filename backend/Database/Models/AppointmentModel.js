const mongoose = require("mongoose");
mongoose.pluralize(null);
const appointmentSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname : {
            type : String,
            required : true,
        },
        gender : {
            type : String,
            required : true,
            enum: ['Male', 'Female', 'Not Disclose'],
        },
        age : {
            type : Number,
            required : true
        },
        weight : {
            type : Number,
            required : true
        },
        contact : {
            type : Number,
            required : true,
            length : 10
        },
        address : {
            type : String,
            required : true,
        },
        date : {
            type : Date,
            required : true,
        },
        doctorId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'doctor'
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        },
        time : {
            type : String,
            required : true
        }
    });

const Appointment = mongoose.model("appointment",appointmentSchema);

module.exports= Appointment;
