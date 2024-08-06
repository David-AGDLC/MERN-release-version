import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import cel from "./imagenes/pngcel.png";
import point from "./imagenes/pngpoint.png";
import gmail from "./imagenes/pnggmail.png";
import { Link } from 'react-router-dom';
import "./nice.css";

const departamentos = ["Chimaltenango","Guatemala","Solola",
  "Peten","Quetzaltenango","Quiche","Huhuetenango","Escuintla","El Progreso",
  "Chiquimula","Jutiapa","Alta Verapaz","Baja Verapaz","Retalhuleu","Jalapa",
  "Santa Rosa","Sacatepequez","Zacapa","Izabal","Totonicapan","Suchitepequez","San Marcos"];

function MenuEdit() {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [Email, setEmail] = useState('');
  const [departamento, setDepartamento] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4001/usuario/${id}`)
      .then(result => {
        setNombre(result.data.nombre);
        setNumero(result.data.numero);
        setEmail(result.data.Email);
        setDepartamento(result.data.departamento);
      })
      .catch(err => console.error(err));
  }, [id]);

  const Actualizar = (e) => {
    e.preventDefault();
    if (!nombre || !numero || !Email || !departamento) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    axios.put(`http://localhost:4001/actualizar/${id}`, { nombre, numero, Email, departamento })
      .then(result => {
        console.log(result);
        navigate("/menu");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='contenedor'>
      <h1>Actualizar Info</h1>
      <form onSubmit={Actualizar} className='entrada'>
        <label className='entrada label'>
          Nombre:
          <input className='entrada input' type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} />
        </label>
        <br />
        <label className='entrada label'> <img className="icono" src={cel} alt="Ícono de celular"/>
          Número:
          <input className='entrada input' type="number" value={numero} onChange={(event) => setNumero(event.target.value)} />
        </label>
        <br />
        <label className='entrada label'><img className="icono2" src={gmail} alt="Ícono de correo"/>
          Email:
          <input className='entrada input' type="email" value={Email} onChange={(event) => setEmail(event.target.value)} />
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
        <button className='boton' type="submit">Actualizar</button>
      </form>
      <div>
        <button className='boton'>
          <Link to="/menu">Datos</Link>
        </button>
      </div>
    </div>
  );
}

export default MenuEdit;
