import React from "react";
import style from "./style.module.css";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { supabase } from "../../helper/supabase.js";
import { FcGoogle } from "react-icons/fc";
import * as Form from "@radix-ui/react-form";
import { IconContext } from "react-icons";
async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: "https//example.com/welcome",
    },
  });
}

const SignUp = () => {
  const sx = classNames.bind(style);
  return (
    <div className={sx("container")}>
      <div className={sx("header")}>
        <h1 className={sx("title")}>Sign Up</h1>
        <span className={sx("subtitle")}>Sign Up To Your Account</span>
      </div>
      <div className={sx("googleButton")}>
        <IconContext.Provider value={{ size: "2rem" }}>
          <FcGoogle />
        </IconContext.Provider>

        <h2 className={sx("googleText")}>Sign Up With Google</h2>
      </div>
      <div className={sx("divider")}>
        <div className={sx("line")}></div>
        <span className={sx("or")}>OR</span>
        <div className={sx("line")}></div>
      </div>
      <Form.Root className={sx("formContainer")}>
        <Form.Field className={sx("formField")}>
          <Form.Label className={sx("formLabel")}>Email</Form.Label>
          <Form.Control asChild>
            <input placeholder="Enter Your Email" className={sx("input")} type="email" required />
          </Form.Control>
          <Form.Message className={sx("formMessage")} match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </Form.Field>
        <Form.Field className={sx("formField")}>
          <Form.Label className={sx("formLabel")}>Password</Form.Label>
          <Form.Control asChild>
            <input placeholder="Enter Your Password"  minlength="6" className={sx("input")} type="password" required />
          </Form.Control>
          <Form.Message className={sx("formMessage")} match="tooShort">
          The password must be longer than 6 character
          </Form.Message>
          <Form.Message className={sx("formMessage")} match="typeMismatch">
            Please provide a valid password
          </Form.Message>
        </Form.Field>
      </Form.Root>
    </div>
  );
};
export default SignUp;
