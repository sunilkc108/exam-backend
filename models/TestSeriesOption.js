const mongoose = require("mongoose");
const testSeriesQuestionOptionsSchema = new mongoose.Schema({
  createdBy: {
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

  text: {
    type: "String",
    required: true,
  },

  isCorrect: {
    type: "Boolean",
    default: false,
  },

  isEnabled: {
    type: Boolean,
    default: true,
  },
});

const TestSeriesQuestionOptionModel = new mongoose.model(
  "testseriesquestionoption",
  testSeriesQuestionOptionsSchema
);

module.exports = TestSeriesQuestionOptionModel;
