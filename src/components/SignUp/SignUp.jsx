import React from "react";
import style from "./style.module.css";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { supabase } from "../../helper/supabase.js";
import { FcGoogle } from "react-icons/fc";
import * as Form from "@radix-ui/react-form";

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
        <span className={sx("subtitle")}></span>
      </div>
      <div className={sx("googleButton")}>
        <FcGoogle />
        <h2 className={sx("googleText")}>Sign Up With Google</h2>
      </div>
      <div className={sx("divider")}></div>
      <Form.Root className={sx("formContainer")}>
        <Form.Field>
          <Form.Label>Email</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Label>Password</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your Password
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
          <Form.Control asChild>
            <input minlength="6"  className="Input" type="password" required />
          </Form.Control>
        </Form.Field>
      </Form.Root>
    </div>
  );
};
export default SignUp;
