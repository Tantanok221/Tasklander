import React from "react";
import classNames from "classnames/bind";
import style from "../../../styles/Form.module.css";
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../../helper/supabase.js";



export const GoogleButton = () => {
  const sx = classNames.bind(style);

  return (
    <button
      onClick={() => {
        let message = signInWithGoogle();
      }}
      className={sx("googleButton")}
    >
      <IconContext.Provider value={{ size: "2rem" }}>
        <FcGoogle />
      </IconContext.Provider>

      <h2 className={sx("googleText")}>Sign Up With Google</h2>
    </button>
  );
};
