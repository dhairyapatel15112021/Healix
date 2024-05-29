export const CancleSlots = async (buttonText, Date) => {
    let cancleSlotsResponse = { error: "" };
    if (!buttonText.trim()) {
        cancleSlotsResponse.error = "! Please Select Proper Text";
    }
    else {
        try {
            const backendResponse = await fetch("http://localhost:8080/cancleSlot", {
                method: "POST",
                body: JSON.stringify({ text: buttonText, date: Date }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("AccessToken"),
                },
            });
            const backendResponseData = await backendResponse.json();
            if (backendResponse.ok) {
                cancleSlotsResponse = ({ ...cancleSlotsResponse, slotSuceess: backendResponseData.slotSuceess });
            } else {
                throw new Error(backendResponseData.Error);
            }
        }
        catch (err) {
            cancleSlotsResponse = ({ ...cancleSlotsResponse, error: err.message });
        }
    }
    return cancleSlotsResponse;
}
