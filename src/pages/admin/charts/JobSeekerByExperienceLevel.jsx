import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const JobSeekerByExperienceLevel = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the backend
        const response = await axios.get('http://localhost:4000/api/charts/posts-by-experience-level');
        const data = response.data;

        // Calculate total posts
        const totalPosts = data.reduce((acc, level) => acc + level.count, 0);

        // Process data for chart
        const experienceLevels = data.map(level => level._id);
        const counts = data.map(level => level.count);

        // Calculate percentages
        const percentages = counts.map(count => ((count / totalPosts) * 100).toFixed(2));

        setChartData({
          labels: experienceLevels.map((level, index) => `${level} (${percentages[index]}%)`),
          datasets: [
            {
              label: 'Percentage of Posts',
              data: counts,
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(153, 102, 255, 0.6)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Job Seeker Posts by Experience Level</h2>
      <div className="relative w-full h-96"> {/* Add a fixed height to the container */}
        <Doughnut 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false, // Keep this false but manage height with CSS
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw} posts`;
                  }
                }
              }
            },
          }} 
        />
      </div>
    </div>
  );
};

export default JobSeekerByExperienceLevel;

