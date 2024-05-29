export const SetTextToEllipsis = (description) => {
    const words = description.split(" ");
    if (words.length >= 37){
        const truncatedWords = words.slice(0, 37);
        return truncatedWords.join(" ") + " ...."; // Join the truncated words back into a string
    }
    return words.join(" "); // Join the truncated words back into a string
};
