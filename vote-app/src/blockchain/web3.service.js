import * as React from "react";
import { useEffect, useState } from 'react';
import Web3 from 'https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js';
import { Contract } from "https://cdn.esm.sh/v58/web3@1.6.1/es2021/web3.js";
//import Web3 from "web3";
//import { Contract } from "web3-eth-contract";

const contractAbi = require("./contractABI.json");

export default class Web3Service {
    
    contractAddress = '0xA2842985ddF11126e3255F1d241fA78ed1Ef1b08';

    constructor() {
        if (window.web3) {
            this.web3 = new Web3(window.ethereum);
            this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);
            window.ethereum.enable().catch((err) =>{
                console.log(err);
            });
        }
    }

    getAccount = () => {
        return this.web3.eth.requestAccounts.then((accounts) => accounts[0] || '');
    };
    
    // Functions that have return value
    // fnName: corresponding function in Solidity
    // args: parameters that should be passed to Solidity
    async call(fnName, ...args) {
        const account = this.getAccount();
        return this.contract.methods[fnName](...args).call({from: account});
    }

    // Functions without return value
    async execute(fnName, ...args) {
        const account = this.getAccount();
        this.contract.methods[fnName](...args).call({from: account});
    }

}