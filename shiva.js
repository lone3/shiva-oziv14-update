const { Client, Collection } = require("discord.js");
const ayar = require("./src/Config/BotConfig.json");
const mongoose = require("mongoose");

const client = (global.bot = new Client({
  fetchAllMembers: true,
  intents: 32767,
}));

client.commands = new Collection();

(async () => {
  try {
    await mongoose.connect(ayar.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database bağlantısı tamamlandı!");

    await client.login(ayar.OtherGuard);
    require("./src/Handlers/commandHandler.js");
    require("./src/Handlers/EventHandler");
    require("./bot.js");
  } catch (err) {
    console.error("[HATA] Database bağlantısı kurulamadı!", err);
  }
})();