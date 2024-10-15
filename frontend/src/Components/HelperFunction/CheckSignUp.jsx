import axios from "axios";

export const CheckSignUp = async (userData) => {
    let error = "";

    const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log(userData);
    if (userData.Name.trim() === "") {
        error = '! Please Enter Valid Name';
    } else if (!emailTest.test(userData.Email)) {
        error = "! Please Enter Valid Email Address";
    } else if (!passwordTest.test(userData.Password) && !passwordTest.test(userData.ConfirmPassword)) {
        error = "! Our Password Does Not Meet Our Criteria";
    } else if (userData.Password !== userData.ConfirmPassword) {
        error = "! Password And Confirm Password Should Match";
    } else {
        try {
            delete userData.ConfirmPassword;
            const backendResponse = await axios.post("http://localhost:8080/signup",userData);
        } catch (err) {
            console.log(err);
            error = err.response.data || err.message;
        }
    }
    return error;
};
