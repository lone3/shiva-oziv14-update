const { Schema, model } = require("mongoose");

const KategoriKanallari = Schema({
    kanalID: String,
    isim: String,
    pozisyon: Number,
    izinler: Array,
});

module.exports = model("KategoriKanallari", KategoriKanallari);
