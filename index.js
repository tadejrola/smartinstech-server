const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(require("cors")());
app.use(bodyParser.json());
app.use('/api/airlines', require('./controllers/airlineController'));
app.use('/api/users', require('./controllers/userController'));
app.use('/api/insurances', require('./controllers/insuranceController'));

var port = process.env.PORT || 3000;
app.listen(port);
console.log(port);