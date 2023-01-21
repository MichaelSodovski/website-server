const dbService = require('./db.service');
const jwt = require("jsonwebtoken");
const res = require('express/lib/response');
require("dotenv").config();

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
        const { UserName, PassWord } = userCredentials;
        const expression = `SELECT * FROM users WHERE userName='${UserName}' AND passWord='${PassWord}'`;
        const user = await dbService.runSqlQueryOnDB(expression)
        if (user.length === 0) {
            return res.status(301).end("a user with those credentials don't exist.");
        }
        else {
            const { id } = user[0];
            //generate jwt token
            let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
            let dataJwt = {
                time: Date(),
                userId: id,
            }
            const jwtToken = jwt.sign(dataJwt, jwtSecretKey, {
                algorithm: "HS256",
                expiresIn: '60m'
            });
            // generate refresh token 
            let refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
            let dataRefresh = {
                time: Date(),
                userId: id,
            }
            const refreshToken = jwt.sign(dataRefresh, refreshTokenSecretKey)
            //pack tokens together
            const tokens = { jwtToken: jwtToken, refreshToken: refreshToken }
            return tokens;
        }
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

const updateUserPassWord = async (userToUpdate) => {
    try {
        const expression = `UPDATE site_db.users SET passWord = "${userToUpdate.passWord}" WHERE id = "${userToUpdate.id}"`;
        const updatedUser = await dbService.runSqlQueryOnDB(expression);
        return updatedUser;
    } catch (err) {
        console.log(err);
    }
}

const updateUser = async (userToUpdate) => {
    try {
        const expression = `UPDATE site_db.users SET 
        userName = "${userToUpdate.userName}",
        passWord = "${userToUpdate.passWord}",
        firstName = "${userToUpdate.firstName}",
        lastName = "${userToUpdate.lastName}",
        email = "${userToUpdate.email}",
        birthDate = "${userToUpdate.birthDate}",
        birthDate = "${userToUpdate.birthDate}",
        gender = "${userToUpdate.gender}",
        roleId = "${userToUpdate.roleId}"
        WHERE id = "${userToUpdate.id}"`;
        const userToUpdate = await dbService.runSqlQueryOnDB(expression);
        return userToUpdate;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addUser,
    getUserByCredentials,
    checkIfUserEmailExists,
    userDelete,
    updateUserPassWord,
    updateUser
}

