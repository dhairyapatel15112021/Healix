import axios from "axios";

export const CheckRefresh = async () => {
    let checkRefreshResponse = { error: "" };
    try {
        const backendResponse = await axios.get("http://localhost:8080/refresh", {
            headers: {
                Authorization: sessionStorage.getItem("AccessToken")
            }
        })
        const data = backendResponse.data;
        console.log(data);
        sessionStorage.setItem("AccessToken", `bearer ${data.accessToken}`);
        sessionStorage.setItem("IsDoctor", data.user.isDoctor);
        checkRefreshResponse = ({ ...checkRefreshResponse, isAuthenticated: true, user: data.user });
        console.log(data.user);
    } catch (err) {
        sessionStorage.clear();
        checkRefreshResponse = ({ ...checkRefreshResponse, error: err.response.data || err.message });
    }
    return checkRefreshResponse;
}
