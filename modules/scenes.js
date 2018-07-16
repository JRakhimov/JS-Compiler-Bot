"use strict";

const { VM } = require("vm2");
const Stage = require("telegraf/stage");
const Scene = require('telegraf/scenes/base');

const config = require("../modules/config");

const sandBox = new Scene("sandBox");
sandBox.enter(ctx => {
  ctx.scene.session.yourCode = [];
  ctx.reply("Now you are in sandbox...");
});

sandBox.hears("exit", ctx => {
  ctx.reply("Closing sandBox");
  return ctx.scene.leave();
});

sandBox.on("text", async (ctx) => {
  const vm = new VM();
  let yourCode = "";
  ctx.scene.session.yourCode.push(ctx.message.text);

  try {
    yourCode = vm.run(`${
      (!ctx.scene.session.yourCode.length)
      ? ctx.message.text
      : ctx.scene.session.yourCode.join("\n")
    }`);
  } catch (e) {
    ctx.reply("Syntax error!\n" + e);
  }
  
  await ctx.reply(yourCode)
    .catch(() => {
      ctx.reply("undefined");
    });
});

const stage = new Stage([sandBox], {
  ttl: config.scenesTTL
});

exports.stage = stage;
exports.Stage = Stage;