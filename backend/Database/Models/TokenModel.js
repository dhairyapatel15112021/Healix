const mongoose = require("mongoose");
mongoose.pluralize(null);
const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
    });

const token = mongoose.model("Token",tokenSchema);

module.exports=token;
