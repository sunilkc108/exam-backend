const router = require("express").Router();

router.post("/register", require("../../controllers/auth/auth").register);

router.post("/login", require("../../controllers/auth/auth").login);

module.exports = router;
