const router = require("express").Router();
const authentication = require("../../middlewares/authentication");

router.post(
  "/submit-answer",
  authentication,
  require("../../controllers/student/answer").submitAnswer
);
router.get(
  "/test-result/:seriesId",
  authentication,
  require("../../controllers/student/answer").testResult
);

module.exports = router;
