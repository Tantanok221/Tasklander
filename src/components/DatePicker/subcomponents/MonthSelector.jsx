import React from 'react'
import {motion} from "framer-motion"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import classNames from "classnames/bind";
import { ToggleItem } from "./ToggleItem";
import style from "../style.module.css";
import { animateItem } from '../helper/animate';
import { getYear, getMonth, getDate } from 'date-fns';
export const MonthSelector = ({today,setDate,globalDate,nowYear,nowFormatMonth}) => {
  const sx = classNames.bind(style);
  return (
    <motion.div variants={animateItem} className={sx("row")}>
              <motion.div
                className={sx("iconAdjustment", "buttonBorderRadius")}
                whileHover={{ backgroundColor: "var(--onHold)" }}
                whileTap={{ scale: 0.8 }}
              >
                <FaAngleLeft
                  className={sx("icon")}
                  onClick={() => {
                    setDate(
                      new Date(
                        getYear(today),
                        getMonth(today) - 1,
                        getDate(today)
                      )
                    );
                  }}
                />
              </motion.div>
              <ToggleItem
                setting={{
                  className: sx("buttonBorderRadius"),
                  whileHover: { backgroundColor: "var(--onHold)" },
                }}
                value={nowYear + " " + nowFormatMonth}
                className={sx("button", {
                  active: globalDate === nowYear + " " + nowFormatMonth,
                })}
              >
                <div className={sx("highlight", "clickable", "text")}>
                  {nowFormatMonth}
                </div>
              </ToggleItem>
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={sx("iconAdjustment", "buttonBorderRadius")}
                whileHover={{ backgroundColor: "var(--onHold)" }}
              >
                <FaAngleRight
                  onClick={() => {
                    setDate(
                      new Date(
                        getYear(today),
                        getMonth(today) + 1,
                        getDate(today)
                      )
                    );
                  }}
                  className={sx("icon")}
                />
              </motion.div>
            </motion.div>
  )
}
