const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

module.exports = function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next({ msg: "Please login first...", status: 400 });
  }

  jwt.verify(
    authorization,
    "qrqadsfasdfeq45q34345345asdfasf",
    (err, decoded) => {
      if (!decoded) {
        return next({
          msg: "User is already removed from system...",
          status: 400,
        });
      }

      UserModel.findById(decoded._id)
        .then((user) => {
          if (!user) {
            return next({ msg: "Please login again...", status: 400 });
          }

          req.loggedInUser = user;
          return next();
        })
        .catch((error) => {
          return next({ msg: "Please login again...", status: 400 });
        });
    }
  );
};
