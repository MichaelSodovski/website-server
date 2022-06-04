var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'V8OYdaMVxsXl0LQEU8So',
    database: 'site_db',
    insecureAuth: true
});

connection.connect(err => {
    if (err) throw new Error('mySql failed connection');
    console.log('connected to SQL server');
})

const runSqlQueryOnDBAddUser = (expression, data) => {
    return new Promise((resolve, reject) => {
        connection.query(expression, data, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    })
}

const runSqlQueryOnDB = (expression) => {
    return new Promise((resolve, reject) => {
        connection.query(expression, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    })
}

module.exports = {
    runSqlQueryOnDB,
    runSqlQueryOnDBAddUser
}