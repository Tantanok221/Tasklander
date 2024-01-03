import React from 'react'
import {motion} from "framer-motion"
import classNames from "classnames/bind";
import { ToggleItem } from "./ToggleItem";
import style from "../style.module.css";
import { animateItem } from '../helper/animate';
import { getYear, getMonth, format } from 'date-fns';
export const WeekDaySelector = ({nowDay,nowFormatMonth,ArrayOfDay,ArrayWeek,nowYear,globalDate,today,globalDateWithoutTime}) => {
  const sx = classNames.bind(style);
  let WeekRow = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  return (
    <motion.div variants={animateItem} className={sx("row")}>
              <motion.div
                variants={animateItem}
                // initial="hidden"
                // animate="show"
                className={sx("week")}
              >
                <motion.div className={sx("text", "gray")}>WEEKS</motion.div>
                {ArrayWeek.map((item, index) => {
                  return (
                    <ToggleItem
                      setting={{
                        variants: animateItem,
                        className: sx(
                          "buttonBorderRadius",
                          "weekButtonAdjustment"
                        ),
                        whileHover: { backgroundColor: "var(--onHold)" },
                      }}
                      value={nowYear + " W" + item}
                      key={"W" + item + " " + index}
                      className={sx("button", "textContainer")}
                    >
                      <motion.div
                        className={sx("nonHighlight", "weekItem", "text", {
                          active: globalDate === nowYear + " W" + item,
                        })}
                      >
                        {"W" + item}
                      </motion.div>
                    </ToggleItem>
                  );
                })}
              </motion.div>
              <div className={sx("divider")}></div>
              <motion.div
                // initial="hidden"
                // animate="show"
                className={sx("day")}
              >
                <motion.div variants={animateItem} className={sx("dayRow")}>
                  {WeekRow.map((item, index) => {
                    return (
                      <div key={index} className={sx("text", "gray")}>
                        {item}
                      </div>
                    );
                  })}
                </motion.div>
                {ArrayOfDay.map((array, index) => {
                  return (
                    <motion.div
                      variants={animateItem}
                      className={sx("dayRow")}
                      key={"dayRow " + nowFormatMonth + nowYear + index}
                    >
                      {array.map((item, i) => {
                        if (item === "")
                          return (
                            <div
                              key={
                                "emptyContainer" + nowFormatMonth + nowYear + i
                              }
                              className={sx("textContainer")}
                            ></div>
                          );
                        if (i === 6 || i === 5) {
                          return (
                            <ToggleItem
                              setting={{
                                className: sx("buttonBorderRadius"),
                                whileHover: {
                                  backgroundColor: "var(--onHold)",
                                },
                              }}
                              value={new Date(nowYear, getMonth(today), item)}
                              key={
                                "date " + nowDay + nowFormatMonth + nowYear + i
                              }
                              className={sx("button", "textContainer", "red", {
                                active:
                                  globalDateWithoutTime ===
                                  format(
                                    new Date(nowYear, getMonth(today), item),
                                    "yyyy-MM-dd"
                                  ),
                              })}
                            >
                              <div className={sx("gray")}>{item}</div>
                            </ToggleItem>
                          );
                        }
                        return (
                          <ToggleItem
                            setting={{
                              className: sx("buttonBorderRadius"),
                              whileHover: {
                                backgroundColor: "var(--onHold)",
                              },
                            }}
                            value={new Date(nowYear, getMonth(today), item)}
                            key={
                              "dateNonHighlight " +
                              nowDay +
                              nowFormatMonth +
                              nowYear +
                              i
                            }
                            className={sx("button", "textContainer", {
                              active:
                                globalDateWithoutTime ===
                                format(
                                  new Date(nowYear, getMonth(today), item),
                                  "yyyy-MM-dd"
                                ),
                            })}
                          >
                            <div className={sx("nonHighlight")}>{item}</div>
                          </ToggleItem>
                        );
                      })}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
  )
}
