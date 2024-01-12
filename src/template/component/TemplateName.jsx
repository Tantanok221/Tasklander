import React from "react";
import style from "./TemplateName.module.css";
import classNames from "classnames/bind";
import {motion} from "framer-motion"

export const TemplateName = () => {
  const sx = classNames.bind(style);
  return (<motion.div className={sx("TemplateName")}>TemplateName </motion.div>)
}
