const doctor = require("../Database/Models/DoctorModel");

const getSpeciallison = async(req,res) =>{
    try{
        const Data = await doctor.find({ speciallisation: { $exists: true, $ne: "" } }, { speciallisation: 1, _id: 0 });
        res.status(200).json({data:Data});
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

const getTime = async(req,res) =>{
    try{
        const {date,doctorCategory} = req.body;
        const Data = await doctor.findOne({speciallisation:doctorCategory});
        const timingslot = Data.timingSlot;
        if(!timingslot.length){
            return res.status(401).json({EmptyArray:true});
        }
        let index = timingslot.findIndex(item => {
            const itemDate= new Date(item.day).toISOString().split('T')[0];
            const inputDate= new Date(date).toISOString().split('T')[0];
            return itemDate === inputDate;
        });
        if(index===-1){
            return res.status(401).json({EmptyArray:true});
        }
        res.status(200).json({timeData:timingslot[index].slots});
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
}
const cancleSlot = async(req,res)=>{
    try{
        const {text,date}=req.body;
        const User = req.user;
        const Doctor = await doctor.findOne({_id : User._id});
        if(!Doctor){
            return res.status(404).json({ Error: 'Doctor not found' });
        }
        let dayIndex = Doctor.timingSlot.findIndex(item => {
            const itemDate= new Date(item.day).toISOString().split('T')[0];
            const inputDate= new Date(date).toISOString().split('T')[0];
            return itemDate === inputDate;
        });
        if(dayIndex===-1){
            Doctor.timingSlot.push({day:date,slots:[text]});
        }
        else{
            Doctor.timingSlot[dayIndex].slots.push(text);
        }
        await Doctor.save();
        res.status(200).json({ slotSuceess: 'Doctor schedule updated successfully' });
    }
    catch(error){
        res.status(500).json({ Error: error.message });
    }
}
module.exports = {
    speciallisonMethod : getSpeciallison,
    timeMethod : getTime ,
    cancleSlotMethod : cancleSlot,
}