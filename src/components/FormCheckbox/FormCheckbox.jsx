import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import classNames from "classnames/bind";
import style from "./style.module.css";
import { IconContext } from "react-icons";
import { FaCheck } from "react-icons/fa6";
import { useForm } from "../../hooks/useForm";

export const FormCheckbox = () => {
  const sx = classNames.bind(style);
  const flipVisible = useForm((state) => state.flipVisible);
  return (
    <Checkbox.Root
      onCheckedChange={() => {
        flipVisible();
      }}
      className={sx("checkboxContainer")}
    >
      <div className={sx("checkbox")}>
        <Checkbox.Indicator>
          <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
            <FaCheck />
          </IconContext.Provider>
        </Checkbox.Indicator>
      </div>
      <label className={sx("checkboxLabel")}>Show Password</label>
    </Checkbox.Root>
  );
};
