import React from "react";
import {motion} from "framer-motion";
import * as Form from "@radix-ui/react-form";
import style from "./style.module.css";
import isEmail from "validator/lib/isEmail";
import classNames from "classnames/bind";
import { useForm } from "../../hooks/useForm.js";
export const FormSubmitButton = ({text,Function}) => {
  const updatePasswordError = useForm((state) => state.updatePasswordError);
  const updateEmailError = useForm((state) => state.updateEmailError);
  const updateError = useForm((state) => state.updateError);
  const password = useForm((state) => state.password);
  const email = useForm((state) => state.email);
  const sx = classNames.bind(style);

  return (
    <Form.Submit asChild>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          updateError("");
          if (!isEmail(email)) {
            updateEmailError([true, { reasons: "invalid" }]);
          }
          if (password.length < 6) {
            updatePasswordError([true, { reasons: "length" }]);
          }
          if (isEmail(email) && password.length > 6) {
            setTimeout(async () => {
              let message = await Function(email, password);
              console.log(message);
              updateError(message.error);
            }, 0);
          }
        }}
        className={sx("formButton")}
      >
        {text}
      </motion.button>
    </Form.Submit>
  );
};
