import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./nice.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function MenuGraph() {
  const [conteoDepartamentos, setConteoDepartamentos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/contar-usuarios")
      .then(response => {
        setConteoDepartamentos(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const labels = conteoDepartamentos.map(dep => dep._id);
  const dataValues = conteoDepartamentos.map(dep => dep.count);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Número de Usuarios por Departamento',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      }
    }
  };

  return (
    <div className='cuadro2'>
    <div className='cuadro1'>
      <h2>Usuarios por Departamento</h2>
      <div className='chart-container'>
        <Bar data={data} options={options} />
      </div>
      <div>
        <button className='boton'>
          <Link to="/menu">Back</Link>
        </button>
      </div>
      </div>
    </div>
  );
}

export default MenuGraph;

