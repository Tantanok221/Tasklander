import React from "react";
import style from "./style.module.css";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { supabase } from "../../helper/supabase.js";
import * as Form from "@radix-ui/react-form";
import isEmail from "validator/lib/isEmail";
import { FormDivider } from "../FormDivider/FormDivider.jsx";
import { FormCheckbox } from "../FormCheckbox/FormCheckbox.jsx";
import { GoogleButton } from "../SignUp/subcomponent/GoogleButton.jsx";
import { EmailForm } from "./subcomponent/EmailForm.jsx";
import { PasswordForm } from "./subcomponent/PasswordForm.jsx";
import { useForm } from "./hooks/useForm.js";
import { Header } from "./subcomponent/Header.jsx";

async function signInWithEmail(email, password) {
  const message = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return message;
}

const Login = () => {
  const updatePasswordError = useForm((state) => state.updatePasswordError);
  const updateEmailError = useForm((state) => state.updateEmailError);
  const updateError = useForm((state) => state.updateError);
  const flipVisible = useForm((state) => state.flipVisible);
  const password = useForm((state) => state.password);
  const email = useForm((state) => state.email);
  const sx = classNames.bind(style);
  return (
    <div className={sx("container")}>
      <Header />
      <GoogleButton />
      <FormDivider />

      <Form.Root
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={sx("formContainer")}
      >
        <EmailForm />
        <PasswordForm />
        <FormCheckbox flipVisible={flipVisible} />
        <Form.Submit asChild>
          <button
            onClick={() => {
              if (!isEmail(email)) {
                updateEmailError([true, { reasons: "invalid" }]);
                
              }
              if (password.length < 6) {
                updatePasswordError([true, { reasons: "length" }]);
                
              }
              if (isEmail(email) && password.length > 6) {
                setTimeout(async () => {
                  let message = await signInWithEmail(email, password);
                  console.log(message);
                  updateError(message.error);
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
