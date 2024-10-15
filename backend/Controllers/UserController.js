const user = require("../Database/Models/UserModel");
const doctor = require("../Database/Models/DoctorModel");
const token = require("../Database/Models/TokenModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const signupUser = async (req, res) => {
    try {
        const { Name, Gender, Email, Password } = req.body;
        const existingUser = await user.findOne({ email: Email });
        if (existingUser) {
            return res.status(401).send( "Email is already registered" );
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const newUser = new user({ name: Name, email: Email, password: hashedPassword, gender: Gender });
        const savedUser = await newUser.save();
        res.status(200).json({ userRegistered: savedUser });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const loginUser = async (req, res) => {
    try {
        const { Email, Password, IsChecked } = req.body;
        const existingUser = IsChecked ? await doctor.findOne({ email: Email }) : await user.findOne({ email: Email });
        if (!existingUser) {
            return res.status(401).send("User Not Found");
        }
        const matchPassword = await bcrypt.compare(Password, existingUser.password);
        if (!matchPassword) {
            return res.status(401).send( "Wrong Password");
        }
        const payload = {name : existingUser.name , email : existingUser.email,gender : existingUser.gender,isDoctor : existingUser.isDoctor,age:existingUser.age,contact : existingUser.contact,_id:existingUser._id};
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY,{expiresIn : '5m'});
        res.status(200).json({
            AccessToken: accessToken, name: existingUser.name,
            id: existingUser._id, isDoctor: IsChecked
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ Error: error.message });
    }
}

// const logoutUser = async (req, res) => {
//     try {
//         const Token = req.body.token;
//         await token.deleteOne({ token: Token });
//         res.status(200).json({ SuccessLogout: 'logout successfull' });
//     }
//     catch (error) {
//         res.status(500).json({ Error: "Error While Logout" + error.message });
//     }
// }

const updateUser = async (req,res) =>{
    try{
        // may this can create problem because we are storing some information in JWT token also while signin
        const data = req.body;
        const User = req.user;
        if(!data){
            return res.status(500).send("Data Invalid");
        }
        if(data.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            const updateSave = User.isDoctor ? await doctor.updateOne({_id:User._id},{$set:data}) : await user.updateOne({_id:User._id},{$set:{...data,password:hashedPassword}});
        }
        else{
            const updateSave = User.isDoctor ? await doctor.updateOne({_id:User._id},{$set:data}) : await user.updateOne({_id:User._id},{$set:{...data}});
        }
        res.status(200).json({ UpdatedUser: true});
    } catch (error) {
        res.status(500).send(`Error While Update ${error.message}`);
    }
}

const deleteUser = async (req,res) =>{
    try{
        const User=req.user;
        const deletedSave = await (User.isDoctor ?doctor : user).deleteOne({_id:User._id});
        res.status(200).json({deletedUser:true});
    } catch (error) {
        res.status(500).send( `Error While Logout ${error.message}`);
    }
}

const getUser = async (req,res) =>{
    try{
        if(!req.user){
            return res.status(401).send( "Wrong User");
        }
        const User=req.user;
        const userData = await (User.isDoctor ?doctor : user).findOne({_id:User._id},{password:0});
        return res.status(200).json({profile:userData});
    } catch (error) {
        res.status(500).send(`Error While geting the user ${err.message}`);
    }
}

module.exports = {
    signupUserMethod : signupUser,
    loginUserMethod : loginUser,
    // logoutUserMethod : logoutUser,
    updateUserMethod : updateUser,
    deleteUserMethod : deleteUser,
    getUserMethod : getUser,
};