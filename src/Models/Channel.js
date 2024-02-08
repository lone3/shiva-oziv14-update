const { Schema, model } = require("mongoose");

const Kanallar = Schema({
    _id: String,
    sunucuID: String,
    kanallar: Array
});

module.exports = model("Kanallar", Kanallar);
