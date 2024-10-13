export const CheckLogout = async() => {
    let checkLogOutResponse = {error:""};
    // try{
        // const backendResponse = await fetch("http://localhost:8080/logout", {
        //     method: "POST",
        //     body: JSON.stringify({"token":sessionStorage.getItem("RefreshToken")}),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        // const backendResponseData = await backendResponse.json();
        // if (backendResponse.ok) {
            sessionStorage.clear();
            checkLogOutResponse=({SuccessLogout: 'logout successfull',logoutSuccess:true});
        // } else {
        //     throw new Error(backendResponseData.Error);
        // }
    // }
    // catch(err){
    //     checkLogOutResponse=({...checkLogOutResponse,error:err.message});
    // }
    return checkLogOutResponse;
}
