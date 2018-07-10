var mysql = require('mysql');

// var pool = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

var pool = mysql.createPool({
    host: "164.8.250.122",
    user: "pkp_bc",
    password: "pkp_bc",
    database: "pkp_bc"
});

exports.pool = pool;