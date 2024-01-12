import React from "react";
import * as Form from "@radix-ui/react-form";
import style from "./style.module.css";
import isEmail from "validator/lib/isEmail";
import classNames from "classnames/bind";
export const FormSubmitButton = ({useForm,text,Function}) => {
  const updatePasswordError = useForm((state) => state.updatePasswordError);
  const updateEmailError = useForm((state) => state.updateEmailError);
  const updateError = useForm((state) => state.updateError);
  const password = useForm((state) => state.password);
  const email = useForm((state) => state.email);
  const sx = classNames.bind(style);

  return (
    <Form.Submit asChild>
      <button
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
      </button>
    </Form.Submit>
  );
};
