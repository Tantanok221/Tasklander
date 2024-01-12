import React from 'react'
import style from "../../../styles/Form.module.css";
import classNames from "classnames/bind";

export const Header = () => {
  const sx = classNames.bind(style);
  return (
    <div className={sx("header")}>
        <h1 className={sx("title")}>Login</h1>
        <span className={sx("subtitle")}>Login To Your Account</span>
    </div>
  )
}
