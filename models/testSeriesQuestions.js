const mongoose = require("mongoose");
const testSeriesQuestionSchema = new mongoose.Schema({
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
  title: {
    type: "String",
    required: true,
  },
  isEnabled: {
    type: "Boolean",
    default: true,
  },
});

const TestSeriesQuestionModel = new mongoose.model(
  "testseriesquestions",
  testSeriesQuestionSchema
);

module.exports = TestSeriesQuestionModel;
