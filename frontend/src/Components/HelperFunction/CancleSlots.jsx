import axios from "axios";

export const CancleSlots = async (buttonText, Date) => {
    let cancleSlotsResponse = { error: "" };
    if (!buttonText.trim()) {
        cancleSlotsResponse.error = "! Please Select Proper Text";
    }
    else {
        try {
            const backendResponse = await axios.post("http://localhost:8080/cancleSlot",{time : buttonText , date : Date},{
                headers : {Authorization : sessionStorage.getItem("AccessToken")}
            })
            cancleSlotsResponse = {...cancleSlotsResponse , slotSuceess : backendResponse.data.slotSuceess}
        }
        catch (err) {
            cancleSlotsResponse = ({ ...cancleSlotsResponse, error: err.response.data || err.message });
        }
    }
    return cancleSlotsResponse;
}
