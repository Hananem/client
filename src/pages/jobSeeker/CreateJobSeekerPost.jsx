import React, { useState } from 'react';

const CreateJobSeekerPost = () => {
  const [postData, setPostData] = useState({});
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const createJobSeekerPost = async (formData) => {
    try {
      const response = await fetch('http://localhost:4000/api/jobSeeker/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // No need to add 'Bearer' prefix if not used in backend
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create job seeker post');
      }
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jobSeekerDetails = {
      jobTitle: formData.get('jobTitle'),
      location: formData.get('location'),
      description: formData.get('description'),
      skills: formData.get('skills').split(',').map(skill => skill.trim()),
      experienceLevel: formData.get('experienceLevel'),
      educationLevel: formData.get('educationLevel'),
    };
    createJobSeekerPost(jobSeekerDetails);
  };

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-dark-card">
      <form onSubmit={handleSubmit} className="mt-14 space-y-4">
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
            id="location"
            name="location"
            required
            className="input"
          />
          <label htmlFor="location">Location</label>
        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <textarea
            id="description"
            name="description"
            required
            className="input"
          ></textarea>
          <label htmlFor="description">Description</label>
        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="Comma separated values"
            required
            className="input"
          />
          <label htmlFor="skills">Skills</label>
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
            id="educationLevel"
            name="educationLevel"
            required
            className="input"
          />
          <label htmlFor="educationLevel">Education Level</label>
        </div>

        <button type="submit" className="btn btn-primary mt-4">Create Job Seeker Post</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {postData._id && <p className="text-green-500 mt-4">New post created with ID: {postData._id}</p>}
    </div>
  );
};

export default CreateJobSeekerPost;

