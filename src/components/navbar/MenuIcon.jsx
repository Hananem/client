// src/components/MenuIcon.js
import React from 'react';
import { motion } from "framer-motion";
import { BiMenu } from "react-icons/bi";
import { useUiContext } from "../../contexts/UiContext";
import { actioTypes } from "../../reducers/uiReducer";

const MenuIcon = () => {
    const { dispatch } = useUiContext();

    return (
        <motion.div
            className="icon-box md:hidden"
            onClick={() => dispatch({ type: actioTypes.openSidebar })}
            whileTap={{ scale: 0.5 }}
        >
            <BiMenu />
        </motion.div>
    );
};

export default MenuIcon;
