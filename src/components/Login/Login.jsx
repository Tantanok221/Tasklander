import React from "react";
import style from "../../styles/Form.module.css";
import classNames from "classnames/bind";
import { motion } from "framer-motion";
import * as Form from "@radix-ui/react-form";
import { FormDivider } from "../FormDivider/FormDivider.jsx";
import { FormCheckbox } from "../FormCheckbox/FormCheckbox.jsx";
import { GoogleButton } from "../SignUp/subcomponent/GoogleButton.jsx";
import { EmailForm } from "./subcomponent/EmailForm.jsx";
import { PasswordForm } from "./subcomponent/PasswordForm.jsx";
import { useForm } from "../../hooks/useForm.js";
import { Header } from "./subcomponent/Header.jsx";
import { FormSubmitButton } from "../FormSubmitButton/FormSubmitButton";
import { signInWithEmail } from "../../helper/supabase.js";
import { FormFooter } from "./subcomponent/FormFooter.jsx";



const Login = () => {
  const reset = useForm((state) => state.reset);
  reset()
  const flipVisible = useForm((state) => state.flipVisible);
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
        <FormCheckbox  />
        <FormSubmitButton  Function={signInWithEmail} text={"Log In"} />
      </Form.Root>
        <FormFooter/>
    </div>
  );
};

export default Login;
