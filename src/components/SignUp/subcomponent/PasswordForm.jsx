import React from 'react'
import * as Form from "@radix-ui/react-form";
import style from "../style.module.css";
import classNames from "classnames/bind";
import { useForm } from "../hooks/useForm.js";

export const PasswordForm = () => {
  const sx = classNames.bind(style);
  const visible = useForm((state) => state.visible);
  const updatePassword = useForm((state) => state.updatePassword);
  const password = useForm((state) => state.password);
  const passwordError = useForm((state) => state.passwordError);
  return (
    <Form.Field className={sx("formField")}>
          <Form.Label className={sx("formLabel")}>Password</Form.Label>
          <Form.Control asChild>
            <input
              placeholder="Enter Your Password"
              id="password"
              onChange={(value) => updatePassword(value.currentTarget.value)}
              minLength="6"
              className={sx("input", { errorBorder: passwordError[0] })}
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
        </Form.Field>
  )
}
