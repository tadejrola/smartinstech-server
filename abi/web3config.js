var Web3 = require('web3');

// var web3Provider = new Web3(new Web3.providers.WebsocketProvider('ws://164.8.251.137:8546'));
var web3Provider = new Web3(new Web3.providers.HttpProvider('http://164.8.251.137:8545'));

module.exports = web3Provider;
