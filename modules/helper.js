"use strict";

const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");
const config = require("./config");

const helper = {
  mainKeyboard: (ctx, msgText) => {
    ctx.reply(
      msgText,
      Extra.HTML().markup(
        Markup
        // .oneTime()
        .keyboard(["SandBox 🏖️"])
        .resize()
      )
    );
  },

  toAllAdmins: (ctx, msgText) => {
    Object.keys(config.admins).forEach(admin => {
      ctx.telegram.sendMessage(config.admins[admin], msgText, Extra.HTML());
    });
  },

  errHandler: (ctx, err) => {
    console.log(err);
    helper.toAllAdmins(ctx, `${texts.errText}👨‍✈️<code>${err}</code> ☠️`);
  }
};

module.exports = helper;
