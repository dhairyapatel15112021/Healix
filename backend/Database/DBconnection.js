const mongoose = require("mongoose");
const dotenv = require("dotenv");
const DBconnection = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // Adjust the timeout as needed
        };
        const connect = await mongoose.connect(process.env.MONGO_URL + "Healix");
        console.log("succesfully connected to our database");
    }
    catch (error) {
        console.log("Error While Connectiong To Database");
        console.error(error);
    }
}

module.exports=DBconnection;

// This is an option object passed to the mongoose.connect method. In this case, useNewUrlParser: true indicates that Mongoose should use the new URL parser for MongoDB connection strings. This option is required because the MongoDB Node.js driver (used internally by Mongoose) has deprecated the old URL parser, and using the new parser avoids a deprecation warning.