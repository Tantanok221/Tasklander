import React from "react";
import style from "./style.module.css";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { supabase } from "../../helper/supabase.js";
import { FcGoogle } from "react-icons/fc";
import * as Form from "@radix-ui/react-form";
import { IconContext } from "react-icons";
import isEmail from "validator/lib/isEmail";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa6";
import { FormDivider } from "../FormDivider/FormDivider.jsx";


async function signInWithEmail(email, password) {
  const message = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return message
}

async function signInWithGoogle(){
  const message = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  return message  
}

const Login = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [emailError, setEmailError] = React.useState([]);
  const [passwordError, setPasswordError] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  console.log(error.message);
  const sx = classNames.bind(style);
  return (
    <div className={sx("container")}>
      <div className={sx("header")}>
        <h1 className={sx("title")}>Login</h1>
        <span className={sx("subtitle")}>Login To Your Account</span>
      </div>
      <button onClick={() => {
        let message = signInWithGoogle()
        
      }} className={sx("googleButton")}>
        <IconContext.Provider value={{ size: "2rem" }}>
          <FcGoogle />
        </IconContext.Provider>

        <h2 className={sx("googleText")}>Sign In With Google</h2>
      </button>
      <FormDivider/>
      <Form.Root
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={sx("formContainer")}
      >
        <Form.Field className={sx("formField")}>
          <Form.Label className={sx("formLabel")}>Email</Form.Label>
          <Form.Control asChild>
            <input
              placeholder="Enter Your Email"
              onChange={(value) => setEmail(value.currentTarget.value)}
              className={sx("input", {
                errorBorder: emailError[0] || error.name,
              })}
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
          ) : null}
          {error.message === "Invalid login credentials" ? (
            <div
              className={sx("formMessage", {
                errorText: emailError[1]?.reasons == "invalid" || error?.name,
              })}
              match="typeMismatch"
            >
              Invalid Password or Email
            </div>
          ) : null}
        </Form.Field>
        <Form.Field className={sx("formField")}>
          <Form.Label className={sx("formLabel")}>Password</Form.Label>
          <Form.Control asChild>
            <input
              placeholder="Enter Your Password"
              id="password"
              onChange={(value) => setPassword(value.currentTarget.value)}
              minLength="6"
              className={sx("input", { errorBorder: passwordError[0] || error.message === "Invalid login credentials" })}
              type={visible ? "text" : "password"}
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
          {error.message === "Invalid login credentials" ? (
            <div
              className={sx("formMessage", {
                errorText: emailError[1]?.reasons == "invalid" || error?.name,
              })}
              match="typeMismatch"
            >
              Invalid Password or Email
            </div>
          ) : null}
        </Form.Field>
        <Checkbox.Root onCheckedChange={() => {
          setVisible(!visible)
        }} className={sx("checkboxContainer")}>
          <div className={sx("checkbox")}>
            <Checkbox.Indicator>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
              <FaCheck />
            </IconContext.Provider>
            </Checkbox.Indicator>
          </div>
          <label className={sx("checkboxLabel")}>Show Password</label>
        </Checkbox.Root>
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
                  let message = await signInWithEmail(email, password);
                  console.log(message);
                  setError(message.error);
                }, 0);
              }
            }}
            className={sx("formButton")}
          >
            Login
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default Login;
