const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const redisClient = require("../config/redis");

const adminMiddleware = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Invalid Token");
        }

        // Verify JWT
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const { _id } = payload;

        if (!_id) {
            throw new Error("Invalid Token Without ID!!");
        }

        // Check user exists
        const result = await User.findById(_id);
          
        if(payload.role!="admin"){
            throw new Error("Invalid Token");
        }

        if (!result) {
            throw new Error("Invalid User!!");
        }

        // Check Redis blocklist
        //itll put the token here and itll get black listed here..
        const isBlocked = await redisClient.exists(`token:${token}`);

        if (isBlocked) {
            throw new Error("Token has been blocked");
        }

        // Store user information for next controller
        req.user = result;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = adminMiddleware;