const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { bot, commands } = require("../bot.js"); // Varsayılan bot nesnesi ve komutlarından alınan işaretçileri kullanıyoruz.
const { OtherGuard, OtherGuardBotClientID } = require("../Configs/BotConfig.json");

const commandsArray = [];

fs.readdirSync("./src/Commands/").forEach((file) => {
  const command = require(`../Commands/${file}`);
  commands.set(command.data.name, command);
  commandsArray.push(command.data.toJSON());
});

bot.once("ready", async () => {
  const rest = new REST({ version: '9' }).setToken(OtherGuard);

  try {
    console.log('[KOMUT] Komutlar yükleniyor...');

    await rest.put(
      Routes.applicationCommands(OtherGuardBotClientID),
      { body: commandsArray },
    );

    console.log('[KOMUT] Komutlar başarıyla yüklendi.');
  } catch (error) {
    console.error(error);
  }
});
