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
import { SubmitButton } from "./subcomponent/SubmitButton.jsx";



const Login = () => {
  
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
        <FormCheckbox flipVisible={flipVisible} />
        <SubmitButton/>
      </Form.Root>
    </div>
  );
};

export default Login;
