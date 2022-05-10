const runSQL = require('../services/db.service')

const getTestFunction = (req, res) => {
    return res.send("test get function");
};

const getUSers = (req, res) => {
    const sqlQUery = "SELECT * FROM users_table";
    const users = runSQL(sqlQUery).then(result => {
        return res.send("Users func");

    })
};

const saveUsers = (req, res) => {
    return res.send(req.body);
}

module.exports = { getTestFunction, getUSers, saveUsers };
