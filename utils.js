const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3'); 
const chadContractAbi = require('./abis/ChadABI.json');
const lotteryContractAbi = require('./abis/LotteryABI.json');
const { PRIZE_TIME } = require('./config');

const wsProvider = new Web3.providers.WebsocketProvider(`wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_API_KEY}`);
const hdProvider = new HDWalletProvider(process.env.PRIVATE_KEY, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`);
const web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`);
const chadContract = new web3.eth.Contract(chadContractAbi, process.env.CHAD_CA);
const lotteryContract = new web3.eth.Contract(lotteryContractAbi, process.env.LOTTERY_CA);
chadContract.setProvider(hdProvider);
lotteryContract.setProvider(wsProvider);

const getLotteryTimeLeft = () => {
  let now = new Date();
  let hours  = PRIZE_TIME > now.getHours() ? PRIZE_TIME - now.getHours() - 1 : 0;
  let mins = 59 - now.getMinutes();
  let secs = 59 - now.getSeconds();
  let terminated = PRIZE_TIME <= now.getHours() ? true : false;
  
  return {
    left: hours * 3600 + mins * 60 + secs,
    terminated: terminated
  }
}

module.exports = {
  getLotteryTimeLeft,
  chadContract,
  lotteryContract,
}