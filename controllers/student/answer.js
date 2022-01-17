const OptionModal = require("../../models/TestSeriesOption");
const AnswerModal = require("../../models/testSeriesAnswer");
const submitAnswer = async function (req, res, next) {
  try {
    const { answers } = req.body;
    let data = [];
    // answers.forEach(async (ans) => {
    for (let i = 0; i < answers.length; i++) {
      let ans = answers[i];
      let obj = { isCorrect: false };
      const rightOption = await OptionModal.findOne({
        question: ans.question,
        isCorrect: true,
      });
      if (rightOption?._id.toString() === ans.option.toString()) {
        obj.isCorrect = true;
      }
      obj.student = req.loggedInUser._id;
      obj.series = ans.series;
      obj.question = ans.question;
      data.push(obj);
    }

    // });
    const savedAnswers = await AnswerModal.insertMany(data);
    res.json(savedAnswers);
  } catch (err) {
    return next(err);
  }
};

const testResult = async function (req, res, next) {
  try {
    //   console.log(req.loggedInUser._id,req.params.series)
    const allAnswers = await AnswerModal.count({
      series: req.params.seriesId,
      student: req.loggedInUser._id,
    });
    const correctAnswers = await AnswerModal.count({
      series: req.params.seriesId,
      student: req.loggedInUser._id,
      isCorrect: true,
    });
    res.json({ allAnswers, correctAnswers });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitAnswer,
  testResult,
};
