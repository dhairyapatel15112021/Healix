export const GetDoctorProfile = async() => {
    let profileResponse = {error:""};
    try{
        const backendResponse = await fetch("http://localhost:8080/getUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": sessionStorage.getItem("AccessToken"),
            },
        });
        const backendResponseData = await backendResponse.json();
        if (backendResponse.ok) {
            profileResponse=({...profileResponse,profileData:backendResponseData.profile});
        } else {
            throw new Error(backendResponseData.Error);
        }
    }
    catch(err){
        profileResponse=({...profileResponse,error:err.message});
    }
    return profileResponse;
}
