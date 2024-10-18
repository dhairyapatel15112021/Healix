const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const DBconnection = require("./Database/DBconnection");
const router = require("./Routes/Route");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use("/",router);
dotenv.config();


app.listen(process.env.PORT_NUMBER,()=>{
    DBconnection();
    // sendData();
    console.log(`Server running at ${process.env.PORT_NUMBER}`);
})