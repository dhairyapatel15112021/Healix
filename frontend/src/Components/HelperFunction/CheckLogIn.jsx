import axios from 'axios';
export const CheckLogIn = async (userData) => {
    let checkLogInResponse = { error: "" };
    const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailTest.test(userData.Email)) {
        checkLogInResponse.error = "! Please Enter Valid Email Address";
    }
    else {
        try {
            const backendResponse = await axios.post("http://localhost:8080/login", userData);
            const data = backendResponse.data;
            sessionStorage.setItem("AccessToken", `bearer ${data.AccessToken}`);
            sessionStorage.setItem("IsDoctor", data.isDoctor);
            checkLogInResponse = ({ ...checkLogInResponse, Name: data.name, UserId: data.id, IsDoctor: data.isDoctor })
        } catch (err) {
            checkLogInResponse = ({ ...checkLogInResponse, error: err.response.data || err.message });
        }
    }
    return checkLogInResponse;
};
