import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({});
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const createBlog = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/blogs/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setBlogData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createBlog(formData);
  };

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-dark-card">
      <form onSubmit={handleSubmit} className="mt-10 space-y-4" encType="multipart/form-data">
        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="input"
          />
          <label htmlFor="image">Image</label>
        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            id="title"
            name="title"
            required
            className="input"
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <textarea
            id="content"
            name="content"
            required
            className="input"
          ></textarea>
          <label htmlFor="content">Content</label>
        </div>

        <button type="submit" className="btn btn-primary mt-4">Create Blog</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {blogData._id && <p className="text-green-500 mt-4">New blog created with ID: {blogData._id}</p>}
    </div>
  );
};

export default CreateBlog;


