import React from "react";
import classNames from "classnames/bind";
import style from "../style.module.css";
import { format, getYear, getDate, getMonth, getWeek } from "date-fns";
import { motion } from "framer-motion";
const QuickSelector = ({ nowWeek, setDate, setGlobalDate, globalDate }) => {
  const sx = classNames.bind(style);
  const globalDateWithoutTime =
    typeof globalDate === typeof new Date()
      ? format(globalDate, "yyyy-MM-dd")
      : null;
  const todayWithoutTime = new Date(
    getYear(new Date()),
    getMonth(new Date()),
    getDate(new Date())
  );
  const tommorowWithoutTime = new Date(
    getYear(new Date()),
    getMonth(new Date()),
    getDate(new Date()) + 1
  );
  return (
    <div className={sx("row")}>
      <motion.div
        className={sx("buttonBorderRadius")}
        whileHover={{ backgroundColor: "var(--onHold)" }}
      >
        <div
          onClick={() => {
            setGlobalDate(todayWithoutTime);
            setDate(todayWithoutTime);
            // To avoid having time signature when returning back to GlobalDate
          }}
          className={sx("quickSelect", {
            active:
              globalDateWithoutTime === format(todayWithoutTime, "yyyy-MM-dd"),
          })}
        >
          today
        </div>
      </motion.div>
      <motion.div
        className={sx("buttonBorderRadius")}
        whileHover={{ backgroundColor: "var(--onHold)" }}
      >
        <div
          onClick={() => {
            setGlobalDate(tommorowWithoutTime);
            setDate(tommorowWithoutTime);
          }}
          className={sx(
            {
              active:
                globalDateWithoutTime ===
                format(tommorowWithoutTime, "yyyy-MM-dd"),
            },
            "quickSelect"
          )}
        >
          tommorow
        </div>
      </motion.div>
      <motion.div
        className={sx("buttonBorderRadius")}
        whileHover={{ backgroundColor: "var(--onHold)" }}
      >
        <div
          onClick={() => {
            setGlobalDate(
              getYear(new Date()) +
                " W" +
                getWeek(new Date(), { weekStartsOn: 1 })
            );
            setDate(new Date()); // To go back to today at the UI, will cause data desynced between GlobalDate and today
          }}
          className={sx("quickSelect", {
            active: globalDate === getYear(new Date()) + " W" + nowWeek,
          })}
        >
          this week
        </div>
      </motion.div>
    </div>
  );
};

export default QuickSelector;
