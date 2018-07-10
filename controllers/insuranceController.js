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
    let insurance = req.body;
    var sql = `INSERT INTO insurance (referenceNumber, insuranceDate, payment, User_idUser, Airline_idAirline)\
        VALUES ('${insurance.referenceNumber}','${insurance.insuranceDate}',${insurance.payment},${insurance.User_idUser}, ${insurance.Airline_idAirline})`;
    console.log(sql);

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query(sql, (err, rows, fields) => {
            if (!err)
                res.end('Inserted insurance');

            else
                console.log(err);
        })
        mysqlConnection.release();
    })

})

// Update insurance
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let insurance = req.body;
    var sql = `UPDATE insurance SET referenceNumber='${insurance.referenceNumber}', insuranceDate='${insurance.insuranceDate}', \
    payment='${insurance.payment}', User_idUser='${insurance.User_idUser}', Airline_idAirline=${insurance.Airline_idAirline}, \
               WHERE idInsurance=${id}`;

    mysql.getConnection(function (err, mysqlConnection) {
        mysqlConnection.query(sql, (err, rows, fields) => {
            if (!err)
                res.send('Updated successfully');
            else
                console.log(err);
        })
        mysqlConnection.release();
    })
})

module.exports = router;


