const token = require("../Database/Models/TokenModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = async (req,res,next)=>{
        const token = req.headers['authorization'];
        if (!token){
            return res.status(401).json({ authenticateTokenError: 'Token is missing' });
        }
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
        const refreshtoken = req.body.token;
        if (!refreshtoken) {
            return res.status(401).json({ refreshTokenError: 'Refresh token is missing' });
        }
        const tokenData = await token.findOne({ token: refreshtoken });
        if (!tokenData) {
            return res.status(404).json({ refreshTokenError: 'Refresh token is not valid' });
        }
        jwt.verify(tokenData.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(500).json({ refreshTokenError: 'invalid refresh token' });
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            return res.status(200).json({ accessToken: accessToken,refreshToken:tokenData.token, user: user });
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