import { nanoid } from "nanoid";
import Users from "../Schema/User.js";
import bcrypt from 'bcryptjs';
import Jwt from "jsonwebtoken";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/;

const sendData = (user) => {
    const access_token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    return {
        access_token: access_token,
        profile_img: user.profile_img,
        username: user.username,
        name: user.fullname,
    };
}

const generateUsername = async (email) => {
    let username = email.split('@')[0];
    let isUsername = await Users.findOne({ username });

    while (isUsername) {
        username += '-' + nanoid(8);
        isUsername = await Users.findOne({ username });
    }
    
    return username;
};

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        if (!fullname || typeof fullname !== 'string' || fullname.length < 3) {
            return res.status(403).json({ error: "Fullname should be at least 3 characters long" });
        }

        if (!email) {
            return res.status(403).json({ error: "Please provide an email" });
        }

        if (!emailRegex.test(email)) {
            return res.status(403).json({ error: "Invalid email" });
        }

        if (!password || !passwordRegex.test(password)) {
            return res.status(403).json({ error: "Password should contain at least 1 capital letter, 1 special character, and 1 number" });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ error: "Email is already in use" });
        }

        const saltRounds = 12;
        const hash = await bcrypt.hash(password, saltRounds);
        const username = await generateUsername(email);

        const newUser = new Users({
            fullname,
            email,
            username,
            password: hash
        });

        const user = await newUser.save();
        
        return res.status(200).json({ data: sendData(user) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while signing up the user" });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(403).json({ error: "Email and password are required" });
        }

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(403).json({ error: "User does not exist" });
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(403).json({ error: "Email and password do not match" });
        }

        return res.status(200).json({ data: sendData(user) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while signing in the user" });
    }
};
