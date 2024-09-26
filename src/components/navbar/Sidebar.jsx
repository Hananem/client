// src/components/Sidebar.js
import React from 'react';
import { useUiContext } from "../../contexts/UiContext";
import { actioTypes } from "../../reducers/uiReducer";
import links from "./links";
import { FiDelete } from "react-icons/fi";

const Sidebar = () => {
    const { isSidebarOpen, dispatch } = useUiContext();

    const handleCloseSidebar = (e) => {
        if (e.target.classList.contains("mobile-modal"))
            dispatch({ type: actioTypes.closeSidebar });
    };

    return (
        <div
            className={`mobile-modal fixed w-screen h-screen top-0 left-0 bg-black/50 z-10 opacity-0 pointer-events-none transition-a ${
                isSidebarOpen && "open"
            }`}
            onClick={handleCloseSidebar}
        >
            <ul
                className={`mobile-dialog absolute flex flex-col space-y-4 p-3 bg-white dark:bg-dark-card h-screen max-w-[300px] w-full -translate-x-[500px] transition-a ${
                    isSidebarOpen && "open"
                }`}
            >
                <div className="flex-center-between border-b dark:border-slate-800">
                    <p className="uppercase">menu</p>
                    <div
                        className="icon-box md:hidden"
                        onClick={() => dispatch({ type: actioTypes.closeSidebar })}
                    >
                        <FiDelete />
                    </div>
                </div>
                {links.map(({ id, linkText, url }) => (
                    <a key={id} href={url} onClick={() => dispatch({ type: actioTypes.closeSidebar })}>
                        {linkText}
                    </a>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
