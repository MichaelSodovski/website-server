const appVersion = require("../app-version.js");
const { createPDF } = require("../services/iframeToPdf.service");
const { actionsEnum } = require("../services/logger/runtime-measure.service");
const {
  log,
  getFlowStatusAndReset,
  logLevelsEnum,
} = require("../services/logger/logger.service");

const createPdfFromRx = async (req, res) => {
  try {
    log({
      message: `Starting pdf creation \n payload: ${JSON.stringify(req.body)}`,
      label: createPdfFromRx.name,
      record: actionsEnum.START,
    });
    const model = req.body;
    const pdf = await createPDF(model);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);
  } catch (error) {
    log({
      message: `pdf process error: ${JSON.stringify(error)}`,
      label: createPdfFromRx.name,
      level: logLevelsEnum.ERROR,
    });
    res.status(error.statusCode).send(error);
  } finally {
    log({
      message: `pdf completed ${getFlowStatusAndReset()}`,
      label: createPdfFromRx.name,
      record: actionsEnum.STOP,
    });
  }
};

const getAppVersion = (req, res) => {
  const version = appVersion.Version.version;
  return res.send(version);
};

module.exports = { createPdfFromRx, getAppVersion };
