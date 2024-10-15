import axios from "axios";

export const DeleteDoctor = async () => {
    let checkLogOutResponse = {error:""};
    try{
        // const backendResponse = await fetch("http://localhost:8080/deleteUser", {
        //     method: "DELETE",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "authorization": sessionStorage.getItem("AccessToken"),
        //     },
        // });
        // const backendResponseData = await backendResponse.json();
        const backendResponse = await axios.delete("http://localhost:8080/deleteUser",{
            headers : {Authorization : sessionStorage.getItem("AccessToken")}
        })
        // if (backendResponse.ok) {
        const data = backendResponse.data;
            sessionStorage.clear();
            checkLogOutResponse=({...checkLogOutResponse,deleteSuccess:true});
        // } else {
        //     throw new Error(backendResponseData.Error);
        // }
    }
    catch(err){
        checkLogOutResponse=({...checkLogOutResponse,error: err.response.data || err.message});
    }
    return checkLogOutResponse;
  }
  