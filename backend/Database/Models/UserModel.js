const mongoose = require("mongoose");
mongoose.pluralize(null);
const userSchema = new mongoose.Schema(
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
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Not Disclose'],
        },
        contact: {
            type:String,
            length:10,
        },
        age: {
            type:Number,
        },
        isDoctor:{
            type:Boolean,
            default:false,
        }
    });

const user = mongoose.model("user",userSchema);

module.exports=user;
