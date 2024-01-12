import React from 'react'
import * as Form from "@radix-ui/react-form";
import style from "../style.module.css";
import classNames from "classnames/bind";
export const PasswordForm = ({error,emailError,passwordError,setPassword,password,visible}) => {
  const sx = classNames.bind(style);
  return (
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
  )
}