const router = require("express").Router();
const authentication = require("../../middlewares/authentication");
router.get(
  "/get-series",
  authentication,
  require("../../controllers/admin/series").getSeries
);

router.get(
  "/get-series/:seriesId",
  authentication,
  require("../../controllers/admin/series").getSeriesById
);

router.post(
  "/add-series",
  authentication,
  require("../../controllers/admin/series").addSeries
);

router.get(
  "/series-questions/:seriesId",
  authentication,
  require("../../controllers/admin/series").getSeriesQuestions
);
router.get(
  "/series-questions/:seriesId/:questionId",
  authentication,
  require("../../controllers/admin/series").getSeriesQuestionOptions
);

router.post(
  "/series-questions-add/:seriesId",
  authentication,
  require("../../controllers/admin/series").addSeriesQuestion
);

router.delete(
  "/delete-series-question/:questionId",
  authentication,
  require("../../controllers/admin/series").deleteSeriesQuestion
);

router.put(
  "/edit-series/:seriesId",
  authentication,
  require("../../controllers/admin/series").editSeries
);

router.delete(
  "/delete-series/:seriesId",
  authentication,
  require("../../controllers/admin/series").deleteSeries
);

router.get(
  "/series-options/:seriesId",
  authentication,
  require("../../controllers/admin/series").getSeriesQuestions
);

router.post(
  "/series-options-add/:seriesId/:questionId",
  authentication,
  require("../../controllers/admin/series").addSeriesOption
);

router.delete(
  "/delete-series-question/:questionId",
  authentication,
  require("../../controllers/admin/series").deleteSeriesQuestion
);

router.put(
  "/edit-series/:seriesId",
  authentication,
  require("../../controllers/admin/series").editSeries
);

module.exports = router;
