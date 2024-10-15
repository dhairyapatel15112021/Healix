export const CheckLogout = async () => {
    let checkLogOutResponse = { error: "" };
    sessionStorage.clear();
    checkLogOutResponse = ({ SuccessLogout: 'logout successfull', logoutSuccess: true });
    return checkLogOutResponse;
}
