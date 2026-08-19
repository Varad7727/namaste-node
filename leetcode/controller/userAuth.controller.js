
const User = require("../model/user.model");
const validate = require("../utils/validator.utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis")

//register
const register = async (req, res) => {
  try {
    //validated into util
    validate(req.body);
    //everything will be in body 
    const { firstName, emailId, password, role } = req.body;
    //do hashing tonpassword
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      emailId,
      password: hashedPassword,
      role
    });
    //sign jwt
    const token = jwt.sign({ _id: user._id, emailId: emailId, role: 'user' }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000, httpOnly: true,
      secure: true,
      sameSite: "strict"
    })//milisecond
    res.status(201).send("User Added Successfully!!")
  } catch (error) {
    res.status(400).send("Error:" + error);
  }
}
//login
const login = async (req, res) => {
  try {
    //get email and pass from body
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      throw new error("Invalid Credentials!!" + error);
    }
    //find user
    const user = await User.findOne({ emailId });
    //compare password
    const match = await bcrypt.compare(password, user.password);//compared both passwords
    if (!match) {
      throw new error("Invalid Credentials");
    }
    const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000, httpOnly: true,
      secure: true,
      sameSite: "strict"
    })//milisecond
    res.status(200).send("User Loggedin Successfully!!")
  } catch (error) {
    res.status(401).send("Error:" + error);
  }


}
//logout
const logout = async (req, res) => {
  try {
    // Retrieve token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("No token found");
    }

    // Decode token to get expiry
    const payload = jwt.decode(token);

    // Add token to Redis blocklist
    await redisClient.set(`token:${token}`, "Blocked");

    // Expire Redis key when JWT expires
    await redisClient.expireAt(`token:${token}`, payload.exp);

    // Clear cookie
    res.cookie("token", null, {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    res.status(200).send("Logged out successfully");

  } catch (error) {
    res.status(500).send("Error: " + error);
  }
};

//admon register
const adminRegister = async (req, res) => {
    try {
        validate(req.body);

        const { firstName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            emailId,
            password: hashedPassword,
            role: "admin"
        });

        const token = jwt.sign(
            {
                _id: user._id,
                emailId: user.emailId,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 }
        );

        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.status(201).send("Admin Added Successfully!!");

    } catch (error) {
        res.status(400).send("Error: " + error);
    }
};
module.exports = { register, login, logout,adminRegister };   