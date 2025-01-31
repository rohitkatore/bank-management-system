const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const userAuth = async(req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        console.log('Auth header:', authorization);
        
        const token = authorization && authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({success: false, message: "Authentication token missing"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({success: false, message: "Invalid token"});
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({success: false, message: "User not found"});
        }

        // Add user object to request for use in subsequent middleware/routes
        req.user = user;
        next();
    } catch (err) {
        console.error('Auth error:', err);
        return res.status(401).json({success: false, message: "Authentication failed: " + err.message});
    }
};

module.exports = userAuth;