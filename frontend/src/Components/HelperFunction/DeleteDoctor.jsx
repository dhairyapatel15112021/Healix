export const DeleteDoctor = async () => {
    let checkLogOutResponse = {error:""};
    try{
        const backendResponse = await fetch("http://localhost:8080/deleteUser", {
            method: "DELETE",
          //   body: JSON.stringify({"token":sessionStorage.getItem("RefreshToken")}),
            headers: {
                "Content-Type": "application/json",
                "authorization": sessionStorage.getItem("AccessToken"),
            },
        });
        const backendResponseData = await backendResponse.json();
        if (backendResponse.ok) {
            sessionStorage.clear();
            checkLogOutResponse=({...checkLogOutResponse,deleteSuccess:true});
        } else {
            throw new Error(backendResponseData.Error);
        }
    }
    catch(err){
        checkLogOutResponse=({...checkLogOutResponse,error:err.message});
    }
    return checkLogOutResponse;
  }
  