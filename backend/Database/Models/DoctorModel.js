const mongoose = require("mongoose");
mongoose.pluralize(null);
const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        contact: {
            type:String,
            length:10,
        },
        speciallisation:{
            type:String,
            required:true,
        },
        address:{
            type:String,
        },
        timingSlot:
            [{
                day:{type:Date,required:true},
                slots:[String],
            }]
        ,
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Not Disclose'],
        },
        age: {
            type: Number,
        },
        bio:{
            type:String,
        },
        degree:{
            type:String,
        },
        experience:{
            type:String,
        },
        location:{
            type:String,
        },
        isDoctor:{
            type:Boolean,
            default:true,
        }
    });

const doctor = mongoose.model("Doctor",doctorSchema);

module.exports=doctor;
