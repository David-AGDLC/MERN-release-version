import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cel from "./imagenes/pngcel.png";
import point from "./imagenes/pngpoint.png";
import gmail from "./imagenes/pnggmail.png";
import "./nice.css";

function MenuSubida() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [departamento, setDepartamento] = useState('');

  const departamentos = ["Chimaltenango","Guatemala","Solola",
    "Peten","Quetzaltenango","Quiche","Huhuetenango","Escuintla","El Progreso",
    "Chiquimula","Jutiapa","Alta Verapaz","Baja Verapaz","Retalhuleu","Jalapa",
    "Santa Rosa","Sacatepequez","Zacapa","Izabal","Totonicapan","Suchitepequez","San Marcos"];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !numero || !email || !departamento) {
      alert("Por favor, llena todos los campos");
      return; 
    }
    
    const datos = {
      nombre: nombre,
      numero: (numero),
      Email: email,
      departamento: departamento,
    };
    
    axios.post('http://localhost:4001/anadir', datos)
      .then((response) => {
        console.log(response.data);
        alert("Info Enviada");
      setNombre('');
      setNumero('');
      setEmail('');
      setDepartamento('');
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  return (
    <div>
      <h1>Formulario de contacto</h1>
      <form onSubmit={handleSubmit} className='entrada'>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} />
        </label>
        <br />
        <label> <img className="icono" src={cel} alt="Ícono de celular"/>
          Número:
          <input type="number" value={numero} onChange={(event) => setNumero(event.target.value)} />
        </label>
        <br />
        <label><img className="icono2" src={gmail} alt="Ícono de correo"/>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label><img className="icono2" src={point} alt="Ícono de locacion"/>
          Departamento:
          <select value={departamento} onChange={(event) => setDepartamento(event.target.value)}>
            <option value="">Selecciona un departamento</option>
            {departamentos.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
            </select>
        </label>
        <br />
        <button className='boton' type="submit">Enviar</button>
      </form>
      <div>
        <button className='boton'>
          <Link to="/menu">datos</Link>
        </button>
      </div>
    </div>
    
  );
}

export default MenuSubida;