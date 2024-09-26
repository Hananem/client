// src/components/ApplicationsByJobType.js
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ApplicationsByJobType = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApplicationsByJobType = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/charts/applications-by-job-type');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching applications by job type', error);
      }
    };

    fetchApplicationsByJobType();
  }, []);

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.totalApplications),
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(75,192,192,1)', 'rgba(153,102,255,1)'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Applications by Job Type</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default ApplicationsByJobType;
