const runSQL = require('../services/db.service')

const getTestFunction = (req, res) => {
    return res.send("test get function");
};

const getUSers = (req, res) => {
    const sqlQUery = "SELECT * FROM userstable"
    const users = runSQL()
    return res.send("Users func");
};

const saveUsers = (req, res) => {
    return res.send(req.body);
}

module.exports = { getTestFunction, getUSers, saveUsers };
