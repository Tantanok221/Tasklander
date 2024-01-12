import React from "react";
import isEmail from "validator/lib/isEmail";
import * as Form from "@radix-ui/react-form";
import style from "../../../styles/Form.module.css";
import classNames from "classnames/bind";
import { useForm } from "../hooks/useForm.js";

export const EmailForm = () => {
  const sx = classNames.bind(style);
  const updateEmail = useForm((state) => state.updateEmail);
  const email = useForm((state) => state.email);
  const emailError = useForm((state) => state.emailError);
  const error = useForm((state) => state.error);
  return (
    <Form.Field className={sx("formField")}>
      <Form.Label className={sx("formLabel")}>Email</Form.Label>
      <Form.Control asChild>
        <input
          placeholder="Enter Your Email"
          onChange={(value) => updateEmail(value.currentTarget.value)}
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
      {error.message === "User already registered" ? (
        <div
          className={sx("formMessage", {
            errorText: emailError[1]?.reasons == "invalid" || error?.name,
          })}
          match="typeMismatch"
        >
          User Already Registerd
        </div>
      ) : null}
    </Form.Field>
  );
};
