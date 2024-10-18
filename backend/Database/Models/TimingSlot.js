const mongoose = require("mongoose");

mongoose.pluralize(null);

const slotsSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    day: {
        type: Date,
        required: true,
    },
    doctorUnavailable: [{ type: String }],
    appointmentBooked: [{ type: String }]
});

const TimingSlot = mongoose.model('slot',slotsSchema);

module.exports = TimingSlot;