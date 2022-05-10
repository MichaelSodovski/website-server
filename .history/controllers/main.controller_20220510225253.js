const appVersion = require("../app-version.js");
const { createPDF } = require("../services/iframeToPdf.service");
const { actionsEnum } = require("../services/logger/runtime-measure.service");
const {
  log,
  getFlowStatusAndReset,
  logLevelsEnum,
} = require("../services/logger/logger.service");


const getTestFunction = (req, res) => {
  const version = appVersion.Version.version;
  return res.send(version);
};

module.exports = { getTestFunction };
