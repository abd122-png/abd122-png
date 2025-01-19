import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const response = await axios.get('/api/sales');
    setSalesData(response.data);
  };

  const data = {
    labels: salesData.map(sale => sale.product),
    datasets: [
      {
        label: 'Quantité Vendue',
        data: salesData.map(sale => sale.quantitySold),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1>Tableau de Bord des Ventes</h1>
      <Bar data={data} />
    </div>
  );
};

export default Dashboard;