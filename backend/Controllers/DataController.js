const mongoose = require("mongoose");
const doctor = require("../Database/Models/DoctorModel");
const TimingSlot = require("../Database/Models/TimingSlot");
const AppointmentStatus = require("../Database/Models/AppointmentStatus");
const Appointment = require("../Database/Models/AppointmentModel");

const getSpeciallison = async (req, res) => {
    try {
        if (req.user.isDoctor) {
            return res.status(400).send("You Are Not Authorised!");
        }
        const Data = await doctor.find({ speciallisation: { $exists: true, $ne: "" } }, { speciallisation: 1, _id: 1 });
        res.status(200).json({ data: Data });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const getTime = async (req, res) => {
    try {
        if (req.user.isDoctor) {
            return res.status(400).send("You Are Not Authorised!");
        }
        let { date, id } = req.body;
        date = date.toISOString().split("T")[0];
        const timingSlot = await TimingSlot.findOne({ doctorId: id, day: date });
        if (!timingSlot) {
            return res.status(200).json({ EmptyArray: true });
        }
        const slot = [...timingSlot.doctorUnavailable, ...timingSlot.appointmentBooked];
        res.status(200).json({ timeData: slot })
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const cancleSlot = async (req, res) => {
    try {
        const User = req.user;
        if (!User.isDoctor) {
            return res.status(400).send("You Are Not Authorised!");
        }
        let { time, date } = req.body;
        date = date.toISOString().split("T")[0];
        let timingslot = await TimingSlot.findOne({ doctorId: User._id, day: date });
        if (!timingslot) {
            const slot = new TimingSlot({ doctorId: User._id, day: date, doctorUnavailable: [time], appointmentBooked: [] });
            await slot.save();
        }
        else if (!timingslot.doctorUnavailable.includes(time)) {
            timingslot.doctorUnavailable.push(time);
            await timingslot.save();
        }
        else {
            const index = timingslot.doctorUnavailable.findIndex((item) => item == time);
            timingslot.doctorUnavailable.splice(index, 1);
            await timingslot.save();
        }
        res.status(200).json({ slotSuceess: 'Doctor schedule updated successfully' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const bookAppointment = async (req, res) => {
    const session = await mongoose.startSession(); // create/start a session
    session.startTransaction(); // start transaction
    try {
        const User = req.user;
        if (User.isDoctor) {
            session.abortTransaction();
            return res.status(400).send("You Are Not Authorised!");
        }
        const userId = User._id;
        const data = req.body;
        const date = req.body.date || new Date();
        let timingSlot = await TimingSlot.findOne({ doctorId: data.doctorId, day: date.toISOString().split("T")[0] }).session(session);
        if (!timingSlot) {
            const newSlot = new TimingSlot({ doctorId: data.doctorId, day: date, doctorUnavailable: [], appointmentBooked: [data.time] });
            await newSlot.save({ session: session })
        }
        else if (!timingSlot.appointmentBooked.includes(data.time) && !timingSlot.doctorUnavailable.includes(data.time)) {
            timingSlot.appointmentBooked.push(data.time);
            await timingSlot.save({ session: session });
        }
        else {
            throw new Error("Time Is already taken!");
        }
        const appoitment = new Appointment({ userId: userId, ...data, date: date });
        await appoitment.save({ session: session })
        const status = new AppointmentStatus({ appointmentId: appoitment._id });
        await status.save({ session: session });
        session.commitTransaction();
        res.status(200).json({ "appointment": appoitment, "status": status });
    }
    catch (err) {
        session.abortTransaction();
        res.status(500).send(err.message);
    }
}

const yourAppointment = async (req,res) =>{
    try{
        const User = req.user;
        if(User.isDoctor){
            return res.status(500).send("You are not Authorised!");
        }
        const appointments = await Appointment.aggregate([
            {
                $match : {userId : new mongoose.Types.ObjectId(User._id)}
            },
            {
                $lookup : {
                    from : 'status',
                    localField : '_id',
                    foreignField : 'appointmentId',
                    as : 'value'
                }
            },
            {
                $unwind : '$value'
            },
            {
                $project : {
                    _id : 1,
                    firstname : 1,
                    lastname : 1,
                    gender : 1,
                    age : 1,
                    weight : 1,
                    contact : 1,
                    address : 1,
                    date : 1,
                    doctorId : 1,
                    userId : 1,
                    time : 1,
                    isVisited : '$value.isVisited',
                    isAccepted : '$value.isAccepted',
                    isPaid : '$value.isPaid'
                }
            }
        ]);
        //const appointments = await Appointment.find({userId : User._id});
        res.status(200).json({"appointments" : appointments});
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

const deleteAppointment = async (req,res) => {
    let session = await mongoose.startSession();
    session.startTransaction();
    try{
        console.log("hi - 1");
        const User = req.user;
        if(User.isDoctor){
            throw new Error("Your Are Not Authorised");
        }
        const {id} = req.body;
        const appointment = await Appointment.findOne({_id : id}).session(session);
        if(!appointment){   
            throw new Error("Appointment Id Wrong");
        }
        const time = appointment.time;
        const date = appointment.date;
        const doctorId = appointment.doctorId;
        let timingSlot = await TimingSlot.findOne({doctorId : doctorId , day : date.toISOString().split("T")[0]}).session(session);
        timingSlot.appointmentBooked = timingSlot.appointmentBooked.filter((item)=>item!=time);
        await timingSlot.save({session : session});
        await AppointmentStatus.deleteOne({appointmentId : id});
        await Appointment.deleteOne({_id : id}).session(session);
        session.commitTransaction();
        res.status(200).send("Deleted Succesfully");
    }
    catch(err){
        session.abortTransaction();
        res.status(500).send(err.message);
    }
}

module.exports = {
    speciallisonMethod: getSpeciallison,
    timeMethod: getTime,
    cancleSlotMethod: cancleSlot,
    bookAppointmentMethod: bookAppointment,
    yourAppointmentMethod : yourAppointment,
    deleteAppointmentMethod : deleteAppointment
}