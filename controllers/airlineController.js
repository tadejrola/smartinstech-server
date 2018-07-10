const express = require('express');
const router = express.Router();
var mysql = require('../dbHelpers/connection.js').pool;
var web3 = require("../abi/web3config.js");
var loginContract = require("../abi/loginAbi.js")(web3);
var baggageInsuranceContract = require("../abi/baggageInsuranceAbi.js")(web3);


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
router.post('/', async (req, res) => {
    let username = req.body.email;
    let password = req.body.pwd;

    await loginContract.methods.getAddressFromUsername(username).call((error, result) => {
        if (error)
            res.status(500).json(error);
        else {
            if (result != "0x0000000000000000000000000000000000000000") {
                res.status(404).json(result);
            } else {
                web3.eth.personal.newAccount(password).then((addr) => {
                    console.log("addr: " + addr);
                    let abi_encoded = loginContract.methods.registerUsername(addr, username).encodeABI();
                    let tx = {
                        from: addr,
                        gas: 2000000,
                        gasPrice: 0,
                        to: loginContract.options.address,
                        data: abi_encoded
                    };
                    let tran = web3.eth.personal.sendTransaction(tx, password).then((tran_res) => {
                        console.log("Registracija uporabnika: " + tran_res);
                    });
                    let airline = req.body;
                    var sql = `INSERT INTO airline (name, email, linkToWS, TRR, ethAddress, insurancePrice, maxPayout) \
                               VALUES ('${airline.name}','${airline.email}','${airline.linkToWS}','${airline.TRR}', \
                            '${addr}',${airline.insurancePrice},${airline.maxPayout})`;
                    console.log(sql);

                    mysql.getConnection(function (err, mysqlConnection) {
                        mysqlConnection.query(sql, (err, rows, fields) => {
                            if (!err)
                                res.end('Inserted user');

                            else
                                console.log(err);
                        })
                        mysqlConnection.release();
                    })

                });
            }
        }
    });
})

router.post('/login', (req, res, next) => {
    let username = req.body.email;
    let password = req.body.pwd;
    let address = "";
    loginContract.methods.getAddressFromUsername(username).call((error, result) => {
        if (error)
            res.status(404).json({
                status: error
            });
        else {
            console.log(result);
            address = result;
            web3.eth.personal.unlockAccount(address, password, 20).then((response) => {
                status = response;
                if (response) {

                    console.log("račun odklenjen");
                    baggageInsuranceContract.methods.getInsurance(1).call((error, result) => {
                        if (error)
                            res.status(404).json(error);
                        else {
                            if (result)
                                res.json(result);
                            else res.status(403).json({
                                error: "not insurance"
                            });
                        }
                    });
                } else res.status(403).json({
                    status: response
                });
            }).catch((error) => {
                console.log(error);
                res.status(403).json({
                    status: error
                })
            });
        }
    });
});

// Update airline
router.put('/:id', (req, res) => {
    let airline = req.body;
    let id = req.params.id;
    var sql = `UPDATE airline SET name='${airline.name}', linkToWS='${airline.linkToWS}', \
               TRR='${airline.TRR}', insurancePrice=${airline.insurancePrice}, maxPayout='${airline.maxPayout}', \
               WHERE idAirline=${id}`;

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


