import axios from "axios";

export const SubmitAppointment = async (userData) => {
    const reponse = {};
    if (!userData.firstname || (userData.firstname && userData.firstname.trim() === "")) {
        reponse.error = "Invalid Firstname";
    }
    else if (!userData.lastname || ( userData.lastname && userData.lastname.trim() === "")) {
        reponse.error = "Invalid lastname";
    }
    else if (!userData.age || (userData.age && (userData.age.trim() === "" || parseInt(userData.age) <= 0))) {
        reponse.error = "Invalid Age";
    }
    else if (!userData.weight || ( userData.weight &&(userData.weight.trim() === "" || parseInt(userData.weight) < 0))) {
        reponse.error = "Invalid Weight";
    }
    else if (!userData.gender || (userData.gender && userData.gender.trim() === "")){
        reponse.error = "Invalid Gender";
    }
    else if(!userData.address || (userData.address && userData.address.trim() === "")){
        reponse.error = "Invalid Address";
    }
    else if(!userData.contact || (userData.contact && userData.contact.trim().length != 10)){
        reponse.error = "Invalid Phone Number";
    }
    else if(!userData.date){
        reponse.error = "Please Select Date";
    }
    else if(!userData.doctorId || (userData.doctorId && userData.doctorId.trim() === "")){
        reponse.error = "Please Select Specialisation";
    }
    else if(!userData.time || (userData.time && userData.time.trim() === "")){
        reponse.error = "Please Select Time";
    }
    else {
        try {
            const backendResponse = await axios.post("http://localhost:8080/bookAppointment", userData, {
                headers: { Authorization: sessionStorage.getItem("AccessToken") }
            });
            reponse.data = backendResponse.data.appointment;
        }
        catch (err) {
            reponse.error = err.response.data || err.message;
        }
    }
    return reponse;
}