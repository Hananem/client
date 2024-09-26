import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [jobData, setJobData] = useState({});
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const postJob = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/jobs/postJob', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setJobData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    postJob(formData);
  };

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-dark-card">
    <form onSubmit={handleSubmit} className="mt-10 space-y-4" encType="multipart/form-data">
      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          className="input"
        />
        <label htmlFor="logo">Company Logo</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          required
          className="input"
        />
        <label htmlFor="jobTitle">Job Title</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="companyName"
          name="companyName"
          required
          className="input"
        />
        <label htmlFor="companyName">Company Name</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <textarea
          id="companyDescription"
          name="companyDescription"
          required
          className="input"
        ></textarea>
        <label htmlFor="companyDescription">Company Description</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="email"
          id="companyContactEmail"
          name="companyContactEmail"
          required
          className="input"
        />
        <label htmlFor="companyContactEmail">Company Contact Email</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="companyLocation"
          name="companyLocation"
          required
          className="input"
        />
        <label htmlFor="companyLocation">Company Location</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="jobLocation"
          name="jobLocation"
          required
          className="input"
        />
        <label htmlFor="jobLocation">Job Location</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="number"
          id="minSalary"
          name="minSalary"
          required
          className="input"
        />
        <label htmlFor="minSalary">Minimum Salary</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="number"
          id="maxSalary"
          name="maxSalary"
          required
          className="input"
        />
        <label htmlFor="maxSalary">Maximum Salary</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="experienceLevel"
          name="experienceLevel"
          required
          className="input"
        />
        <label htmlFor="experienceLevel">Experience Level</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="employmentType"
          name="employmentType"
          required
          className="input"
        />
        <label htmlFor="employmentType">Employment Type</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="educationLevel"
          name="educationLevel"
          required
          className="input"
        />
        <label htmlFor="educationLevel">Education Level</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="jobType"
          name="jobType"
          required
          className="input"
        />
        <label htmlFor="jobType">Job Type</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="requirements"
          name="requirements"
          required
          className="input"
        />
        <label htmlFor="requirements">Requirements</label>
      </div>

      <div className="form-input w-full sm:flex-1 relative">
        <input
          type="text"
          id="responsibilities"
          name="responsibilities"
          required
          className="input"
        />
        <label htmlFor="responsibilities">Responsibilities</label>
      </div>

      <button type="submit" className="btn btn-primary mt-4">Create Job</button>
    </form>
    {error && <p className="text-red-500 mt-4">{error}</p>}
    {jobData._id && <p className="text-green-500 mt-4">New job created with ID: {jobData._id}</p>}
  </div>
  );
};

export default PostJob;
