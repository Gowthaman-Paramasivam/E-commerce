const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserInfo = require("../models/userInfo");

const secret = "test";

const signIn = async (req, res) => {

  console.log("Sign in", req.body)
  const { userName, password } = req.body;

  const findUserName = await UserInfo.findOne({
    where: {
      userName: userName
    }
  })

  if (findUserName) {

    const isPasswordCorrect = await bcrypt.compare(password, findUserName.password);

    console.log("isPasswordCorrect :", isPasswordCorrect)
    if (isPasswordCorrect) {

      const token = jwt.sign({ email: findUserName.email, id: findUserName.id }, secret, {
        expiresIn: "1h",
      });

      res.status(200).json({ result: findUserName, token })
    } else {

      res.status(400).json({ message: "Invalid credentials" });

    }

  } else {
    res.status(404).json({ message: "User does not exist" });
  }
};

const signUp = async (req, res) => {
  const { firstName, lastName, gender, userName, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const findUserName = await UserInfo.findOne({
    where: {
      userName: userName
    }
  })

  console.log("findUserName :",findUserName);

  if (!findUserName) {
    console.log("inside if");
    await UserInfo.create({
      firstName,
      lastName,
      gender,
      userName,
      password: hashedPassword
    })
    res.status(200);
    
  } else {
    res.status(400).json({ message: "userName already exist" });
  }
};

module.exports = { signIn, signUp }
