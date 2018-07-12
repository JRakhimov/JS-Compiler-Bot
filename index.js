const Telegraf = require("telegraf");
const { VM } = require("vm2");
const _ = require("lodash");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const vm = new VM();



bot.on("text", (ctx) => {
  try {
    let code = vm.run(`${ctx.message.text}`);
    ctx.reply(code);
  } catch (e) {
    ctx.reply("Syntax error!");
  }
});

bot.catch(err => console.log(err));

try {
  bot.startPolling();
  console.log(".::Bot Started::.");
} catch (e) {
  console.log(e);
}
