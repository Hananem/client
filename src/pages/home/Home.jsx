import React from 'react';
import { FaBriefcase, FaUserTie, FaCheckCircle, FaBuilding } from 'react-icons/fa';
import { FaRegLightbulb,  FaPeopleArrows } from 'react-icons/fa';
import { FaSearch, FaHandshake } from 'react-icons/fa';

const Home = () => {
    return(
<div>
    <div className="bg-gradient-to-r from-primary to-teal-500 text-white h-screen flex flex-col justify-center items-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
      Find Your Dream Job or Discover Top Talent
    </h1>
    <p className="text-lg md:text-2xl mb-8 text-center">
      Connecting job seekers with the right opportunities and employers with the best candidates.
    </p>
    
    <div className="flex w-full max-w-xl">
      <input 
        type="text" 
        className="flex-grow p-4 rounded-l-lg text-gray-800 focus:outline-none form-input input" 
        placeholder="Search jobs or talents..." 
      />
      <button className="btn btn-primary px-6 py-4 rounded-r-lg font-semibold">
        Search
      </button>
    </div>
    
    <div className="mt-8 flex space-x-4">
      <button className="btn btn-primary-light">
        Find Jobs
      </button>
      <button className="btn btn-primary-light">
        Post Jobs
      </button>
    </div>
  </div>

 <section className="bg-main dark:bg-dark-main py-12">
<div className="container mx-auto px-4">
  <h2 className="text-3xl font-bold text-center text-slate-700 dark:text-slate-300 mb-8">About Us</h2>
  <div className="flex flex-col items-center mb-12">
    <img
      src="https://via.placeholder.com/800x400"
      alt="Team"
      className="w-full h-auto rounded-lg shadow-light dark:shadow-none"
    />
  </div>
  <div className="flex flex-col md:flex-row md:space-x-8">
    {/* Mission Section */}
    <div className="md:w-1/3 mb-8 md:mb-0">
      <div className="flex items-center mb-4">
        <FaRegLightbulb className="w-8 h-8 text-primary dark:text-primary-light mr-3" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Our Mission</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-300">
        We connect job seekers with their ideal careers through a seamless, user-friendly experience.
      </p>
    </div>
    {/* Story Section */}
    <div className="md:w-1/3 mb-8 md:mb-0">
      <div className="flex items-center mb-4">
        <FaBriefcase className="w-8 h-8 text-primary dark:text-primary-light mr-3" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Our Story</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-300">
        Since our inception, we have been committed to transforming the job search experience with innovative solutions.
      </p>
    </div>
    {/* Team Section */}
    <div className="md:w-1/3">
      <div className="flex items-center mb-4">
        <FaPeopleArrows className="w-8 h-8 text-primary dark:text-primary-light mr-3" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Our Team</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-300">
        Our dedicated team works tirelessly to ensure that both job seekers and employers find what they need with ease.
      </p>
    </div>
  </div>
</div>
</section>

 <section className="bg-gradient-to-r from-primary-light to-secondaryLightGreen py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-slate-800 dark:text-slate-200 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Step 1 */}
          <div className="flex-1 bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl dark:shadow-none mb-8 md:mb-0">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-lg">
                <FaSearch className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Search Jobs</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Use our advanced search filters to find the perfect job match based on your skills, location, and preferences.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex-1 bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl dark:shadow-none mb-8 md:mb-0">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-lg">
                <FaHandshake className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Apply Easily</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Submit your application directly through our platform with a few clicks. Track your application status in real-time.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex-1 bg-white dark:bg-dark-card p-8 rounded-xl shadow-xl dark:shadow-none">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-lg">
                <FaCheckCircle className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Get Hired</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Receive job offers and secure your dream job. We’re here to support you throughout your career journey.
            </p>
          </div>
        </div>
      </div>
    </section>
</div>
    )
}

export default Home