const dbService = require('./db.service');
const jwt = require("jsonwebtoken");
const res = require('express/lib/response');
const dotenv = require("dotenv").config();

const addUser = async (user) => {
    try {
        // add logic to prevent many users to have the same username
        const expression = `INSERT INTO users SET ?`
        const addedUser = await dbService.runSqlQueryOnDBAddUser(expression, user);
        return addedUser
    } catch (err) {
        console.log(err);
    }
}
const userDelete = async (userToDelete) => {
    try {
        const expression = `DELETE FROM users WHERE id = '${userToDelete}'`;
        await dbService.runSqlQueryOnDB(expression);
    } catch (err) {
        console.log(err);
    }
}
const getUserByCredentials = async (userCredentials) => {
    try {
        const username = userCredentials.userName;
        const passWord = userCredentials.passWord;
        const expression = `SELECT * FROM users WHERE userName='${username}' AND passWord='${passWord}'`;
        const user = await dbService.runSqlQueryOnDB(expression)
        if (user.length === 0) {
            return new Error('no user with this name or password');
        }
        else {
            let jwtSecretKey = process.env.JWT_KEY;
            let data = {
                time: Date(),
                userId: user[0].id,
            }
            const token = jwt.sign(data, jwtSecretKey);
            user[0].jwtToken = token;
            user[0].passWord = null;
        }
        return user;
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
    getUserByCredentials,
    checkIfUserEmailExists,
    userDelete
}

