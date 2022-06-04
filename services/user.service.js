const dbService = require('./db.service');
const jwt = require("jsonwebtoken");

const addUser = async (user) => {
    try {
        const expression = `INSERT INTO users SET ?`
        const addedUser = await dbService.runSqlQueryOnDB(expression, user);
        return addedUser
    } catch (err) {
        console.log(err);
    }
}

const userDelete = async (userToDelete) => {
    try {
        const expression = `DELETE FROM users WHERE id = '${userToDelete.userId}'`;
        await dbService.runSqlQueryOnDB(expression);
    } catch (err) {
        console.log(err);
    }
}

const validateUserByCredentials = async (userCredentials) => {
    try {
        const username = userCredentials.userName;
        const password = userCredentials.passWord;
        const expression = `SELECT * FROM users WHERE userName = '${username}'`;
        const returnedUserByUsername = await dbService.runSqlQueryOnDB(expression)
        if (returnedUserByUsername !== null) {
            const expression = `SELECT * FROM users WHERE userName='${username}' AND passWord='${password}'`;
            const returnedUser = await dbService.runSqlQueryOnDB(expression);
            let jwtSecretKey = process.env.JWT_KEY;
            let data = {
                time: Date(),
                userId: returnedUser.userId,
            }
            const token = jwt.sign(data, jwtSecretKey);
            returnedUser.append(token)
            console.log("🚀 ~ file: user.service.js ~ line 29 ~ validateUserByCredentials ~ returnedUser", returnedUser)
        }
        else return new Error('no user with this name');
    } catch (err) {
        console.log(err);
    }
}

const checkIfUserEmailExists = async (userEmail) => {
    try {
        const expression = `SELECT * FROM users WHERE email='${userEmail}'`
        const returnedUser = await dbService.runSqlQueryOnDB(expression);
        return returnedUser
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addUser,
    validateUserByCredentials,
    checkIfUserEmailExists,
    userDelete
}

