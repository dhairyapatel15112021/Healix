import axios from "axios";

export const DeleteDoctor = async () => {
    let checkLogOutResponse = { error: "" };
    try {
        const backendResponse = await axios.delete("http://localhost:8080/deleteUser", {
            headers: { Authorization: sessionStorage.getItem("AccessToken") }
        })
        const data = backendResponse.data;
        sessionStorage.clear();
        checkLogOutResponse = ({ ...checkLogOutResponse, deleteSuccess: true });
    }
    catch (err) {
        checkLogOutResponse = ({ ...checkLogOutResponse, error: err.response.data || err.message });
    }
    return checkLogOutResponse;
}
