import React from 'react'
import style from "../style.module.css";
import classNames from "classnames/bind";
export const FormFooter = () => {
  const sx = classNames.bind(style);
  return (
    <div className={sx("FooterContainer")}>
      
      <div className={sx("FooterText")}>Don't Have An Account? </div>
      <a className={sx("FooterHighlight")}>Register</a></div>
  )
}
