const express = require('express');
const router = express.Router();
var mysql = require('../dbHelpers/connection.js').pool;

// Get all insurances
router.get('/', (req, res) => {

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('SELECT * FROM Insurance', (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        mysqlConnection.release();
    })
})

// Get specific insurance
router.get('/:id', (req, res) => {

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('SELECT * FROM Insurance WHERE idInsurance = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        mysqlConnection.release();
    })
})

// Delete insurance
router.delete('/:id', (req, res) => {

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query('DELETE FROM Insurance WHERE idInsurance = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send('Deleted successfully');
            else
                console.log(err);
        })
        mysqlConnection.release();
    })
})

// Insert insurance
router.post('/', (req, res) => {
    let ins = req.body;
    var sql = "SET @idInsurance = ?; SET @referenceNumber = ?; SET @insuranceDate = ?; SET @payment = ?; \
    SET @User_idUser = ?; SET @Airline_idAirline = ?; \
    CALL InsuranceInsertOrUpdate(@idInsurance,@referenceNumber,@insuranceDate,@payment,@User_idUser,@Airline_idAirline);";

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query(sql, [ins.idInsurance, ins.referenceNumber, ins.insuranceDate, ins.payment, ins.User_idUser, ins.Airline_idAirline], (err, rows, fields) => {
            if (!err)
                rows.forEach(element => {
                    if (element.constructor == Array)
                        res.send('Inserted insurance id: ' + element[0].idInsurance);
                });
            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Update insurance
router.put('/', (req, res) => {
    let ins = req.body;
    var sql = "SET @idInsurance = ?; SET @referenceNumber = ?; SET @insuranceDate = ?; SET @payment = ?; \
    SET @User_idUser = ?; SET @Airline_idAirline = ?; \
    CALL InsuranceInsertOrUpdate(@idInsurance,@referenceNumber,@insuranceDate,@payment,@User_idUser,@Airline_idAirline);";

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query(sql, [ins.idInsurance, ins.referenceNumber, ins.insuranceDate, ins.payment, ins.User_idUser, ins.Airline_idAirline], (err, rows, fields) => {
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


