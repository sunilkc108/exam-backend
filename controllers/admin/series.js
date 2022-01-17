const UserModel = require("../../models/user");
const TestSeriesModel = require("../../models/testSeries");
const TestSeriesQuestionModel = require("../../models/testSeriesQuestions");
const TestSeriesQuestionOptionModel = require("../../models/TestSeriesOption");

const getSeries = async (req, res, next) => {
  try {
    const series = await TestSeriesModel.find();
    res.json(series);
  } catch (error) {
    next(error);
  }
};

const getSeriesById = async (req, res, next) => {
  try {
    const series = await TestSeriesModel.findById(req.params.seriesId);
    res.json(series);
  } catch (error) {
    next(error);
  }
};

const addSeries = async (req, res, next) => {
  try {
    let { name, time } = req.body;

    if (!name || !time) {
      throw { msg: "All fields are required", status: 400 };
    }

    const newSeries = await TestSeriesModel.create({
      name,
      timeLimit: time,
      createdBy: req.loggedInUser._id,
    });

    res.json(newSeries);
  } catch (error) {
    next(error);
  }
};

const editSeries = async (req, res, next) => {
  try {
    let { name, timeLimit } = req.body;

    const series = await TestSeriesModel.findById(req.params.seriesId);

    if (!series) {
      throw { msg: "Series not found!", status: 400 };
    }

    if (!timeLimit || !name) {
      throw { msg: "Test series name and time are required!", status: 400 };
    }

    series.timeLimit = timeLimit;
    series.name = name;
    series.createdBy = req.loggedInUser._id;

    const updatedSeries = await series.save();
    res.json(updatedSeries);
  } catch (error) {
    return next(error);
  }
};

const deleteSeries = async (req, res, next) => {
  try {
    const series = await TestSeriesModel.findById(req.params.seriesId);

    if (!series) {
      throw { msg: "Series not found!", status: 400 };
    }

    const deleteSeries = await series.remove();
    res.json(deleteSeries);
  } catch (error) {
    return next(error);
  }
};
const deleteSeriesQuestion = async (req, res, next) => {
  try {
    const seriesQuestion = await TestSeriesQuestionModel.findById(
      req.params.questionId
    );

    if (!seriesQuestion) {
      throw { msg: "Series question not found!", status: 400 };
    }

    const deleteSeriesQuestion = await seriesQuestion.remove();
    res.json(deleteSeries);
  } catch (error) {
    return next(error);
  }
};

const addSeriesQuestion = async (req, res, next) => {
  try {
    let { question } = req.body;
    if (!question) {
      throw { msg: "Question is required", status: 400 };
    }
    const newSeries = await TestSeriesQuestionModel.create({
      title: question,
      series: req.params.seriesId,
      createdBy: req.loggedInUser._id,
    });

    res.json(newSeries);
  } catch (error) {
    console.log(error, "error");
    next(error);
  }
};
const addSeriesOption = async (req, res, next) => {
  try {
    let { option, isCorrect } = req.body;

    // if (!option || !isCorrect) {
    //   throw { msg: "Question is required", status: 400 };
    // }

    isCorrect === "on" ? (isCorrect = true) : (isCorrect = false);

    console.log(req.body, "options ....");
    const newSeries = await TestSeriesQuestionOptionModel.create({
      text: option,
      series: req.params.seriesId,
      question: req.params.questionId,
      createdBy: req.loggedInUser._id,
      isCorrect: isCorrect,
    });

    res.json(newSeries);
  } catch (error) {
    console.log(error, "error");
    next(error);
  }
};

const getSeriesQuestions = async (req, res, next) => {
  try {
    const series = await TestSeriesQuestionModel.find({
      series: req.params.seriesId,
    });
    // if(series.length > 0){
    //   const firstOption = await
    // }
    res.json(series);
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};
const getSeriesQuestionOptions = async (req, res, next) => {
  try {
    const series = await TestSeriesQuestionOptionModel.find({
      series: req.params.seriesId,
      question: req.params.questionId,
    });
    res.json(series);
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

module.exports = {
  getSeries,
  getSeriesById,
  addSeries,
  editSeries,
  deleteSeries,
  addSeriesQuestion,
  getSeriesQuestions,
  deleteSeriesQuestion,
  addSeriesOption,
  getSeriesQuestionOptions,
};
