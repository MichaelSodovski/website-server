const { runSqlQueryOnDB } = require('../services/db.service')
const userService = require('../services/user.service');
require("dotenv").config();

const getUSers = async (req, res) => {
    const sqlQUery = "SELECT * FROM users";
    await runSqlQueryOnDB(sqlQUery).then(result => {
        return res.send(result);
    })
};

const addUser = async (req, res) => {
    try {
        const user = req.body;
        const addedUser = await userService.addUser(user);
        return res.json(addedUser)
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const userToDelete = req.body.userId;
        await userService.userDelete(userToDelete);
        return res.end(`User '${userToDelete}' has been deleted`);
    } catch {
        console.log(err);
    }
}

module.exports = {
    getUSers,
    addUser,
    deleteUser,
}