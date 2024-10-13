export const CheckLogIn = async (userData) => {
    let checkLogInResponse = {error:""};
    const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailTest.test(userData.Email)) {
        checkLogInResponse.error = "! Please Enter Valid Email Address";
    }
    else {
        try {
             
            const backendResponse = await fetch("http://localhost:8080/login", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const backendResponseData = await backendResponse.json();
            if (backendResponse.ok) {
                console.log(backendResponseData);
                sessionStorage.setItem("AccessToken",`bearer ${backendResponseData.AccessToken}`);
                sessionStorage.setItem("IsDoctor",backendResponseData.isDoctor);
                checkLogInResponse=({...checkLogInResponse,Name:backendResponseData.name,UserId:backendResponseData.id,IsDoctor:backendResponseData.isDoctor})
            } else {
                throw new Error(backendResponseData.userError || backendResponseData.Error || backendResponseData.passwordError);
            }
        } catch (err) {
            checkLogInResponse=({...checkLogInResponse,error:err.message});
        }
    }
    return checkLogInResponse;
};
