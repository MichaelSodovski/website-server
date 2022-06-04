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
        const userToDelete = req.body.userId;
        await userService.userDelete(userToDelete);
        return res.end(`User '${userToDelete}' has been deleted`)
    } catch {
        console.log(err);
    }
}

const login = async (req, res) => {
    try {
        
        const userCredentials = req.body;
        const validatedUser = await userService.getUserByCredentials(userCredentials);
        debugger;
        res.cookie('Authorization', `bearer '${validatedUser[0].jwtToken}'`);
        return res.send('ok');
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
    deleteUser
}

