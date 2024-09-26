import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css';

// Register the required elements, including PointElement
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const JobViewsOverTime = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchViewsOverTime = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/charts/views/overtime');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching job views over time', error);
      }
    };

    fetchViewsOverTime();
  }, []);

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Total Views',
        data: data.map(item => item.totalViews),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
      }
    ]
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Job Views Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default JobViewsOverTime;

