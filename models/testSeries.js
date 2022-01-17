const mongoose = require("mongoose");
const testSeriesSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: "String",
    required: true,
  },
  timeLimit: {
    type: "String",
    required: true,
    match: [/^\d?\d\:\d\d?$/, "Time limit must be of format hh:mm (1:30)"],
  },
  description: {
    type: "String",
  },
});

const TestSeriesModel = new mongoose.model("testseries", testSeriesSchema);

module.exports = TestSeriesModel;
