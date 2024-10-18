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

const doctor = mongoose.model("doctor",doctorSchema);

module.exports=doctor;
