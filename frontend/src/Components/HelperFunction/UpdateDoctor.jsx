export const UpdateDoctor = async (data) => {
    let updateProfileResponse = {error:""};
    console.log(data);
    const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (data.name === " "){
        updateProfileResponse.error = "! Please Enter Valid Title";
    }
    else if(data.email === " " || !emailTest.test(data.email)){
        updateProfileResponse.error = "! Please Enter Valid Email";
    }
    else if(data.speciallisation === " "){
        updateProfileResponse.error = "! Please Enter Specialisation";
    }
    else if(parseInt(data.age)<=0){
        updateProfileResponse.error = "! Please Enter Valid Age";
    }
    else if(data.contact && data.contact.length!==10){
        updateProfileResponse.error = "! Please Enter Valid Contact";
    }
    else if(!sessionStorage.getItem("IsDoctor") && !passwordTest.test(data.password)){
        updateProfileResponse.error = "! Our Password Does Not Meet Our Criteria";
    }
    else{
        try {
            const backendResponse = await fetch("http://localhost:8080/updateUser", {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("AccessToken"),
                },
            });
            const backendResponseData = await backendResponse.json();
            if (backendResponse.ok) {
                console.log(backendResponseData);
                updateProfileResponse=({...updateProfileResponse,successUpdate:true});
            } else {
                throw new Error(backendResponseData.authenticateTokenError || backendResponseData.Error);
            }
        } catch (err) {
            updateProfileResponse=({...updateProfileResponse,error:err.message});
        }
    }
  return (
    updateProfileResponse
  )
}
