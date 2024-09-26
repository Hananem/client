// src/components/JobPostingsByCompany.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const JobPostingsByCompany = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPostingsByCompany = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/charts/postings/by-company');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching job postings by company', error);
      }
    };

    fetchPostingsByCompany();
  }, []);

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Number of Postings',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(153,102,255,0.5)',
      }
    ]
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Job Postings by Company</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default JobPostingsByCompany;
