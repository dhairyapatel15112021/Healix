const mongoose = require("mongoose");
mongoose.pluralize(null);
const appointmentSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
    });

const appointment = mongoose.model("appointment",appointmentSchema);

module.exports=appointment;
