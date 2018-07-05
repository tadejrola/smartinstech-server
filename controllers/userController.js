const express = require('express');
const router = express.Router();
var mysql = require('../dbHelpers/connection.js').pool;

// Get all users
router.get('/', (req, res) => {
    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('SELECT * FROM User', (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Get specific user
router.get('/:id', (req, res) => {
    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('SELECT * FROM User WHERE idUser = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Delete user
router.delete('/:id', (req, res) => {
    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('DELETE FROM User WHERE idUser = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send('Deleted successfully');
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Insert user
router.post('/', (req, res) => {
    let user = req.body;
    var sql = "SET @idUser = ?; SET @firstName = ?; SET @lastName = ?; SET @address = ?; \
    SET @city = ?; SET @postCode = ?; SET @country = ?; SET @TRR = ?; SET @ethAddress = ?; \
    CALL UserInsertOrUpdate(@idUser,@firstName,@lastName,@address,@city,@postCode,@country,@TRR,@ethAddress);";

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query(sql, [user.idUser, user.firstName, user.lastName, user.address, user.city, user.postCode, user.country, user.TRR, user.ethAddress], (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if (element.constructor == Array)
                        res.send('Inserted user id: ' + element[0].idUser);
                });
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Update user
router.put('/', (req, res) => {
    let user = req.body;
    var sql = "SET @idUser = ?; SET @firstName = ?; SET @lastName = ?; SET @address = ?; \
    SET @city = ?; SET @postCode = ?; SET @country = ?; SET @TRR = ?; SET @ethAddress = ?; \
    CALL UserInsertOrUpdate(@idUser,@firstName,@lastName,@address,@city,@postCode,@country,@TRR,@ethAddress);";

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query(sql, [user.idUser, user.firstName, user.lastName, user.address, user.city, user.postCode, user.country, user.TRR, user.ethAddress], (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if (element.constructor == Array)
                        res.send('Updated successfully');
                });
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

module.exports = router;



