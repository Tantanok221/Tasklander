import React from 'react'
import classNames from "classnames/bind";
import style from "./style.module.css";

export const FormDivider = () => {
  const sx = classNames.bind(style);
  return (
    <div className={sx("divider")}>
        <div className={sx("line")}></div>
        <span className={sx("or")}>OR</span>
        <div className={sx("line")}></div>
      </div>
  )
}
