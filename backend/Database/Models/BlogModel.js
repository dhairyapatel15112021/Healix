const mongoose = require("mongoose");
mongoose.pluralize(null);
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        doctorId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            required: true,
        },
    });

const blog = mongoose.model("Blog", blogSchema);

module.exports = blog;
