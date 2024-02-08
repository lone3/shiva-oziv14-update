const { readdirSync } = require("fs");
const { bot } = global; // Assuming `bot` is correctly defined globally

const eventFiles = readdirSync("./src/Events")
  .filter((file) => file.endsWith(".js"));

try {
  for (const file of eventFiles) {
    const event = require(`../Events/${file}`);
    const eventName = event.conf.name;
    bot.on(eventName, event);
  }

  console.log(`[EVENTS] (${eventFiles.length}) event yüklendi!.`);
} catch (err) {
  console.error("[EVENTS] Event yüklenemedi", err);
}
