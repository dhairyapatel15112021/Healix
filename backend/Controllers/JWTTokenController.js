const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = async (req,res,next)=>{
        const headers = req.headers['authorization'];
        if(!headers || !headers.startsWith("bearer")){
            return res.status(401).send( 'token is invalid' );
        }
        const token = headers.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(500).send('Invalid Authentication Token');
            }
            req.user = user;
            next();
        });
}   

const tokenRefresh = async (req, res) => {
    try {
        const headers = req.headers['authorization'];
        if (!headers || !headers.startsWith("bearer")) {
            return res.status(401).send('Refresh token is missing');
        }
        const token = headers.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(500).send( 'invalid refresh token' );
            }
            return res.status(200).json({ accessToken: token, user: user });
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports = {
    tokenRefreshMethod: tokenRefresh,
    authenticateMethod : authenticateToken,
};