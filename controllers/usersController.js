const bcrypt = require("bcrypt")
const saltRounds = 10;
const userModel = require("../models/userModel")
const { sendEmail } = require("../util/sendEmail")
const jwt = require('jsonwebtoken');
const {welcomeMessage} = require("../messageTemplates/userRegistrationMessage")
const JWTSECRET = process.env.JWTSECRET

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).send({ msg: 'Please enter all fields' });
        }
        const existingUser = await userModel.findOne({ username })
        if (existingUser) {
            return res.status(400).send({ msg: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await userModel.create({
            username,
            email,
            password: hashedPassword,
            role
        })
        await sendEmail(email, "🎉 Welcome to  EventHive!", welcomeMessage(username));
        res.status(201).send({ msg: 'User registered successfully' })
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ msg: 'Please enter all fields' });
        }
        const dbUser = await userModel.findOne({ "email": email })
        if (!dbUser) {
            return res.status(400).send({ msg: 'User does not exist' });
        }
        const isPasswordMatch = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordMatch) {
            return res.status(400).send({ "msg": "Incorrect password" })
        }
        const token = jwt.sign({ userId: dbUser._id, email: dbUser.email, role: dbUser.role }, JWTSECRET, { expiresIn: "1hr" })
        res.status(200).send({ "token": token })
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = { registerUser, loginUser }
