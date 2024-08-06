const mongoose = require("mongoose");

const Esquema1 = new mongoose.Schema({
    nombre: String,
    numero: Number,
    Email: String,
    departamento: String
})
const paquete1 = mongoose.model("Usuarios",Esquema1)
module.exports = paquete1