import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisVertical } from 'react-icons/fa6';
import HireButton from "./HireButton"

const JobSeekerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostData, setEditPostData] = useState({
    jobTitle: '',
    location: '',
    description: '',
    skills: '',
    experienceLevel: '',
    educationLevel: '',
  });
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const fetchFilteredPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/jobseeker/filter`, {
        params: {
          username,
          jobTitle,
          skills,
          location,
        },
      });
      setPosts(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchAllPosts = async (pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/jobseeker?page=${pageNumber}&pageSize=${pageSize}`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    fetchAllPosts(pageNumber);
  };

  useEffect(() => {
    fetchAllPosts(page);
  }, [page]);

  const resetFilters = () => {
    setUsername('');
    setJobTitle('');
    setSkills('');
    setLocation('');
    fetchAllPosts(page);
  };

  const handleEdit = (post) => {
    setEditPostId(post._id);
    setEditPostData({
      jobTitle: post.jobTitle,
      location: post.location,
      description: post.description,
      skills: post.skills.join(', '),
      experienceLevel: post.experienceLevel,
      educationLevel: post.educationLevel,
    });
    setOpenDropdownId(null);
  };

  const handleDeleteConfirmation = (postId) => {
    setDeletePostId(postId);
    setOpenDropdownId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/jobseeker/${deletePostId}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchAllPosts(page);
    } catch (error) {
      setError(error.message);
    }
    setDeletePostId(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/jobseeker/${editPostId}`, {
        ...editPostData,
        skills: editPostData.skills.split(',').map(skill => skill.trim()),
      }, {
        headers: {
          Authorization: token,
        },
      });
      setEditPostId(null);
      setEditPostData({
        jobTitle: '',
        location: '',
        description: '',
        skills: '',
        experienceLevel: '',
        educationLevel: '',
      });
      fetchAllPosts(page);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleDropdown = (postId) => {
    setOpenDropdownId((prev) => (prev === postId ? null : postId));
  };

  return (
    <div className="p-4 mt-14">
      {/* Filter Inputs */}
      <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 md:bg-white shadow-none md:dark:shadow-none md:dark:bg-dark-card rounded-lg px-4 py-2">
  <div className="relative flex items-center border rounded p-2 bg-inherit text-slate-500 dark:text-slate-300">
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Search by username"
      className="border-none outline-none placeholder:text-sm bg-inherit w-full"
    />
  </div>
  <div className="relative flex items-center border rounded p-2 bg-inherit text-slate-500 dark:text-slate-300">
    <input
      type="text"
      value={jobTitle}
      onChange={(e) => setJobTitle(e.target.value)}
      placeholder="Search by job title"
      className="border-none outline-none placeholder:text-sm bg-inherit w-full"
    />
  </div>
  <div className="relative flex items-center border rounded p-2 bg-inherit text-slate-500 dark:text-slate-300">
    <input
      type="text"
      value={skills}
      onChange={(e) => setSkills(e.target.value)}
      placeholder="Search by skills (comma-separated)"
      className="border-none outline-none placeholder:text-sm bg-inherit w-full"
    />
  </div>
  <div className="relative flex items-center border rounded p-2 bg-inherit text-slate-500 dark:text-slate-300">
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Search by location"
      className="border-none outline-none placeholder:text-sm bg-inherit w-full"
    />
  </div>
  <button
    onClick={fetchFilteredPosts}
    className="btn btn-primary"
  >
    Filter Posts
  </button>
  <button
    onClick={resetFilters}
    className="btn btn-danger"
  >
    Reset Filters
  </button>
</div>

      {/* Display Posts */}
      <ul  className="mt-6 flex flex-wrap gap-4">
        {posts.map((post) => (
          <li key={post._id} className="mb-4 p-4  card relative group flex-1 basis-[25rem]">
            <div className="flex justify-between items-center absolute right-1 top-1">
              <div className="relative">
                <FaEllipsisVertical
                  className="icon-box"
                  onClick={() => toggleDropdown(post._id)}
                />
                {openDropdownId === post._id && (
                  <div className="absolute right-0 mt-2 w-40 card border border-gray-300 rounded shadow-lg z-10">
                    <button
                      onClick={() => handleEdit(post)}
                      className="block w-full text-left p-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(post._id)}
                      className="block w-full text-left p-2 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-align-center gap-x-2">
            <img
                src={post.user.profilePhoto.url}
                alt={`${post.user.username}'s profile`}
                className="w-14 h-14 rounded-full"
              />
              <div>
            <h1 className="text-xl font-semibold">{post.user.username}</h1>
                <p className="text-primary capitalize"> {post.jobTitle}</p>
                <span className="text-sm text-muted">{post.location} </span>
              </div>
            </div>
         
            <div className=" flex flex-wrap mt-2">
              {post.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-gray-700 text-sm font-medium py-1 px-3 rounded-full mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-sm mt-3">{post.description}</p>
            <div className="mt-4 mb-6 flex space-x-4">
        <span className="bg-secondaryLightGreen text-secondaryGreen text-sm font-medium py-1 px-3 rounded-full">
          {post.experienceLevel}
        </span>
        <span className="bg-secondaryLightPurple text-primary text-sm font-medium py-1 px-3 rounded-full">
          {post.educationLevel}
        </span>
      </div>
      <HireButton/>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 border border-gray-300 rounded mr-2 ${page === index + 1 ? 'bg-gray-300' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {editPostId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="card p-4 rounded">
            <h3 className="text-xl font-bold mb-4">Edit Post</h3>
            <input
              type="text"
              value={editPostData.jobTitle}
              onChange={(e) => setEditPostData({ ...editPostData, jobTitle: e.target.value })}
              placeholder="Job Title"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.location}
              onChange={(e) => setEditPostData({ ...editPostData, location: e.target.value })}
              placeholder="Location"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <textarea
              value={editPostData.description}
              onChange={(e) => setEditPostData({ ...editPostData, description: e.target.value })}
              placeholder="Description"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.skills}
              onChange={(e) => setEditPostData({ ...editPostData, skills: e.target.value })}
              placeholder="Skills (comma-separated)"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.experienceLevel}
              onChange={(e) => setEditPostData({ ...editPostData, experienceLevel: e.target.value })}
              placeholder="Experience Level"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              value={editPostData.educationLevel}
              onChange={(e) => setEditPostData({ ...editPostData, educationLevel: e.target.value })}
              placeholder="Education Level"
              className="p-2 border border-gray-300 rounded mb-4 w-full"
            />
            <div className="flex justify-end">
              <button onClick={() => setEditPostId(null)} className="p-2 bg-gray-500 text-white rounded mr-2">
                Cancel
              </button>
              <button onClick={handleUpdate} className="p-2 bg-blue-500 text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletePostId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="card p-4 rounded">
            <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this post?</h3>
            <div className="flex justify-end">
              <button onClick={() => setDeletePostId(null)} className="p-2 bg-gray-500 text-white rounded mr-2">
                Cancel
              </button>
              <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSeekerPosts;






