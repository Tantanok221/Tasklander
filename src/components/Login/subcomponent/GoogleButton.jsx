import React from "react";
import classNames from "classnames/bind";
import style from "../style.module.css";
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";

async function signInWithGoogle() {
  const message = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  return message;
}

export const GoogleButton = () => {
  const sx = classNames.bind(style);
  return (
    <button
      onClick={() => {
        signInWithGoogle();
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
