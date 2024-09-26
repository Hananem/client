
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { saveJob } from '../../redux/userSlice';
import { TbClockHour7 } from "react-icons/tb";
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaUser } from 'react-icons/fa';
import { MdOutlineMail } from "react-icons/md";
import { PiGraduationCapLight } from "react-icons/pi";
import { IoMdPaperPlane } from "react-icons/io";
import ApplyJobModal from './ApplyJobModal';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';

const AnotherJob = ({ jobId, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.user?.user?.user?.savedJobs);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: {
      name: '',
      description: '',
      contactEmail: '',
      logo: ''
    },
    location: '',
    salary: { min: '', max: '' },
    experienceLevel: '',
    employmentType: '',
    educationLevel: '',
    jobType: '',
    requirements: [],
    responsibilities: [],
  });
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSaved = savedJobs?.includes(jobId);
  const openApplyModal = () => setIsModalOpen(true);
  const closeApplyModal = () => setIsModalOpen(false);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/jobs/${jobId}`);
        setJob(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested object updates
    if (name.startsWith('company.')) {
      const fieldName = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        company: {
          ...prevState.company,
          [fieldName]: value
        }
      }));
    } else if (name.startsWith('salary.')) {
      const fieldName = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        salary: {
          ...prevState.salary,
          [fieldName]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSaveJob = () => {
    dispatch(saveJob(jobId));
  };

  const handleUpdateJob = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:4000/api/jobs/${jobId}`, formData, {
        headers: {
          'Authorization': token
        }
      });
      setJob(response.data);
      setFormData(response.data);
      setLoading(false);
      setShowUpdateModal(false); 
    } catch (error) {
      console.error('Error updating job:', error);
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleUploadLogo = async () => {
    const logoData = new FormData();
    logoData.append('logo', logo);

    try {
      const response = await axios.post(`http://localhost:4000/api/jobs/${jobId}/logo`, logoData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setJob(response.data);
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  const handleDeleteJob = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/jobs/${jobId}`, {
        headers: {
          'Authorization': token
        }
      });
      navigate('/jobs'); 
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="relative">
    
      {job ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 bottom-0 w-96 p-8 card shadow-lg overflow-y-auto z-50">
            <div className="mb-8">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                X
              </button>
           
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="icon-box absolute right-0 top-0">
                  <FaEllipsisV />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <button onClick={() => setShowUpdateModal(true)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</button>
                    <button onClick={() => setShowDeleteModal(true)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</button>
                  </div>
                )}
              </div>
              {job.company.logo && (
                <div className="mt-4">
                  <img
                    src={job.company.logo.url}
                    alt={`${job.company.name} logo`}
                    className="w-24 h-24 object-contain"
                  />
                </div>
              )}
              <h1 className="text-xl font-bold text-primary"> {job.jobTitle}</h1>
              <p><strong>Company Name:</strong> {job.company.name}</p>
              <div className="flex-align-center space-x-2" >
  <MdOutlineMail /> {job.company.contactEmail}
</div>
<div className="flex-align-center space-x-2">
  <FaMapMarkerAlt /> {job.location}
</div>
<div className="flex-align-center space-x-2">
  <IoMdPaperPlane /> {job.jobType} 
</div>
<div className="flex-align-center space-x-2">
  <FaDollarSign /> {job.salary.min} - {job.salary.max}
</div>
<div className="flex-align-center space-x-2">
  <FaBriefcase /> {job.experienceLevel}
</div>
<div className="flex-align-center space-x-2">
  <TbClockHour7 /> {job.employmentType}
</div>
<div className="flex-align-center space-x-2">
  <PiGraduationCapLight /> {job.educationLevel}
</div>

<div className="flex-center-between">
<button onClick={openApplyModal} className="btn btn-primary">Apply</button>
<button
      onClick={handleSaveJob}
      disabled={loading}
      className={`flex items-center justify-center px-4 py-2 border rounded ${
        isSaved ? 'border-primary text-primary' : 'border-gray-300 text-gray-600'
      } hover:bg-gray-100`}
    >
      {isSaved ? <IoBookmark className="mr-2 text-primary" /> : <IoBookmarkOutline className="mr-2 text-gray-600" />}
      {isSaved ? 'Saved' : 'Save'}
    </button>
<ApplyJobModal jobId={jobId} showModal={isModalOpen} closeModal={closeApplyModal} />
</div>
              <p>{job.company.description}</p>

              <p><strong>Requirements:</strong> {job.requirements.join(', ')}</p>
              <p><strong>Responsibilities:</strong> {job.responsibilities.join(', ')}</p>
            </div>
            {showUpdateModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="card p-8 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-screen">
                  <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="jobTitle">Job Title</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="text"
                      id="companyName"
                      name="company.name"
                      value={formData.company.name || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="companyName">Company Name</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <textarea
                      id="companyDescription"
                      name="company.description"
                      value={formData.company.description || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="companyDescription">Company Description</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="email"
                      id="companyContactEmail"
                      name="company.contactEmail"
                      value={formData.company.contactEmail || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="companyContactEmail">Company Contact Email</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="location">Location</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="number"
                      id="minSalary"
                      name="salary.min"
                      value={formData.salary.min || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="minSalary">Min Salary</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="number"
                      id="maxSalary"
                      name="salary.max"
                      value={formData.salary.max || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="maxSalary">Max Salary</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="text"
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="experienceLevel">Experience Level</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="text"
                      id="employmentType"
                      name="employmentType"
                      value={formData.employmentType || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="employmentType">Employment Type</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="text"
                      id="educationLevel"
                      name="educationLevel"
                      value={formData.educationLevel || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="educationLevel">Education Level</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <input
                      type="text"
                      id="jobType"
                      name="jobType"
                      value={formData.jobType || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="jobType">Job Type</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="requirements">Requirements</label>
                  </div>
                  <div className="form-input w-full relative mb-4">
                    <textarea
                      id="responsibilities"
                      name="responsibilities"
                      value={formData.responsibilities || ''}
                      onChange={handleInputChange}
                      className="input border p-2 w-full"
                      required
                    />
                    <label htmlFor="responsibilities">Responsibilities</label>
                  </div>
                  <div className="mb-4">
                    <input type="file" id="logo" name="logo" onChange={handleLogoChange} />
                    <button onClick={handleUploadLogo} className="button mt-2">Upload Logo</button>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => setShowUpdateModal(false)} className="button mr-2">Cancel</button>
                    <button onClick={handleUpdateJob} className="button">Save</button>
                  </div>
                </div>
              </div>
            )}
            {showDeleteModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-screen">
                  <h2 className="text-2xl font-bold mb-4">Delete Job</h2>
                  <p>Are you sure you want to delete this job?</p>
                  <div className="flex justify-end mt-4">
                    <button onClick={() => setShowDeleteModal(false)} className="button mr-2">Cancel</button>
                    <button onClick={handleDeleteJob} className="button">Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AnotherJob;


