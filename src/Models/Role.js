const { Schema, model } = require("mongoose");

const Roller = Schema({
    _id: String,
    sunucuID: String,
    rolID: String,
    isim: String,
    renk: String,
    asansor: Boolean,
    pozisyon: Number,
    izinler: String,
    bahsedilebilir: Boolean,
    zaman: Number,
    uyeler: Array,
    kanalIzinleri: Array
});

module.exports = model("Roller", Roller);
