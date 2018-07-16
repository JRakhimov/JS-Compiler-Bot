"use strict";

require("dotenv").config();

const config = {
  token: process.env.BOT_TOKEN,
  scenesTTL: 300, // LifeCycle of scenes in seconds
  admins: { rakhimov_j: 379086434 }, // Telegram IDs of admins
  rateLimit: {
    window: 2, // Requests
    limit: 3000 // Period
  }, // Number of requests per millisecond
  telegraf: {
    username: process.env.BOT_NAME // Name of bot without "@"
  }
};

module.exports = config;
