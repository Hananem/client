// AdminRoutes.js
import { Route, Routes, Navigate } from 'react-router-dom';

import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import UsersTable from './pages/admin/UsersTable';
import JobsTable from './pages/admin/JobsTable';
import BlogsTable from './pages/admin/BlogsTable';
import EventsTable from './pages/admin/EventsTable';
import MainPage from './pages/admin/MainPage';
import JobSeekerPostsTable from './pages/admin/JobSeekerPostsTable';
import CreateBlog from './pages/blog/CreateBlog';

function AdminRoutes() {
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-16 md:ml-56">
      <Navbar />
      <Routes>

      <Route path="/"   element={<MainPage />} />
     <Route path="/users-table"   element={<UsersTable />} />
     <Route path="/jobs-table"   element={<JobsTable />} />
     <Route path="/blogs-table"   element={<BlogsTable />} />
     <Route path="/events-table"   element={<EventsTable />} />
     <Route path="/jobseekerposts-table"   element={<JobSeekerPostsTable />} />
     <Route path="/create-blog" element={<CreateBlog />} />
     </Routes>

    </div>
  </div>
  );
}

export default AdminRoutes;
