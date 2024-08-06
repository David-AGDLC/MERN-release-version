import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cel from "./imagenes/pngcel.png";
import point from "./imagenes/pngpoint.png";
import gmail from "./imagenes/pnggmail.png";
import "./nice.css";

function MenuAdmin() {
  const [usuarios, setUsuarios] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:4001")
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => console.log(error)
      );

  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:4001/eliminar/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Menu Admin</h1>
    <div className='pag'>
        <>
          <table className='registro'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th><img className="icono" src={cel} alt="Ícono de celular"/>Número</th>
                <th><img className="icono2" src={gmail} alt="Ícono de correo"/>Email</th>
                <th><img className="icono2" src={point} alt="Ícono de locacion"/>Departamento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario._id}>
                  <td>{usuario.nombre}</td>
                  <td><img img className="icono" src={cel} alt="Ícono de celular"/>{usuario.numero}</td>
                  <td><img className="icono2" src={gmail} alt="Ícono de locacion"/>{usuario.Email}</td>
                  <td><img className="icono2" src={point} alt="Ícono de locacion"/>{usuario.departamento}</td>
                  <td>
                    <button className='boton'>
                      <Link to={`/edit/${usuario._id}`}>Editar</Link>
                    </button>
                    <button className='boton' onClick={() => handleDelete(usuario._id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      <div className='botones-derecha'>
        <button className='boton'>
          <Link to="/">Crear</Link>
        </button>
        <button className='boton'>
          <Link to="/graph">grafica</Link>
        </button>
      </div>
    </div>
  </div>
  );
}

export default MenuAdmin;
