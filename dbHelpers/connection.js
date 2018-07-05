var mysql = require('mysql');

var pool = mysql.createPool({
    host: '164.8.250.122',
    user: 'pkp_bc',
    password: 'pkp_bc',
    database: 'pkp_bc'
});

// var getConnection = function (callback) {
//     pool.getConnection(function (err, connection) {
//         callback(err, connection);
//     });
// };

// module.exports = getConnection;
exports.pool = pool;