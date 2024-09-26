import React from 'react';
import JobViewsOverTime from './charts/JobViewsOverTime';
import JobPostingsByLocation from "./charts/JobPostingsByLocation"
import JobPostingsByEmploymentType from "./charts/JobPostingsByEmploymentType"
import JobPostingsByCompany from "./charts/JobPostingsByCompany"
import JobSeekerByExperienceLevel from './charts/JobSeekerByExperienceLevel';
import UserRegistration from './charts/UserRegistration';
import JobApplicationsByType from './charts/JobApplicationsByType';
import HiringsOverTime from "./charts/HiringsOverTime"
const MainPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobViewsOverTime />
      <JobPostingsByLocation/>
      <JobPostingsByEmploymentType/>
      <JobPostingsByCompany/>
      <JobSeekerByExperienceLevel />
      <UserRegistration/>
      <JobApplicationsByType/>
      <HiringsOverTime/>
      </div>
    </div>
  );
};

export default MainPage;