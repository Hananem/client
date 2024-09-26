import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { BiChevronDown } from "react-icons/bi";
import { useUiContext } from "../../contexts/UiContext";
import { actioTypes } from "../../reducers/uiReducer";
import Dropdown from './Dropdown';

const ProfileLink = () => {
  const userId = useSelector((state) => state.user?.user?.user?._id);
  const token = useSelector((state) => state.user?.user?.token);
  const [user, setUser] = useState(null);
  const { isDropdownOpen, dispatch } = useUiContext();

  const handleDropdown = () => {
    dispatch({ type: actioTypes.toggleDropdown });
  };

  const handleCloseDropdown = () => {
    dispatch({ type: actioTypes.closeDropdown });
  };

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
      }
    };

    fetchUser();
  }, [userId, token]);

  if (!user) {
    return null; // or you can return a loading spinner
  }

  return (
    <div
      className="dropdown-btn flex-align-center space-x-1 md:pl-4 flex-shrink-0 relative"
      onClick={handleDropdown}
    >
      <motion.img
        src={user.profilePhoto?.url || 'default-image-url'} // Provide a default image URL
        alt=""
        className="w-8 h-8 rounded-full sm:cursor-pointer dropdown-btn"
        whileTap={{ scale: 0.5 }}
      />
      <BiChevronDown className="dropdown-btn" />
      <Dropdown userId={userId} isDropdownOpen={isDropdownOpen} handleCloseDropdown={handleCloseDropdown} />
    </div>
  );
};

export default ProfileLink;

