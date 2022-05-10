var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'V8OYdaMVxsXl0LQEU8So',
    database: 'site_db',
    insecureAuth: true
});

connection.connect(err => {
    if (err) throw new Error('mySql failed connection');
    console.log('connected to SQL server');
})

function runSQL(sqlCommand) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, function (error, results) {
            if (error) reject(error);
            else resolve(results);
        });
    })
}

// connection.end();
module.exports = {
    runSQL
}