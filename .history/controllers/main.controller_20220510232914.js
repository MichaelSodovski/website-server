const {} runSQL = require('../services/db.service')

const getTestFunction = (req, res) => {
    return res.send("test get function");
};

const getUSers = async (req, res) => {
    const sqlQUery = "SELECT * FROM users_table";
    const users = await runSQL(sqlQUery).then(result => {
        return res.send(result);
    })
};

const saveUsers = (req, res) => {
    return res.send(req.body);
}

module.exports = { getTestFunction, getUSers, saveUsers };
