export const CheckRefresh = async () => {
    let checkRefreshResponse = {error:""};
        try {
            const backendResponse = await fetch("http://localhost:8080/refresh", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization":sessionStorage.getItem("AccessToken")
                },
            });
            const backendResponseData = await backendResponse.json();
            if (backendResponse.ok) {
                console.log(backendResponseData);
                sessionStorage.setItem("AccessToken",`bearer ${backendResponseData.accessToken}`);
                //sessionStorage.setItem("RefreshToken",`${backendResponseData.refreshToken}`);
                sessionStorage.setItem("IsDoctor",backendResponseData.user.isDoctor);
                checkRefreshResponse=({...checkRefreshResponse,isAuthenticated:true,user:backendResponseData.user});
            } else {
                // sessionStorage.removeItem("AccessToken");
                // sessionStorage.removeItem("RefreshToken");
                // sessionStorage.removeItem("IsDoctor");
                sessionStorage.clear();
                throw new Error(backendResponseData.refreshTokenError || backendResponseData.Error);
            }
        } catch (err) {
            checkRefreshResponse=({...checkRefreshResponse,error:err.message});
        }
    return checkRefreshResponse;
}
