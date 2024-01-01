import React from "react";
import {
  getWeek,
  getDay,
  getYear,
  startOfMonth,
  getDate,
  getMonth,
  format,
  eachDayOfInterval,
  getDayOfYear,
} from "date-fns";
import "./variable.css";
import style from "./style.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import classNames from "classnames/bind";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
//Import Animation
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { animateContainer, animateItem } from "./helper/animate.js";
// Import Components
import QuickSelector from "./subcomponents/QuickSelector.jsx";
import RemoveDate from "./subcomponents/RemoveDate.jsx";
import { ChooseYearQ } from "./subcomponents/ChooseYearQ.jsx";
import { ToggleItem } from "./subcomponents/ToggleItem.jsx";

const DatePicker = ({ globalDate, setGlobalDate }) => {
  const [today, setDate] = React.useState(new Date());
  const nowDay = getDate(today);
  const nowWeek = getWeek(today, { weekStartsOn: 1 });
  const nowWeekOfStartMonth = getWeek(startOfMonth(today), { weekStartsOn: 1 }); // Unsure: Might cause bug, im not sure
  const nowFormatMonth = format(today, "MMMM");
  const nowYear = getYear(today);
  const globalDateWithoutTime =
    typeof globalDate === typeof new Date()
      ? format(globalDate, "yyyy-MM-dd")
      : null;
  const AllOfThisYear = eachDayOfInterval({
    start: new Date(nowYear, 0, 1),
    end: new Date(nowYear, 11, 31),
  });
  const todayIndex = getDayOfYear(today) - 1;
  const StartOfThisMonthIndex = todayIndex - nowDay + 1;

  // DayOfWeek originally 0 represent sunday, 1 represent monday so on and so forth
  let DayOfWeek = getDay(AllOfThisYear[todayIndex]);
  let DayOfWeekMonthStart = getDay(AllOfThisYear[StartOfThisMonthIndex]);
  if (DayOfWeek === 0) DayOfWeek = 7;
  if (DayOfWeekMonthStart === 0) DayOfWeekMonthStart = 7;

  // Iterate is to count total iterate that we have done
  // Iterate2D is to count how many iterate that we have done in 2D array
  // Counter is to count how many time we have insert new number into one array
  let iterate = 0;
  let iterate2D = 0;
  let counter = 0;
  let ArrayOfDay = [[], [], [], [], [], []];
  // Create a 2D array to store all the date of the month
  while (iterate < 31 + DayOfWeekMonthStart - 1) {
    if (iterate < DayOfWeekMonthStart - 1) {
      ArrayOfDay[0].push("");
      iterate++;
      counter++;
      continue;
    }

    ArrayOfDay[iterate2D].push(iterate - DayOfWeekMonthStart + 2);

    iterate++;
    counter++;
    if (counter === 7) {
      iterate2D++;
      counter = 0;
    }
  }
  if (ArrayOfDay[5].length === 0) ArrayOfDay.pop();
  while (ArrayOfDay[ArrayOfDay.length - 1].length < 7) {
    ArrayOfDay[ArrayOfDay.length - 1].push("");
  }
  let ArrayWeek = [];
  for (let i = 0; i < ArrayOfDay.length; i++) {
    ArrayWeek.push(nowWeekOfStartMonth + i);
  }

  let WeekRow = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const sx = classNames.bind(style);
  // TODO: refactor 2nd and 3rd row to its own subcomponent
  return (
    <AnimatePresence>
      <motion.div
        variants={animateContainer}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <ToggleGroup.Root
          type="single"
          value={today}
          className={style.body}
          onValueChange={(value) => {
            setGlobalDate(value);
          }}
        >
          <IconContext.Provider value={{ color: "#686868", size: "1.5rem" }}>
            <motion.div variants={animateItem}>
              <ChooseYearQ
                globalDate={globalDate}
                nowYear={nowYear}
                setDate={setDate}
                today={today}
              />
            </motion.div>
            <motion.div variants={animateItem} className={sx("row")}>
              <motion.div
                className={sx("iconAdjustment", "buttonBorderRadius")}
                whileHover={{ backgroundColor: "var(--onHold)" }}
                whileTap={{scale: 0.8}}
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
              whileTap={{scale: 0.8}}
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
                        className: sx("buttonBorderRadius"),
                        whileHover: { backgroundColor: "var(--onHold)" },
                      }}
                      value={nowYear + " W" + item}
                      key={index}
                      className={sx(
                        "button",
                        "textContainer",
                        "weekRowAdjustment"
                      )}
                    >
                      <motion.div
                      
                        className={sx("nonHighlight", "weekItem", "text", {
                          active: globalDate === nowYear + " W" + item,
                        })}
                      >
                        {"W" + item}
                      </motion.div>{" "}
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
            <motion.div variants={animateItem}>
              <QuickSelector
                nowWeek={nowWeek}
                globalDateWithoutTime={globalDateWithoutTime}
                nowYear={nowYear}
                setDate={setDate}
                setGlobalDate={setGlobalDate}
                globalDate={globalDate}
              />
            </motion.div>
            <motion.div variants={animateItem}>
              <RemoveDate setGlobalDate={setGlobalDate} />
            </motion.div>
          </IconContext.Provider>
        </ToggleGroup.Root>
      </motion.div>
    </AnimatePresence>
  );
};

export default DatePicker;
