import React from "react";
import style from "../../../styles/Form.module.css";
import classNames from "classnames/bind";
export const FormFooter = () => {
  const sx = classNames.bind(style);
  return (
    <div className={sx("FooterContainer")}>
      <div className={sx("FooterText")}>Already Have An Account? </div>
      <a className={sx("FooterHighlight")}>Login</a>
    </div>
  );
};
