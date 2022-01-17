const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/exam_db", (error) => {
  if (error) {
    console.log("db connection failed");
    return;
  }
  console.log("db connection successful!");
});
