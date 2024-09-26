import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePhotoUpload from './ProfilePhotoUpload';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { FaGraduationCap, FaBriefcase, FaHeart, FaLanguage, FaCertificate, FaProjectDiagram } from 'react-icons/fa';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('certifications');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="col-span-1 bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border dark:border-gray-700">
          <ProfilePhotoUpload user={user} />
          <div className="mb-4">
            <p className="text-lg font-semibold">{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.jobTitle}</p>
            <div className="flex space-x-4 mt-2">
              {user.socialLinks.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondaryGreen transition-colors duration-300"
                >
                  <FaLinkedin size={30} />
                </a>
              )}
              {user.socialLinks.github && (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondaryGreen transition-colors duration-300"
                >
                  <FaGithub size={30} />
                </a>
              )}
              {user.socialLinks.twitter && (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondaryGreen transition-colors duration-300"
                >
                  <FaTwitter size={30} />
                </a>
              )}
            </div>
            <p className="text-gray-600 mt-4">{user.bio}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary text-white px-2 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border dark:border-gray-700">
          {user.education && user.education.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaGraduationCap className="mr-2" /> Education
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.education.map((edu, index) => (
                  <li key={index} className="mb-1">{edu}</li>
                ))}
              </ul>
            </div>
          )}

          {user.experience && user.experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaBriefcase className="mr-2" /> Experience
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.experience.map((exp, index) => (
                  <li key={index} className="mb-1">{exp}</li>
                ))}
              </ul>
            </div>
          )}

          {user.interests && user.interests.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaHeart className="mr-2" /> Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-white px-2 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user.languages && user.languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaLanguage className="mr-2" /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-primary text-white px-2 py-1 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tabs for Certifications and Projects */}
          <div className="flex border-b border-gray-300 dark:border-gray-700 mb-4">
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'certifications' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'}`}
              onClick={() => setActiveTab('certifications')}
            >
              Certifications
            </button>
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'projects' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
          </div>

          {activeTab === 'certifications' && user.certifications && user.certifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaCertificate className="mr-2" /> Certifications
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.certifications.map((certification, index) => (
                  <li key={index} className="mb-1">{certification}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'projects' && user.projects && user.projects.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaProjectDiagram className="mr-2" /> Projects
              </h3>
              <ul className="space-y-4">
                {user.projects.map((project, index) => (
                  <li key={index} className="p-4 border rounded-md shadow-sm dark:bg-dark-card">
                    <h4 className="text-lg font-semibold">{project.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline mt-2 inline-block">
                        View Project
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

