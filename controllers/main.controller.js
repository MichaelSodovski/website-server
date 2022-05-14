const { runSQL } = require('../services/db.service')
const userService = require('../services/user.service');

const getUSers = async (req, res) => {
    const sqlQUery = "SELECT * FROM users";
    await runSQL(sqlQUery).then(result => {
        return res.send(result);
    })
};

const addUser = async (req, res) => {
    try {
        const user = req.body;
        const addedUser = await userService.add(user);
        return res.json(addedUser)
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUSers, addUser };
