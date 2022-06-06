const { runSqlQueryOnDB } = require('../services/db.service')
const userService = require('../services/user.service');
const jwt = require("jsonwebtoken");
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

const login = async (req, res) => {
    try {
        const userCredentials = req.body;
        const tokens = await userService.getUserByCredentials(userCredentials);
        res.cookie('Authorization', `'${'Bearer'}' + '${' '}' + '${tokens.jwtToken}'`, {
            maxAge: 30000,
            httpOnly: true
        });
        res.cookie('Refresh', `'${tokens.refreshToken}'`, {
            maxAge: 30000,
            httpOnly: true
        });
        res.sendStatus(200); // status ok
    } catch (err) {
        console.log(err);
    }
}

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']; // get the token from the request headers 
    const token = authHeader && authHeader.split(' ')[1]; // filter out the bearer part and keep the token itself
    if (token == null) return res.sendStatus(401); // send back unauthorized if token is missing 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { // if token exists then verify it using ACCESS_TOKEN_SECRET from the .env file
        if (err) return res.sendStatus(403); // on error send back status Forbidden -> you do have a token but he is no longer valid\ 
        // invalid token (maybe the token expired and you already logged out by the time you sent the request)
        req.user = user; // ?
        next() // proceed to the requested action 
    });
}

const refreshToken = (req, res) => {
    const token = req.cookies.token
    let payload
    if (!token) {
        return res.status(401).end() // unauthorized response status.
    }

    try {
        payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end() // unauthorized response status.
        }
        return res.status(400).end() // Bad Request response status.
    }
    // We ensure that a new token is not issued until enough time has elapsed.
    // In this case, a new token will only be issued if the old token is within.
    // 30 seconds of expiry. Otherwise, return a bad request status.
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
        return res.status(400).end() // Bad Request response status.
    }
    // Now, create a new token for the current user, with a renewed expiration time.
    const newToken = jwt.sign({ username: payload.username }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: '60m',
    })
    // Set the new token as the user's 'authorization' cookie.
    res.cookie('authorization', newToken, { maxAge: '60m' })
    res.end()
}

const logOut = async (req, res) => {
    try {
        res.cookie('authorization', "", {
            maxAge: 0,
            httpOnly: true
        });
        refreshTokens = refreshTokens.filter(token => token !== req.body.jwtToken)
        res.sendStatus(204) // status no content
    } catch (err) {
        console.log(err);
    }
}

// for that to work i need to build logic for updating an existing user and this function will redirect to it
const recoverPassword = async (req, res) => {
    try {
        const userEmail = req.body;
        const userByEmail = await userService.checkIfUserEmailExists(userEmail);
        return res.json(userByEmail);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUSers,
    addUser,
    login,
    recoverPassword,
    deleteUser,
    logOut,
    authenticateToken,
    refreshToken
}

