import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUserForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    profileImage: '',
    jobTitle: '',
    contactInfo: { phone: '', email: '' },
    location: '',
    socialLinks: { linkedin: '', github: '', twitter: '' },
    skills: [],
    experience: [],
    education: [],
    projects: [{ name: '', description: '', link: '' }],
    certifications: [],
    languages: [],
    interests: []
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`, {
        });

        // Use defaults for undefined or null values
        const userData = response.data;
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          password: '', // Keep password empty for security
          bio: userData.bio || '',
          profileImage: userData.profileImage || '',
          jobTitle: userData.jobTitle || '',
          contactInfo: {
            phone: userData.contactInfo?.phone || '',
            email: userData.contactInfo?.email || ''
          },
          location: userData.location || '',
          socialLinks: {
            linkedin: userData.socialLinks?.linkedin || '',
            github: userData.socialLinks?.github || '',
            twitter: userData.socialLinks?.twitter || ''
          },
          skills: userData.skills || [],
          experience: userData.experience || [],
          education: userData.education || [],
          projects: userData.projects || [{ name: '', description: '', link: '' }],
          certifications: userData.certifications || [],
          languages: userData.languages || [],
          interests: userData.interests || []
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      if (name === 'experience' || name === 'education' || name === 'certifications' || name === 'languages' || name === 'interests') {
        return { ...prev, [name]: value.split(', ').map(item => item.trim()) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index][name] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: '', description: '', link: '' }]
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/users/${userId}`, formData, {
        headers: {
          'Authorization': token
        }
      });

      alert('User updated successfully');
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    {/* Username Input */}
    <div className="form-input">
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
        className="input"
      />
      <label>Username</label>
    </div>
  
    {/* Email Input */}
    <div className="form-input">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="input"
      />
      <label>Email</label>
    </div>
  
    {/* Password Input */}
    <div className="form-input">
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
        className="input"
      />
      <label>Password</label>
    </div>
  
    {/* Job Title Input */}
    <div className="form-input">
      <input
        type="text"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleInputChange}
        placeholder="Job Title"
        className="input"
      />
      <label>Job Title</label>
    </div>
  
    {/* Location Input */}
    <div className="form-input">
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        placeholder="Location"
        className="input"
      />
      <label>Location</label>
    </div>
  
    {/* Phone Input */}
    <div className="form-input">
      <input
        type="text"
        name="contactInfo.phone"
        value={formData.contactInfo.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className="input"
      />
      <label>Phone</label>
    </div>
  
    {/* Contact Email Input */}
    <div className="form-input">
      <input
        type="text"
        name="contactInfo.email"
        value={formData.contactInfo.email}
        onChange={handleInputChange}
        placeholder="Contact Email"
        className="input"
      />
      <label>Contact Email</label>
    </div>
  
    {/* LinkedIn Input */}
    <div className="form-input">
      <input
        type="text"
        name="socialLinks.linkedin"
        value={formData.socialLinks.linkedin}
        onChange={handleInputChange}
        placeholder="LinkedIn"
        className="input"
      />
      <label>LinkedIn</label>
    </div>
  
    {/* GitHub Input */}
    <div className="form-input">
      <input
        type="text"
        name="socialLinks.github"
        value={formData.socialLinks.github}
        onChange={handleInputChange}
        placeholder="GitHub"
        className="input"
      />
      <label>GitHub</label>
    </div>
  
    {/* Twitter Input */}
    <div className="form-input">
      <input
        type="text"
        name="socialLinks.twitter"
        value={formData.socialLinks.twitter}
        onChange={handleInputChange}
        placeholder="Twitter"
        className="input"
      />
      <label>Twitter</label>
    </div>
  
    {/* Bio Input */}
    <div className="form-input">
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleInputChange}
        placeholder="Bio"
        className="input"
      />
      <label>Bio</label>
    </div>
  
    {/* Skills Input */}
    <div className="form-input">
      <input
        type="text"
        name="skills"
        value={formData.skills.join(', ')}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ') })}
        placeholder="Skills (comma separated)"
        className="input"
      />
      <label>Skills</label>
    </div>
  
    <div className="form-input">
    <input
      type="text"
      name="experience"
      value={formData.experience.join(', ')} // Join array to display as a string
      onChange={(e) => setFormData({ ...formData, experience: e.target.value.split(', ') })}
      placeholder="Experience (comma separated)"
      className="input"
    />
    <label>Experience</label>
  </div>

  <div className="form-input">
    <input
      type="text"
      name="education"
      value={formData.education.join(', ')} // Join array to display as a string
      onChange={(e) => setFormData({ ...formData, education: e.target.value.split(', ') })}
      placeholder="Education (comma separated)"
      className="input"
    />
    <label>Education</label>
  </div>

 <div className="form-input">
  <label>Projects</label>
  {formData.projects.map((project, index) => (
    <div key={index} className="project-entry">
      <input
        type="text"
        name="name"
        value={project.name}
        onChange={(e) => handleProjectChange(index, e)}
        placeholder="Project Name"
        className="input"
      />
      <label className="project-label">Project Name</label>

      <input
        type="text"
        name="description"
        value={project.description}
        onChange={(e) => handleProjectChange(index, e)}
        placeholder="Project Description"
        className="input"
      />
      <label className="project-label">Project Description</label>

      <input
        type="text"
        name="link"
        value={project.link}
        onChange={(e) => handleProjectChange(index, e)}
        placeholder="Project Link"
        className="input"
      />
      <label className="project-label">Project Link</label>

      <button type="button" onClick={() => removeProject(index)} className="remove-button">
        Remove Project
      </button>
    </div>
  ))}
  <button type="button" onClick={addProject} className="add-button">Add Project</button>
</div>

  <div className="form-input">
    <input
      type="text"
      name="certifications"
      value={formData.certifications.join(', ')} // Join array to display as a string
      onChange={(e) => setFormData({ ...formData, certifications: e.target.value.split(', ') })}
      placeholder="Certifications (comma separated)"
      className="input"
    />
    <label>Certifications</label>
  </div>

  <div className="form-input">
    <input
      type="text"
      name="languages"
      value={formData.languages.join(', ')} // Join array to display as a string
      onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(', ') })}
      placeholder="Languages (comma separated)"
      className="input"
    />
    <label>Languages</label>
  </div>

  <div className="form-input">
    <input
      type="text"
      name="interests"
      value={formData.interests.join(', ')} // Join array to display as a string
      onChange={(e) => setFormData({ ...formData, interests: e.target.value.split(', ') })}
      placeholder="Interests (comma separated)"
      className="input"
    />
    <label>Interests</label>
  </div>
  
    <button type="submit" className="btn-submit">Update User</button>
  </form>
  
  );
};

export default UpdateUserForm;



