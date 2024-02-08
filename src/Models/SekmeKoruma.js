const { Schema, model } = require("mongoose");

const SekmeKoruma = Schema({
    sunucuID: String,
    kullaniciID: String,
    roller: Array
});

module.exports = model("SekmeKoruma", SekmeKoruma);
