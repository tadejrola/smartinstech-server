const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin-pkp1:admin-pkp1@ds247001.mlab.com:47001/smartinstech');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB!");
});
//test

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    postCode: Number,
    country: String,
    TRR: String,
    ethAddress: String,
    username: String,
    password: String
});

var Users = mongoose.model('smartinstech_users', userSchema);

router.get('/', async (req, res, next) => {
    Users.find(function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/:id', async (req, res, next) => {
    Users.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.post('/', (req, res, next) => {
    let obj = req.body;
    let data = new Users({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        address: obj.address,
        city: obj.city,
        postCode: obj.postCode,
        country: obj.country,
        TRR: obj.TRR,
        ethAddress: obj.ethAddress,
        username: obj.username,
        password: obj.password
    });
    data.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
});

router.put('/:id', (req, res, next) => {
    Users.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, data) {
        if (err) return next(err);
        res.send('User updated.');
    });
});

router.delete('/:id', async (req, res, next) => {
    Users.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('User successfully removed!');
    })
});

module.exports = router;
