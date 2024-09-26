import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobSeekerPostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobSeekerPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/jobseeker/posts?page=${page}&pageSize=10`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobSeekerPosts();
  }, [page]);

  const deleteJobSeekerPost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this job seeker post?')) {
      try {
        await axios.delete(`http://localhost:4000/api/jobseeker/posts/${postId}`);
        fetchJobSeekerPosts(); // Refresh posts after deletion
      } catch (err) {
        alert('Error deleting job seeker post');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Profile Photo</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Job Title</th>
            <th className="px-4 py-2 border">Experience Level</th>
            <th className="px-4 py-2 border">Education Level</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td className="px-4 py-2 border">
                <img 
                  src={post.user.profilePhoto?.url || "https://via.placeholder.com/150"} 
                  alt={post.user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2 border">{post.user.username}</td>
              <td className="px-4 py-2 border">{post.user.email}</td>
              <td className="px-4 py-2 border">{post.jobTitle}</td>
              <td className="px-4 py-2 border">{post.experienceLevel}</td>
              <td className="px-4 py-2 border">{post.educationLevel}</td>
              <td className="px-4 py-2 border">{post.location}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => deleteJobSeekerPost(post._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobSeekerPostsTable;
