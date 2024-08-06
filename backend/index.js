const mongoose = require("mongoose");
const express = require("express");
const paquete1= require("./d_contactos")
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
try {
  mongoose.connect("mongodb://localhost:27017/basecrud");
  console.log("Conectado a la base de datos");
  app.listen(4001, function () {
    console.log("Conectado al puerto 4001");
  });
} catch (error) {
  console.error("Error al conectar a la base de datos:", error);
}

app.get("/", (req, res) => {
  paquete1.find({})
  .then(Usuarios=>res.json(Usuarios))
  .catch(err=>res.json(err))
});
app.get("/usuario/:id", (req, res) => {
  const id = req.params.id;
  paquete1.findById({_id:id})
  .then(Usuarios=>res.json(Usuarios))
  .catch(err=>res.json(err))
});
app.put("/actualizar/:id", (req,res)=>{
  const id = req.params.id;
  paquete1.findByIdAndUpdate({_id:id}, {
    nombre: req.body.nombre,
    Email: req.body.Email,
    numero: req.body.numero,
    departamento: req.body.departamento})
  .then(Usuarios=>res.json(Usuarios))
  .catch(err=>res.json(err))
})
app.delete("/eliminar/:id",(req,res)=>{
  const id=req.params.id
  paquete1.findByIdAndDelete({_id:id})
  .then(res =>res.json(res))
  .catch(err =>res.json(err))
})
app.post("/anadir", (req, res) => {
  paquete1.create(req.body)
  .then(Usuarios=>res.json(Usuarios))
  .catch(err=>res.json(err))
});
app.get("/contar-usuarios", (req, res) => {
  paquete1.aggregate([
    {
      $group: {
        _id: "$departamento",
        count: { $sum: 1 }
      }
    }
  ])
    .then(result => res.json(result))
    .catch(err => res.json(err));
});
