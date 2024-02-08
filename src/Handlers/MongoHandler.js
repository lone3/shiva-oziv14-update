const { mongoUrl } = require("../Configs/BotConfig.json");
const mongoose = require("mongoose");

try {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "[HATA] Database bağlantısı kurulamadı!"));
  db.once("open", () => console.log("Database bağlantısı tamamlandı!"));
} catch (err) {
  console.error("[HATA] Database bağlantısı kurulamadı!", err);
}
