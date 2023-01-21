const { runSqlQueryOnDB } = require('../services/db.service')
const userService = require('../services/user.service');
require("dotenv").config();

const getUSers = async (req, res) => {
    const expression = "SELECT * FROM users";
    await runSqlQueryOnDB(expression).then(result => {
        return res.send(result);
    })
};

const addUser = async (req, res) => {
    try {
        const user = req.body;
        const userToAdd = await userService.addUser(user);
        return res.json(userToAdd)
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const userToDelete = req.body.userId;
        await userService.userDelete(userToDelete);
        return res.end(`User '${userToDelete.userId}' has been deleted.`);
    } catch (err) {
        console.log(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const userToUpdate = req.body;
        await userService.updateUser(userToUpdate);
        return res.end(`User '${userToUpdate.userId}' has been updated.`);
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    getUSers,
    addUser,
    deleteUser,
    updateUser,
    // redirectToSentMail,
    // redirectToPassSucceesUpdate
}