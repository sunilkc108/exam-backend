const UserModel = require("../../models/user");

const hashPassword = require("password-hash");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  let token = jwt.sign(
    { _id: user._id, email: user.email },
    "qrqadsfasdfeq45q34345345asdfasf"
  );

  return token;
};

const register = async (req, res, next) => {
  try {
    const newUser = new UserModel({});

    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;

    // newUser.password = req.body.password;

    if (!req.body.password || req.body.password == "") {
      throw { msg: "Password cannot be empty", status: 400 };
    }

    let hashedPassword = hashPassword.generate(req.body.password);
    newUser.password = hashedPassword;

    const oldUser = await UserModel.findOne({
      email: req.body.email,
    });

    if (oldUser) {
      throw {
        msg: "User email already exists.",
        status: 400,
      };
    }

    const user = await newUser.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw { msg: "Email or password cannot be empty", status: 400 };
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      next({ msg: "Email does not exist.", status: 400 });
    }

    const isMatched = hashPassword.verify(password, user.password || " ");

    if (!isMatched) {
      throw { msg: "Password did not match", status: 400 };
    }

    res.json({ user: user, token: generateToken(user) });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
