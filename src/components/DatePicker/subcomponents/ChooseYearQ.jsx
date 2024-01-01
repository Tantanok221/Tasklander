import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import classNames from "classnames/bind";
import style from "../style.module.css";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { getYear, getMonth, getDate } from "date-fns";
import { ToggleItem } from "./ToggleItem.jsx";
import { motion } from "framer-motion";
export const ChooseYearQ = ({ globalDate, nowYear, setDate, today }) => {
  let ArrayOfQuater = ["Q1", "Q2", "Q3", "Q4"];
  const sx = classNames.bind(style);
  return (
    <div className={sx("row")}>
      <motion.div
        className={sx("iconAdjustment", "buttonBorderRadius")}
        whileHover={{ backgroundColor: "var(--onHold)" }}
        whileTap={{scale: 0.8}}
      >
        <FaAngleLeft
          className={sx("icon")}
          onClick={() => {
            setDate(
              new Date(getYear(today) - 1, getMonth(today), getDate(today))
            );
          }}
        />
      </motion.div>
      <ToggleItem
        setting={{
          className: sx("buttonBorderRadius"),
          whileHover: { backgroundColor: "var(--onHold)" },
        }}
        value={nowYear}
        className={sx("button", {
          active: globalDate === nowYear,
        })}
      >
        <div className={sx("highlight", "clickable", "text")}>{nowYear}</div>
      </ToggleItem>
      {ArrayOfQuater.map((item, index) => {
        return (
          <ToggleItem
            setting={{
              className: sx("buttonBorderRadius"),
              whileHover: { backgroundColor: "var(--onHold)" },
            }}
            key={index}
            value={nowYear + " " + item}
            className={sx("button", {
              active: globalDate === nowYear + " " + item,
            })}
          >
            <div className={sx("quater", "text", "clickable")}>{item}</div>
          </ToggleItem>
        );
      })}
      <motion.div
        className={sx("iconAdjustment", "buttonBorderRadius")}
        whileHover={{ backgroundColor: "var(--onHold)" }}
        whileTap={{scale: 0.8}}
      >
        <FaAngleRight
          className={sx("icon")}
          onClick={() => {
            setDate(
              new Date(getYear(today) + 1, getMonth(today), getDate(today))
            );
          }}
        />
      </motion.div>
    </div>
  );
};
