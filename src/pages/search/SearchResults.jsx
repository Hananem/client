import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState({ blogs: [], jobs: [], jobSeekerPosts: [], events: [], users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/search?query=${query}`);
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {results.blogs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Blogs</h2>
              <ul className="space-y-4">
              {results.blogs.map((blog) => (
        <li key={blog._id} className="card p-4 flex items-center shadow-light transition-a hover:shadow-md">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-32 h-32 object-cover rounded mr-4"
            />
          )}
          <div>
            <h3 className="text-xl font-semibold">{blog.title}</h3>
          </div>
        </li>
      ))}
              </ul>
            </div>
          )}
          {results.jobs.length > 0 && (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Jobs</h2>
    <ul className="space-y-4">
      {results.jobs.map((job) => (
        <li key={job._id} className="card p-4 flex items-center shadow-light transition-a hover:shadow-md">
          {/* Company Logo */}
          {job.company.logo && (
            <img
              src={job.company.logo}
              alt="Company Logo"
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
          )}
          {/* Job Details */}
          <div>
            <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
            <p className="text-muted">{job.company.location}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

{results.jobSeekerPosts.length > 0 && (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Job Seeker Posts</h2>
    <ul className="space-y-4">
      {results.jobSeekerPosts.map((post) => (
        <li key={post._id} className="border p-4 card relative flex items-start">
          <div className="flex items-center mb-4">
            {post.user.profilePhoto && (
              <img
                src={post.user.profilePhoto}
                alt={`${post.user.username}'s profile`}
                className="w-14 h-14 rounded-full"
              />
            )}
            <div className="ml-4">
              <h1 className="text-xl font-semibold">{post.user.username}</h1>
              <p className="text-primary capitalize">{post.jobTitle}</p>
              <span className="text-sm text-muted">{post.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap mt-2">
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
        </li>
      ))} 
    </ul>
  </div>
)} 


          {results.events.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Events</h2>
              <ul className="space-y-4">
                {results.events.map((event) => (
                  <li key={event._id} className="card p-4 shadow-light transition-a hover:shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted">{event.description}</p>
                    <p className="text-muted">{event.location}</p>
                    <p className="text-muted">{new Date(event.date).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.users.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <ul className="space-y-4">
            {results.users.map((user) => (
              <li key={user._id} className="card p-4 flex items-center shadow-light transition-a hover:shadow-md">
                {/* User Profile Photo */}
                {user.profilePhoto && (
                  <img
                    src={user.profilePhoto}
                    alt={`${user.username}'s profile`}
                    className="w-16 h-16 object-cover rounded-full mr-4"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{user.username}</h3>
                  <p className="text-muted">{user.jobTitle}</p> 
                  <p className="text-muted">{user.bio}</p> 
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default SearchResults;

