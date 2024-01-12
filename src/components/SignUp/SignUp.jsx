import React from "react";
import style from "./style.module.css";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { supabase } from "../../helper/supabase.js";
import * as Form from "@radix-ui/react-form";
import isEmail from "validator/lib/isEmail";
import { FormDivider } from "../FormDivider/FormDivider.jsx";
import { GoogleButton } from "./subcomponent/GoogleButton.jsx";
import { EmailForm } from "./subcomponent/EmailForm.jsx";
import { PasswordForm } from "./subcomponent/PasswordForm.jsx";
import { FormCheckbox } from "../FormCheckbox/FormCheckbox.jsx";
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
  const [visible, setVisible] = React.useState(false);
  console.log(error.name);
  const sx = classNames.bind(style);
  return (
    <div className={sx("container")}>
      <div className={sx("header")}>
        <h1 className={sx("title")}>Sign Up</h1>
        <span className={sx("subtitle")}>Sign Up To Your Account</span>
      </div>
      <GoogleButton />
      <FormDivider />
      <Form.Root
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={sx("formContainer")}
      >
        <EmailForm
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          error={error}
        />
        <PasswordForm
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
          visible={visible}
        />
        <FormCheckbox setVisible={setVisible}/>
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
