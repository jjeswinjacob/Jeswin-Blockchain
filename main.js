const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const {Blockchain, Transaction} = require('./blockchain');

let jeswinCoin = new Blockchain();

let jeswinKeyPair = ec.genKeyPair();
let jeswinPrivate = jeswinKeyPair.getPrivate('hex');
let jeswinPublic = jeswinKeyPair.getPublic('hex');

let joeKeyPair = ec.genKeyPair();
let joePrivate = joeKeyPair.getPrivate('hex');
let joePublic = joeKeyPair.getPublic('hex');

let minerKeyPair = ec.genKeyPair();
let minerPrivate = minerKeyPair.getPrivate('hex');
let minerPublic = minerKeyPair.getPublic('hex');

console.log('Balance of Jeswin is ', jeswinCoin.getBalanceOfAddress(jeswinPublic));
console.log('Balance of Joe is ', jeswinCoin.getBalanceOfAddress(joePublic));
console.log('Balance of Miner is ', jeswinCoin.getBalanceOfAddress(minerPublic));
jeswinCoin.minePendingTransactions(jeswinPublic);
console.log('Balance of jeswin after mining is ', jeswinCoin.getBalanceOfAddress(jeswinPublic));

const tx1 = new Transaction(jeswinPublic, joePublic, 10);
tx1.signTransaction(jeswinKeyPair);
jeswinCoin.addTransaction(tx1);

const tx2 = new Transaction(jeswinPublic, joePublic, 5);
tx2.signTransaction(jeswinKeyPair);
jeswinCoin.addTransaction(tx2);

console.log('Starting the miner...');
jeswinCoin.minePendingTransactions(minerPublic);

console.log('Balance of Jeswin is ', jeswinCoin.getBalanceOfAddress(jeswinPublic));
console.log('Balance of Joe is ', jeswinCoin.getBalanceOfAddress(joePublic));
console.log('Balance of Miner is ', jeswinCoin.getBalanceOfAddress(minerPublic));

console.log(JSON.stringify(jeswinCoin, null, 4));

console.log('Is blockchain valid?' + jeswinCoin.isChainValid());
jeswinCoin.chain[1].transactions[0].amount = 20;
console.log('Is blockchain valid?' + jeswinCoin.isChainValid());