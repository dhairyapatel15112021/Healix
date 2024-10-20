const mongoose = require("mongoose");

mongoose.pluralize(null);

const prescriptionSchema = new mongoose.Schema({
    appointmentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'appointment'
       },
    description : {
        type : String,
        required : true
    },
    medicine : [{type : String , required : true}]
});

const Prescription = mongoose.model("prescription",prescriptionSchema);

module.exports = Prescription;