const dbService = require('./db.service');

const add = async (user) => {
    try {
        const expression = `INSERT INTO users SET ?`
        const addedUser = await dbService.insertIntoTable(expression, user);
        return addedUser
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    add
}

