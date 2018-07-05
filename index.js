const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: '164.8.250.122',
    user: 'pkp_bc',
    password: 'pkp_bc',
    database: 'pkp_bc',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server is running at port no: 3000'));

// Get all users
app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM User', (err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

// Get specific user
app.get('/users/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM User WHERE idUser = ?',[req.params.id], (err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

// Delete user
app.delete('/users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM User WHERE idUser = ?',[req.params.id], (err, rows, fields) => {
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
})

// Insert user
app.post('/users', (req, res) => {
    let user = req.body;
    var sql = "SET @idUser = ?; SET @firstName = ?; SET @lastName = ?; SET @address = ?; \
    SET @city = ?; SET @postCode = ?; SET @country = ?; SET @TRR = ?; SET @ethAddress = ?; \
    CALL UserInsertOrUpdate(@idUser,@firstName,@lastName,@address,@city,@postCode,@country,@TRR,@ethAddress);";
    mysqlConnection.query(sql,[user.idUser,user.firstName,user.lastName,user.address,user.city,user.postCode,user.country,user.TRR,user.ethAddress], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Inserted user id: ' +  element[0].idUser);
            });
        else
            console.log(err);
    })
})

// Update user
app.put('/users', (req, res) => {
    let user = req.body;
    var sql = "SET @idUser = ?; SET @firstName = ?; SET @lastName = ?; SET @address = ?; \
    SET @city = ?; SET @postCode = ?; SET @country = ?; SET @TRR = ?; SET @ethAddress = ?; \
    CALL UserInsertOrUpdate(@idUser,@firstName,@lastName,@address,@city,@postCode,@country,@TRR,@ethAddress);";
    mysqlConnection.query(sql,[user.idUser,user.firstName,user.lastName,user.address,user.city,user.postCode,user.country,user.TRR,user.ethAddress], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Updated successfully');
            });
        else
            console.log(err);
    })
})

// Get all airlines
app.get('/airlines', (req, res) => {
    mysqlConnection.query('SELECT * FROM Airline', (err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

// Get specific airline
app.get('/airlines/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Airline WHERE idAirline = ?',[req.params.id], (err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

// Delete airline
app.delete('/airlines/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Airline WHERE idAirline = ?',[req.params.id], (err, rows, fields) => {
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
})

// Insert airline
app.post('/airlines', (req, res) => {
    let air = req.body;
    var sql = "SET @idAirline = ?; SET @name = ?; SET @linkToWS = ?; SET @ethAddress = ?; \
    SET @insurancePrice = ?; SET @firstPayment = ?; SET @lastPayment = ?; \
    CALL AirlineInsertOrUpdate(@idAirline,@name,@linkToWS,@ethAddress,@insurancePrice,@firstPayment,@lastPayment);";
    mysqlConnection.query(sql,[air.idAirline,air.name,air.linkToWS,air.ethAddress,air.insurancePrice,air.firstPayment,air.lastPayment], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Inserted airline id: ' +  element[0].idAirline);
            });
        else
            console.log(err);
    })
})

// Update airline
app.put('/airlines', (req, res) => {
    let air = req.body;
    var sql = "SET @idAirline = ?; SET @name = ?; SET @linkToWS = ?; SET @ethAddress = ?; \
    SET @insurancePrice = ?; SET @firstPayment = ?; SET @lastPayment = ?; \
    CALL AirlineInsertOrUpdate(@idAirline,@name,@linkToWS,@ethAddress,@insurancePrice,@firstPayment,@lastPayment);";
    mysqlConnection.query(sql,[air.idAirline,air.name,air.linkToWS,air.ethAddress,air.insurancePrice,air.firstPayment,air.lastPayment], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Updated successfully');
            });
        else
            console.log(err);
    })
})

// Get all insurances
app.get('/insurances', (req, res) => {
    mysqlConnection.query('SELECT * FROM Insurance', (err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

// Get specific insurance
app.get('/insurances/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Insurance WHERE idInsurance = ?',[req.params.id], (err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

// Delete insurance
app.delete('/insurances/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Insurance WHERE idInsurance = ?',[req.params.id], (err, rows, fields) => {
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
})

// Insert insurance
app.post('/insurances', (req, res) => {
    let ins = req.body;
    var sql = "SET @idInsurance = ?; SET @referenceNumber = ?; SET @insuranceDate = ?; SET @payment = ?; \
    SET @User_idUser = ?; SET @Airline_idAirline = ?; \
    CALL InsuranceInsertOrUpdate(@idInsurance,@referenceNumber,@insuranceDate,@payment,@User_idUser,@Airline_idAirline);";
    mysqlConnection.query(sql,[ins.idInsurance,ins.referenceNumber,ins.insuranceDate,ins.payment,ins.User_idUser,ins.Airline_idAirline], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Inserted insurance id: ' +  element[0].idInsurance);
            });
        else
            console.log(err);
    })
})

// Update insurance
app.put('/insurances', (req, res) => {
    let ins = req.body;
    var sql = "SET @idInsurance = ?; SET @referenceNumber = ?; SET @insuranceDate = ?; SET @payment = ?; \
    SET @User_idUser = ?; SET @Airline_idAirline = ?; \
    CALL InsuranceInsertOrUpdate(@idInsurance,@referenceNumber,@insuranceDate,@payment,@User_idUser,@Airline_idAirline);";
    mysqlConnection.query(sql,[ins.idInsurance,ins.referenceNumber,ins.insuranceDate,ins.payment,ins.User_idUser,ins.Airline_idAirline], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Updated successfully');
            });
        else
            console.log(err);
    })
})




