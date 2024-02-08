const { Schema, model } = require("mongoose");

const MetinKanallari = Schema({
    kanalID: String,
    isim: String,
    nsfw: Boolean,
    ustKanalID: String,
    pozisyon: Number,
    rateLimit: Number,
    izinler: Array,
});

module.exports = model("MetinKanallari", MetinKanallari);
