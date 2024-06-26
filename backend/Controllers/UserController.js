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
            return res.status(401).json({ emailError: "Email is already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const newUser = new user({ name: Name, email: Email, password: hashedPassword, gender: Gender });
        const savedUser = await newUser.save();
        res.status(200).json({ userRegistered: savedUser });
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { Email, Password, IsChecked } = req.body;
        const existingUser = IsChecked ? await doctor.findOne({ email: Email }) : await user.findOne({ email: Email });
        if (!existingUser) {
            return res.status(401).json({ userError: "User Not Found" });
        }
        const matchPassword = await bcrypt.compare(Password, existingUser.password);
        if (!matchPassword) {
            return res.status(401).json({ passwordError: "Wrong Password" });
        }
        const accessToken = jwt.sign(existingUser.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(existingUser.toJSON(), process.env.REFRESH_SECRET_KEY);
        const saveRefreshToken = new token({ token: refreshToken });
        await saveRefreshToken.save();
        res.status(200).json({
            AccessToken: accessToken, RefreshToken: refreshToken, name: existingUser.name,
            id: existingUser._id, isDoctor: IsChecked
        });
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const Token = req.body.token;
        await token.deleteOne({ token: Token });
        res.status(200).json({ SuccessLogout: 'logout successfull' });
    }
    catch (error) {
        res.status(500).json({ Error: "Error While Logout" + error.message });
    }
}

const updateUser = async (req,res) =>{
    try{
        const data = req.body;
        const User = req.user;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const updateSave = User.isDoctor ? await doctor.updateOne({_id:User._id},{$set:data}) : await user.updateOne({_id:User._id},{$set:{...data,password:hashedPassword}});
        res.status(200).json({ UpdatedUser: true});
    } catch (error) {
        res.status(500).json({ Error: "Error While Update " + error.message });
    }
}

const deleteUser = async (req,res) =>{
    try{
        const User=req.user;
        const tokenRemoved = await token.deleteOne({token:req.body.token});
        const deletedSave = await (User.isDoctor ?doctor : user).deleteOne({_id:User._id});
        res.status(200).json({deletedUser:true});
    } catch (error) {
        res.status(500).json({ Error: "Error While Logout" + error.message });
    }
}

const getUser = async (req,res) =>{
    try{
        if(!req.user){
            return res.status(401).json({ Error: "Wrong User" });
        }
        const User=req.user;
        const userData = await (User.isDoctor ?doctor : user).findOne({_id:User._id});
        return res.status(200).json({profile:userData});
    } catch (error) {
        res.status(500).json({ Error: "Error While Logout" + error.message });
    }
}

module.exports = {
    signupUserMethod : signupUser,
    loginUserMethod : loginUser,
    logoutUserMethod : logoutUser,
    updateUserMethod : updateUser,
    deleteUserMethod : deleteUser,
    getUserMethod : getUser,
};