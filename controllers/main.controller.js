const { runSqlQueryOnDB } = require('../services/db.service')
const userService = require('../services/user.service');

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
        const userToDelete = req.body;
        const deletedUser = await userService.userDelete(userToDelete);
        return res.end(`User '${userToDelete.userId}' has been deleted`)
    } catch {
        console.log(err);
    }
}

const validateUser = async (req, res) => {
    try {
        const userCredentials = req.body;
        const validatedUser = await userService.validateUserByCredentials(userCredentials);
        return res.json(validatedUser)
    } catch (err) {
        console.log(err);
    }
}

const recoverPassword = async (req, res) => {
    try {
        const userEmail = req.body;
        const userByEmail = await userService.checkIfUserEmailExists(userEmail);
        return res.json(userByEmail);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUSers, addUser, validateUser, recoverPassword, deleteUser }

