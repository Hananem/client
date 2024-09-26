import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const BlogsTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/blogs?page=${page}&pageSize=10`);
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.page);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:4000/api/blogs/${id}`);
        fetchBlogs(currentPage); // Refresh blogs after deletion
      } catch (err) {
        alert('Error deleting blog');
      }
    }
  };

  const handlePageChange = (newPage) => {
    fetchBlogs(newPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto relative">
   <Link to="/admin/create-blog"
    className="absolute top-2 right-2 btn btn-primary flex items-center gap-x-2">
      <FaPlus /> Create Blog
    </Link>
      <table className="min-w-full mt-14 card">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Updated At</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td className="px-4 py-2 border">
                <img 
                  src={blog.image?.url} 
                  alt={blog.title}
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="px-4 py-2 border">{blog.title}</td>
              <td className="px-4 py-2 border">{blog.author?.username}</td>
              <td className="px-4 py-2 border">{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{new Date(blog.updatedAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => deleteBlog(blog._id)}
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

export default BlogsTable;
