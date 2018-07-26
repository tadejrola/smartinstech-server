const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin-pkp1:admin-pkp1@ds247001.mlab.com:47001/smartinstech');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

var insuranceSchema = mongoose.Schema({
    baggageNumber: Number,
    insuranceDate: { type: Date, default: Date.now },
    selfPayout: Boolean,
    user: {
        ethAddress: String
    },
    airline: {
        ethAddress: String
    }
});

var Insurances = mongoose.model('smartinstech_insurances', insuranceSchema);

router.get('/', async (req, res, next) => {
    Insurances.find(function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/:id', async (req, res, next) => {
    Insurances.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.post('/', (req, res, next) => {
    let obj = req.body;
    let data = new Insurances({
        baggageNumber: obj.baggageNumber,
        insuranceDate: obj.insuranceDate,
        selfPayout: obj.selfPayout,
        user: {
            ethAddress: obj.user.ethAddress
        },
        airline: {
            ethAddress: obj.airline.ethAddress
        }
    });
    data.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Insurance Created successfully')
    })
});

router.put('/:id', (req, res, next) => {
    Insurances.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, data) {
        if (err) return next(err);
        res.send('Insurance updated.');
    });
});

router.delete('/:id', async (req, res, next) => {
    Insurances.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Insurance successfully removed!');
    })
});

module.exports = router;