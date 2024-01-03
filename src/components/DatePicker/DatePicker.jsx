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
  getDaysInMonth
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
import { MonthSelector } from "./subcomponents/MonthSelector.jsx"
import { WeekDaySelector } from "./subcomponents/WeekDaySelector.jsx";

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
  while (iterate < getDaysInMonth(today) + DayOfWeekMonthStart - 1) {
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

  
  const sx = classNames.bind(style);
  // TODO: refactor 2nd and 3rd row to its own subcomponent
  // TODO: Make sure that the animation between week and day container is in sync
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
            <MonthSelector nowYear={nowYear} today={today} nowFormatMonth={nowFormatMonth} globalDate={globalDate} setDate={setDate}/>
            <WeekDaySelector nowDay={nowDay} nowFormatMonth={nowFormatMonth} nowYear={nowYear} today={today} globalDate={globalDate} globalDateWithoutTime={globalDateWithoutTime} ArrayOfDay={ArrayOfDay} ArrayWeek={ArrayWeek}/>
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
