require('dotenv').config()
const express = require('express')
const cors = require('cors');
const cron = require('node-cron');
const { PRIZE_TIME } = require('./config');
const { getLotteryTimeLeft } = require('./utils');
const { beginDraw, monitorLotteryEvent } = require('./logic');

const app = express();
const port = 3011;

app.use(cors());

app.get('/getLotteryTimeLeft', (req, res) => {
  const data = getLotteryTimeLeft();
  res.send(data);
});

app.listen(port, () => {
  console.log(`Node app listening on port ${port}`);
});

const initApp = () => { 
  const task = cron.schedule(`0 0 ${PRIZE_TIME} * * * *`, () =>  {
    console.log('will execute every hour until stopped');
    beginDraw();
  });
  // beginDraw();
  monitorLotteryEvent();
}

initApp();

module.exports = app;