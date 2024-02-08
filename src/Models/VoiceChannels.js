const { Schema, model } = require("mongoose");

const SesKanallari = Schema({
    kanalID: String,
    isim: String,
    bitrate: Number,
    kullaniciLimiti: Number,
    ustKanalID: String,
    pozisyon: Number,
    izinler: Array,
});

module.exports = model("SesKanallari", SesKanallari);
