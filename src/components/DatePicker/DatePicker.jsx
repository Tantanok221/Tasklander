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
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import "./variable.css"
import style from "./style.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import classNames from "classnames/bind";
// Import Components
import QuickSelector from "./subcomponents/QuickSelector.jsx";
import RemoveDate from "./subcomponents/RemoveDate.jsx";
import { ChooseYearQ } from "./subcomponents/ChooseYearQ.jsx";
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
    <ToggleGroup.Root
      type="single"
      value={today}
      className={style.body}
      onValueChange={(value) => {
        setGlobalDate(value);
      }}
    >
      <IconContext.Provider value={{ color: "#686868", size: "1.5rem" }}>
        <ChooseYearQ
          globalDate={globalDate}
          nowYear={nowYear}
          setDate={setDate}
          today={today}
        />
        <div className={sx("row")}>
          <FaAngleLeft
            className={sx("icon")}
            onClick={() => {
              setDate(
                new Date(getYear(today), getMonth(today) - 1, getDate(today))
              );
            }}
          />
          <ToggleGroup.Item
            value={nowYear + " " + nowFormatMonth}
            className={sx("button", {
              active: globalDate === nowYear + " " + nowFormatMonth,
            })}
          >
            <div className={sx("highlight", "clickable", "text")}>
              {nowFormatMonth}
            </div>
          </ToggleGroup.Item>
          <FaAngleRight
            onClick={() => {
              setDate(
                new Date(getYear(today), getMonth(today) + 1, getDate(today))
              );
            }}
            className={sx("icon")}
          />
        </div>
        <div className={sx("row")}>
          <div className={sx("week")}>
            <div className={sx("text", "gray")}>WEEKS</div>
            {ArrayWeek.map((item, index) => {
              return (
                <ToggleGroup.Item
                  value={nowYear + " W" + item}
                  key={index}
                  className={sx("button", "textContainer", )}
                >
                  <div
                    className={sx("nonHighlight", "weekItem", "text", {
                      active: globalDate === nowYear + " W" + item,
                    })}
                  >
                    {"W" + item}
                  </div>{" "}
                </ToggleGroup.Item>
              );
            })}
          </div>
          <div className={sx("divider")}></div>
          <div className={sx("day")}>
            <div className={sx("dayRow")}>
              {WeekRow.map((item, index) => {
                return (
                  <div key={index} className={sx("text", "gray")}>
                    {item}
                  </div>
                );
              })}
            </div>
            {ArrayOfDay.map((array, index) => {
              return (
                <div
                  className={sx("dayRow")}
                  key={"dayRow " + nowFormatMonth + nowYear + index}
                >
                  {array.map((item, i) => {
                    if (item === "")
                      return (
                        <div
                          key={"emptyContainer" + nowFormatMonth + nowYear + i}
                          className={sx("textContainer")}
                        ></div>
                      );
                    if (i === 6 || i === 5) {
                      return (
                        <ToggleGroup.Item
                          value={new Date(nowYear, getMonth(today), item)}
                          key={"date " + nowDay + nowFormatMonth + nowYear + i}
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
                        </ToggleGroup.Item>
                      );
                    }
                    return (
                      <ToggleGroup.Item
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
                      </ToggleGroup.Item>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <QuickSelector
          nowWeek={nowWeek}
          globalDateWithoutTime={globalDateWithoutTime}
          nowYear={nowYear}
          setDate={setDate}
          setGlobalDate={setGlobalDate}
          globalDate={globalDate}
        />
        <RemoveDate setGlobalDate={setGlobalDate} />
      </IconContext.Provider>
    </ToggleGroup.Root>
  );
};

export default DatePicker;
