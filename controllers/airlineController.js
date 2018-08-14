const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin-pkp1:admin-pkp1@ds247001.mlab.com:47001/smartinstech');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

var airlineSchema = mongoose.Schema({
    name: String,
    email: String,
    linkToWS: String,
    pathToData: String,
    TRR: String,
    ethAddress: String,
    insurancePrice: Number,
    maxPayout: Number,
    username: String,
    password: String
});

var Airlines = mongoose.model('smartinstech_airlines', airlineSchema);

router.get('/', async (req, res, next) => {
    Airlines.find(function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/:id', async (req, res, next) => {
    Airlines.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.post('/login', (req, res, next) => {

    let obj = req.body;

    Airlines.findOne({ username: obj.username }, function (err, result) {
        if (err) return next(err);
        if (result != null) {
            if (obj.password == result.password) {
                res.send(result);
            }
            else {
                res.send(401);
            }
        }
        else {
            res.send(404);
        }
    })

});

router.post('/', (req, res, next) => {
    let obj = req.body;
    let data = new Airlines({
        name: obj.name,
        email: obj.email,
        linkToWS: obj.linkToWS,
        pathToData: obj.pathToData,
        TRR: obj.TRR,
        ethAddress: obj.ethAddress,
        insurancePrice: obj.insurancePrice,
        maxPayout: obj.maxPayout,
        username: obj.username,
        password: obj.password
    });
    data.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Airline Created successfully')
    })
});

router.put('/:id', (req, res, next) => {
    Airlines.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, data) {
        if (err) return next(err);
        res.send('Airline updated.');
    });
});

router.delete('/:id', async (req, res, next) => {
    Airlines.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Airline successfully removed!');
    })
});

module.exports = router;