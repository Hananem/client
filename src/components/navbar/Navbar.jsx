// src/Navbar.js
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../../redux/userSlice';
import SearchBar from './SearchBar';
import links from "./links"
import { FiDelete, FiMoon, FiPlus, FiSun } from "react-icons/fi";
import { BiBell, BiChevronDown, BiSearch, BiMenu } from "react-icons/bi";
import useDarkMode from "../../helpers/useDarkMode";
import { useUiContext } from "../../contexts/UiContext";
import { actioTypes } from "../../reducers/uiReducer";
import Sidebar from './Sidebar';
import MenuIcon from './MenuIcon';
import ProfileLink from './ProfileLink';
const Navbar = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.user?.user?._id);
  const token = useSelector((state) => state.user?.user?.token);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, toggleMode] = useDarkMode("JobIt-Next-theme-mode");
  const { isSidebarOpen } = useUiContext();
  const location = useLocation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`, {
          headers: {
            Authorization: token,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleLogout = () => {
    dispatch(logout());
  };
// Check if the current route is an admin route
const isAdminRoute = location.pathname.includes('/admin');

// Conditionally set the classes
const navbarClasses = isAdminRoute
  ? 'navbar  px-4 md:px-6 py-2 bg-white dark:bg-dark-card border-b dark:border-slate-800 flex justify-between items-center h-16'
  : 'navbar fixed w-full z-10 top-0 left-0 px-4 md:px-6 py-2 bg-white dark:bg-dark-card border-b dark:border-slate-800 flex justify-between items-center h-16';

  return (
    <nav >
    <div className={navbarClasses}>
        <div>
        <Link to="/" className="text-lg font-bold text-black dark:text-white">MyApp</Link>
      </div>
      <ul className="hidden md:flex-align-center space-x-3 lg:space-x-6">
        {links.map(({ id, linkText, url }) => (
          <Link to={url} key={id}>
            {linkText}
          </Link>
        ))}
      </ul>

    <Sidebar/>
    <div className="flex-align-center space-x-2">
    <SearchBar />

    <motion.div
          className="icon-box bg-slate-100 dark:bg-[#2b2b35]"
          onClick={toggleMode}
          whileTap={{ scale: 0.5 }}
        >
          {mode === "dark" ? <FiSun /> : <FiMoon />}
        </motion.div>
        <div
          className="icon-box !opacity-100 relative notification-btn "
          
         
        >
          <motion.div className="relative" whileTap={{ scale: 0.5 }}>
            <BiBell className="notification-btn text-muted" />
            <div className="absolute w-2 h-2 bg-primary top-0 right-0 rounded-full notification-btn"></div>
          </motion.div>
      
        </div>
        {user ? (
          <>
          <ProfileLink />

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

          </>
        ) : (
          <Link to="/login" className="text-sm font-medium text-black dark:text-white">Login</Link>
        )}
        <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700"></div>
      <MenuIcon/>
    </div>
    </div>
    </nav>
  );
};

export default Navbar;



