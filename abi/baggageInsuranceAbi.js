module.exports = function (web3) {
    let baggageInsuranceContract = new web3.eth.Contract(
        [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "Insurances",
                "outputs": [
                    {
                        "name": "airline",
                        "type": "address"
                    },
                    {
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "name": "dateOfInsurance",
                        "type": "uint256"
                    },
                    {
                        "name": "dateTimeOfFirstPayout",
                        "type": "uint256"
                    },
                    {
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "name": "maxPayout",
                        "type": "uint256"
                    },
                    {
                        "name": "paid1stTier",
                        "type": "bool"
                    },
                    {
                        "name": "paid2ndTier",
                        "type": "bool"
                    },
                    {
                        "name": "paidFull",
                        "type": "bool"
                    },
                    {
                        "name": "totalPaid",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "getInsurance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "address"
                    },
                    {
                        "name": "",
                        "type": "address"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "balance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "name": "_airline",
                        "type": "address"
                    },
                    {
                        "name": "_maxPayout",
                        "type": "uint256"
                    },
                    {
                        "name": "_dateTimeOfFirstPayout",
                        "type": "uint256"
                    }
                ],
                "name": "createInsurance",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getTimeStamp",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "checkInsurance",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "airline",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "maxPayout",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "dateTimeOfFirstPayout",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "dateOfInsurance",
                        "type": "uint256"
                    }
                ],
                "name": "InsuranceConcluded",
                "type": "event"
            }
        ], "0x1b6fc55fdde13a73c477256d7ea338b1bd38bf67");
    return baggageInsuranceContract;
};
