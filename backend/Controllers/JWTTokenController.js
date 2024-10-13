const token = require("../Database/Models/TokenModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = async (req,res,next)=>{
        const headers = req.headers['authorization'];
        if(!headers || !headers.startsWith("bearer")){
            return res.status(401).json({ authenticateTokenError: 'token is invalid' });
        }
        const token = headers.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(500).json({ authenticateTokenError: 'Invalid Authentication Token' });
            }
            req.user = user;
            next();
        });
}   

const tokenRefresh = async (req, res) => {
    try {
        const headers = req.headers['authorization'];
        if (!headers || !headers.startsWith("bearer")) {
            return res.status(401).json({ refreshTokenError: 'Refresh token is missing' });
        }
        const token = headers.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(500).json({ refreshTokenError: 'invalid refresh token' });
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '5m' });
            return res.status(200).json({ accessToken: accessToken, user: user });
        });
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
}
module.exports = {
    tokenRefreshMethod: tokenRefresh,
    authenticateMethod : authenticateToken,
};