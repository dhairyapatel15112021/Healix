export const data = ["10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM",
"12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM"];
export const ButtonData = data.map((item)=>{
    return ({
        text : item,
        isUn : false
    })
});

