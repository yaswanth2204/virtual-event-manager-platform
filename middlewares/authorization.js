const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const JWTSECRET = process.env.JWTSECRET

const authMiddleware = async (req, res, next) => {
    const token = req.header("auth")?.split(" ")[1];
    if (!token) {
        return res.status(401).send({ msg: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, JWTSECRET)
        const user = await userModel.findById(decoded.userId)
        if (!user) {
            return res.status(401).send({ msg: "User not found" });
        }
        req.user = user
        next(); 
    }
    catch (error) {
        res.status(401).send({ msg: "Token is not valid" });
    }
}

const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).send({ message: 'Access denied. Only ' + requiredRole + 's can perform this action.' });
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware }
