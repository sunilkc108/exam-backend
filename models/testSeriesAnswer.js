const mongoose = require("mongoose");
const testSeriesAnswersSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  series: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "testseries",
    required: true,
  },

  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "testseriesquestions",
    required: true,
  },
  // option: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "testseriesquestions",
  //   required: true,
  // },
  isCorrect: {
    type: "Boolean",
    default: false,
  },
});

const TestSeriesAnswerModel = new mongoose.model(
  "testseriesanswers",
  testSeriesAnswersSchema
);

module.exports = TestSeriesAnswerModel;
