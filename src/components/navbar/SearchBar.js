import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return; 
    }
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <form onSubmit={handleSearch} className="flex">
                <div
            className={`flex-align-center relative h-9 w-9 transition-a  border-slate-300 dark:border-hover-color rounded-full ${
              showSearchBar && "!w-[150px] md:!w-[250px] border"
            }`}
          >

      <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`outline-none border-none h-0 w-0 bg-transparent ${
                showSearchBar && "!w-full !h-full px-4"
              }`}
          placeholder="Search..."
        />
        <button type="submit" className="w-7 h-7 grid place-items-center bg-primary text-white  sm:cursor-pointer dark:hover:bg-hover-color rounded-full flex-shrink-0"
              onClick={() => setShowSearchBar(!showSearchBar)}>
        <FiSearch />

        </button>
      </div>
    
      </form>
    </div>
  );
};

export default SearchBar;


