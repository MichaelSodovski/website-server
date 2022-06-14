const { runSqlQueryOnDB } = require('../services/db.service')
require("dotenv").config();

const getArticles = async (req, res) => {
    try {
        const expression = "SELECT * FROM articles";
        await runSqlQueryOnDB(expression).then(result => {
            return res.send(result);
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getArticles
}