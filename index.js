"use strict";

const { VM } = require("vm2");
const https = require("https");


const Telegraf = require("telegraf"); // Telegraf dependencies
const session = require("telegraf/session");
const rateLimit = require("telegraf-ratelimit");

const config = require("./modules/config"); // Locale dependencies
const helper = require("./modules/helper");
const scenes = require("./modules/scenes");

const bot = new Telegraf(process.env.BOT_TOKEN); // Bot inits

bot.use(session()); // Middlewares
// bot.use(Telegraf.log());
bot.use(scenes.stage.middleware());
bot.use(rateLimit(config.rateLimit));

bot.start(ctx => helper.mainKeyboard(ctx, 
  `Welcome! Click "SandBox 🏖️" button to enter to the sandbox`
));

bot.hears("SandBox 🏖️", ({ scene }) => scene.enter("sandBox"));

bot.on("document", (ctx) => {
  if (ctx.message.document || ctx.message.document.mime_type === "application/javascript") {
    ctx.telegram.getFileLink(ctx.message.document.file_id)
      .then(async fileUrl => {
        let jsFile = await '';
        await https.get(fileUrl, function (response) {
          response.on('data', function (chunk) {
            jsFile += chunk;
          });
          
          response.on('end', function () {
            const vm = new VM();
            let yourCode = "";
            yourCode = vm.run(jsFile);
            console.log(yourCode);
            ctx.reply(yourCode)
              .catch((e) => {
                ctx.reply(e)
              })
            console.log(jsFile);
          });
        });
      })

  }
})

bot.catch(err => console.log(err));

try {
  bot.startPolling();
  console.log(".::Bot Started::.");
} catch (e) {
  throw new Error("Couldn't start the bot, here is details: " + e);
}
