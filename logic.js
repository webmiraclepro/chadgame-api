const { chadContract, lotteryContract } = require('./utils');

const monitorLotteryEvent = () => {  

  // lotteryContract.events.WinnerSelected({}, { fromBlock: 0, toBlock: 'latest' }).on(
  //   'data', function(event) {
  //   console.log(event);
  // }).on('error', console.error);

  lotteryContract.events.WinnerPrized({
    filter: {
      value: [],
    },
  })
    .on('data', function(event) {
      console.log("pay prize done!");
      // chadContract.methods.payPrize().send({
      //   from: process.env.OWNER_ADDRESS
      // }).on('receipt', function(){
      //   console.log('Payment done');
      // });
    })
    .on('changed', function(event) {
      console.log(event);
    })
    .on('error', console.error);
}

const beginDraw = () => {
  console.log("Starting the draw to select the winner...");

  chadContract.methods.draw().send({
    from: process.env.OWNER_ADDRESS
  }).on('receipt', function(){
    console.log('transaction for draw lottery is done.');
  });
};

module.exports = {
  beginDraw,
  monitorLotteryEvent
};