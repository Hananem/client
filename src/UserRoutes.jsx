import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar"

import Home from './pages/home/Home';
import Jobs from './pages/jobs/Jobs';
import PostJob from './pages/jobs/PostJob';

import CreateJobSeekerPost from './pages/jobSeeker/CreateJobSeekerPost';
import JobSeekerPosts from './pages/jobSeeker/JobSeekerPosts';
import Profile from './pages/profile/Profile';
import UpdateUserForm from './pages/profile/UpdateUserForm';
import Notifications from './pages/notifications/Notifications';
import SearchResults from './pages/search/SearchResults';

import { useSelector } from 'react-redux';
function UserRoutes() {
  return (
    <div className="App">
    
    <Navbar/>
     <Routes>
     <Route path="/" element={<Home />} /> 
     <Route path="/alljobs" element={<Jobs />} />
     <Route  path="/notifications" element={<Notifications/>} />
     <Route path="/search" element={<SearchResults />} />
     <Route path="/post-job" element={<PostJob />} />
     <Route path="/create-jobseeker" element={<CreateJobSeekerPost />} />
     <Route path="/jobseeker" element={<JobSeekerPosts />} />
 
     <Route path="/profile/:userId"   element={<Profile />} />
     <Route path="/profile/edit/:userId"   element={<UpdateUserForm />} />
  
     </Routes>
    </div>
  );
}

export default UserRoutes;
