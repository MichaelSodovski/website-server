const appVersion = require("../app-version.js");
const { createPDF } = require("../services/iframeToPdf.service");
const { actionsEnum } = require("../services/logger/runtime-measure.service");
const {
  log,
  getFlowStatusAndReset,
  logLevelsEnum,
} = require("../services/logger/logger.service");


const getTestFunction = (req, res) => {
  return res.send("test get function");
};

module.exports = { getTestFunction };
