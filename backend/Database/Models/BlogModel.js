const mongoose = require("mongoose");
mongoose.pluralize(null);
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'doctor',
            required : true
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    });

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
