const express = require('express');
const router = express.Router();
var mysql = require('../dbHelpers/connection.js').pool;


// Get all airlines
router.get('/', (req, res) => {
    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('SELECT * FROM Airline', (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Get specific airline
router.get('/:id', (req, res) => {
    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('SELECT * FROM Airline WHERE idAirline = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Delete airline
router.delete('/:id', (req, res) => {
    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('DELETE FROM Airline WHERE idAirline = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send('Deleted successfully');
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Insert airline
router.post('/', (req, res) => {

    let air = req.body;
    var sql = "SET @idAirline = ?; SET @name = ?; SET @linkToWS = ?; SET @ethAddress = ?; \
    SET @insurancePrice = ?; SET @firstPayment = ?; SET @lastPayment = ?; \
    CALL AirlineInsertOrUpdate(@idAirline,@name,@linkToWS,@ethAddress,@insurancePrice,@firstPayment,@lastPayment);";

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query(sql, [air.idAirline, air.name, air.linkToWS, air.ethAddress, air.insurancePrice, air.firstPayment, air.lastPayment], (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if (element.constructor == Array)
                        res.send('Inserted airline id: ' + element[0].idAirline);
                });
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Update airline
router.put('/', (req, res) => {
    let air = req.body;
    var sql = "SET @idAirline = ?; SET @name = ?; SET @linkToWS = ?; SET @ethAddress = ?; \
    SET @insurancePrice = ?; SET @firstPayment = ?; SET @lastPayment = ?; \
    CALL AirlineInsertOrUpdate(@idAirline,@name,@linkToWS,@ethAddress,@insurancePrice,@firstPayment,@lastPayment);";

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query(sql, [air.idAirline, air.name, air.linkToWS, air.ethAddress, air.insurancePrice, air.firstPayment, air.lastPayment], (err, rows, fields) => {
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


