const { Schema, model } = require("mongoose");

const GuvenliUye = Schema({
    _id: String,
    sunucuID: String,
    Tam: { type: Array, default: [] },
    RolVeKanal: { type: Array, default: [] },
    Rol: { type: Array, default: [] },
    Kanal: { type: Array, default: [] },
    Bot: { type: Array, default: [] },
    YasakVeAt: { type: Array, default: [] },
    SohbetG: { type: Array, default: [] },
    SekmeG: { type: Array, default: [] },
    GuvenliRol: { type: Array, default: [] },
    Izinler: { type: Array, default: [] }
});

module.exports = model("GuvenliUye", GuvenliUye);
