import axios from "axios";

export const GetDoctorProfile = async () => {
    let profileResponse = { error: "" };
    try {
        const backendResponse = await axios.get("http://localhost:8080/getUser", {
            headers: { Authorization: sessionStorage.getItem("AccessToken") }
        });
        const data = backendResponse.data;
        profileResponse = ({ ...profileResponse, profileData: data.profile });
    }
    catch (err) {
        profileResponse = ({ ...profileResponse, error: err.response.data || err.message });
    }
    return profileResponse;
}
