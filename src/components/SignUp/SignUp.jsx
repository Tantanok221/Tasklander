import React from "react";
import style from "./style.module.css";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { supabase } from "../../helper/supabase.js";
import { FcGoogle } from "react-icons/fc";
import * as Form from "@radix-ui/react-form";
import { IconContext } from "react-icons";
import isEmail from "validator/lib/isEmail";

async function signUpNewUser(email, password) {
  const message = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return message;
}
const SignUp = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [emailError, setEmailError] = React.useState([]);
  const [passwordError, setPasswordError] = React.useState([]);

  const sx = classNames.bind(style);
  console.log(error);
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
            <input
              placeholder="Enter Your Email"
              onChange={(value) => setEmail(value.currentTarget.value)}
              className={sx("input", { errorBorder: emailError[0] })}
              type="email"
              required
            />
          </Form.Control>
          {!isEmail(email) ? (
            <div
              className={sx("formMessage", {
                errorText: emailError[1]?.reasons == "invalid",
              })}
              match="typeMismatch"
            >
              Please provide a valid email
            </div>
          ) : (
            <></>
          )}
        </Form.Field>
        <Form.Field className={sx("formField")}>
          <Form.Label className={sx("formLabel")}>Password</Form.Label>
          <Form.Control asChild>
            <input
              placeholder="Enter Your Password"
              id="password"
              onChange={(value) => setPassword(value.currentTarget.value)}
              minLength="6"
              className={sx("input", { errorBorder: passwordError[0] })}
              type="password"
              required
            />
          </Form.Control>
          {password.length < 6 ? (
            <div
              className={sx("formMessage", {
                errorText: passwordError[1]?.reasons == "length",
              })}
              match="tooShort"
            >
              The password must be longer than 6 character
            </div>
          ) : (
            <></>
          )}
        </Form.Field>
        <Form.Submit asChild>
          <button
            onClick={() => {
              if (!isEmail(email)) {
                setEmailError([true, { reasons: "invalid" }]);
                return false;
              }
              if (password.length < 6) {
                setPasswordError([true, { reasons: "length" }]);
                return false;
              }
              if (isEmail(email) && password.length > 6) {
                setTimeout(async () => {
                  let message = await signUpNewUser(email, password);
                  console.log(message);
                  setError(message.error);
                }, 0);
              }
            }}
            className={sx("formButton")}
          >
            Sign Up
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};
export default SignUp;
