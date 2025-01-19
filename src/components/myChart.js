// // src/components/SalesStatsChart.js
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register necessary Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const SalesStatsChart = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchSalesStats = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/sales/stats');
//         const data = await response.json();
//         setSalesData(data);
//       } catch (error) {
//         console.error('Error fetching sales stats:', error);
//       }
//     };

//     fetchSalesStats();
//   }, []);

//   useEffect(() => {
//     if (salesData.length > 0) {
//       // Transform data for Chart.js
//       const months = salesData.map(stat => `Month ${stat._id}`);
//       const totalSales = salesData.map(stat => stat.totalSales);

//       setChartData({
//         labels: months,
//         datasets: [
//           {
//             label: 'Total Sales by Month',
//             data: totalSales,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true,
//             tension: 0.1,
//           },
//         ],
//       });
//     }
//   }, [salesData]);

//   return (
//     <div className="chart-container">
//       <h3>Monthly Sales Stats</h3>
//       {chartData ? (
//         <Line data={chartData} />
//       ) : (
//         <p>Loading chart...</p>
//       )}
//     </div>
//   );
// };

// export default SalesStatsChart;
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';  // Importing Bar chart from Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sales'); // Fetch data from Flask API
        setSalesData(response.data); // Set sales data in state
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  useEffect(() => {
    if (salesData.length > 0) {
      // Prepare the data for the chart
      const labels = salesData.map((sale) => sale.product);  // Use product names as labels
      const sales = salesData.map((sale) => sale.price * sale.quantitySold);  // Calculate total sales per product

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Sales per Product',
            data: sales,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Chart color
            borderColor: 'rgba(75, 192, 192, 1)', // Chart border color
            borderWidth: 1,
          },
        ],
      });
    }
  }, [salesData]);

  return (
    <div className="chart-container">
      <h3>Sales Data</h3>
      {chartData ? (
        <Bar data={chartData} /> // Render the chart if data is available
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default SalesChart;
