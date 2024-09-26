// src/components/ApplicationsByCompany.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ApplicationsByCompany = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApplicationsByCompany = async () => {
      try {
        const response = await axios.get('/api/charts/applications/by-company');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching applications by company', error);
      }
    };

    fetchApplicationsByCompany();
  }, []);

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Number of Applications',
        data: data.map(item => item.totalApplications),
        backgroundColor: 'rgba(255,159,64,0.5)',
      }
    ]
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Applications by Company</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ApplicationsByCompany;
