import React from "react";
import style from "../style.module.css";
import classNames from "classnames/bind";
import { motion } from "framer-motion";

const RemoveDate = ({setGlobalDate}) => {
  const sx = classNames.bind(style);
  return (
    <div className={sx("row")}>
      <motion.div
        
        className={sx("removeDate")}
        onClick={() => {
          setGlobalDate("");
        }}
        whileHover={{ backgroundColor: "var(--onHold)" }}
        whileTap={{scale: 0.8}}
      >
        Remove Date
      </motion.div>
    </div>
  );
};

export default RemoveDate;
