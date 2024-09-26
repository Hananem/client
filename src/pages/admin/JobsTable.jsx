import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/jobs/all?page=${page}&limit=10`);
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`http://localhost:4000/api/jobs/${id}`);
        fetchJobs(currentPage); // Refresh jobs after deletion
      } catch (err) {
        alert('Error deleting job');
      }
    }
  };

  const handlePageChange = (newPage) => {
    fetchJobs(newPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Company Logo</th>
            <th className="px-4 py-2 border">Job Title</th>
            <th className="px-4 py-2 border">Company Name</th>
            <th className="px-4 py-2 border">Job Type</th>
            <th className="px-4 py-2 border">Salary</th>
            <th className="px-4 py-2 border">Experience Level</th>
            <th className="px-4 py-2 border">Employment Type</th>
            <th className="px-4 py-2 border">Views</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td className="px-4 py-2 border">
                <img 
                  src={job.company?.logo?.url } 
                  alt={job.company?.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="px-4 py-2 border">{job.jobTitle}</td>
              <td className="px-4 py-2 border">{job.company?.name}</td>
              <td className="px-4 py-2 border">{job.jobType}</td>
              <td className="px-4 py-2 border">${job.salary?.min} - ${job.salary?.max}</td>
              <td className="px-4 py-2 border">{job.experienceLevel}</td>
              <td className="px-4 py-2 border">{job.employmentType}</td>
              <td className="px-4 py-2 border">{job.views}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobsTable;
