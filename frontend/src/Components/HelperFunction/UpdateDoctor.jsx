import axios from "axios";

export const UpdateDoctor = async (data) => {
    let updateProfileResponse = {error:""};
    const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (data.name.trim() === ""){
        updateProfileResponse.error = "! Please Enter Valid Title";
    }
    else if(data.email.trim() === "" || !emailTest.test(data.email)){
        updateProfileResponse.error = "! Please Enter Valid Email";
    }
    else if(data.speciallisation && data.speciallisation.trim() === ""){
        updateProfileResponse.error = "! Please Enter Specialisation";
    }
    else if(data.age && parseInt(data.age)<=0){
        updateProfileResponse.error = "! Please Enter Valid Age";
    }
    else if(data.contact && data.contact.length!==10){
        updateProfileResponse.error = "! Please Enter Valid Contact";
    }
    else if(!sessionStorage.getItem("IsDoctor") && data.password &&  !passwordTest.test(data.password)){
        updateProfileResponse.error = "! Our Password Does Not Meet Our Criteria";
    }
    else{
        try {
            const backendResponse = await axios.put("http://localhost:8080/updateUser",data,{
                headers : {Authorization : sessionStorage.getItem("AccessToken")}
            });
            const responseData = backendResponse.data;
            updateProfileResponse=({...updateProfileResponse,successUpdate:true});
        } catch (err) {
            updateProfileResponse=({...updateProfileResponse,error: err.response.data || err.message});
        }
    }
  return (
    updateProfileResponse
  )
}
