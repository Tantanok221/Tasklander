import React from 'react'
import * as Form from "@radix-ui/react-form";
import style from "../../../styles/Form.module.css";
import { useForm } from "../hooks/useForm.js";
import classNames from "classnames/bind";
import { motion } from "framer-motion";

export const PasswordForm = () => {
  const sx = classNames.bind(style);
  const visible = useForm((state) => state.visible);
  const updatePassword = useForm((state) => state.updatePassword);
  const password = useForm((state) => state.password);
  const error = useForm((state) => state.error);
  const emailError = useForm((state) => state.emailError);
  const passwordError = useForm((state) => state.passwordError);
  return (
    <Form.Field className={sx("formField")}>
          <Form.Label className={sx("formLabel")}>Password</Form.Label>
          <Form.Control asChild>
            <motion.input
             whileTap={{ scale: 0.995 }}
              placeholder="Enter Your Password"
              id="password"
              onChange={(value) => updatePassword(value.currentTarget.value)}
              minLength="6"
              className={sx("input", { errorBorder: passwordError[0] || error?.message === "Invalid login credentials" })}
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
          {error?.message === "Invalid login credentials" ? (
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
  )
}
