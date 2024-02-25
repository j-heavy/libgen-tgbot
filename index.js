const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config()

const token = process.env.BOT_TOKEN
const tokenTwo = process.env.BOT_TOKEN_TWO

const bot = new TelegramBot(token, {polling: true});
const botTwo = new TelegramBot(tokenTwo, {polling: true});

const USERS = {}

bot.on('message', msg => {

  const userLogin = msg.from.username
  const userName = msg.from.first_name
  const text = msg.text

  console.log(msg)

  msgData = `message from ${userName} ${userLogin === undefined ? '' : `(@${userLogin})`}
id: ${msg.from.id}
${text}`

  USERS[userLogin] = {
    name: userName,
    id: msg.from.id
  }

 botTwo.sendMessage(580241223, msgData)
});

botTwo.on('message', msg => {

  if (msg.text === '/stats') {
    botTwo.sendMessage(580241223, JSON.stringify(USERS, null, "\t"));
  }

  if (msg.text === '/count') {
    const number = Object.keys(USERS).length

    botTwo.sendMessage(580241223, number);
  }
});