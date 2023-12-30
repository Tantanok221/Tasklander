import React from "react";
import {
  getWeek,
  getDay,
  getYear,
  getWeekOfMonth,
  startOfMonth,
  getDate,
  getMonth,
  getQuarter,
  format,
  eachDayOfInterval,
  getDaysInMonth,
  eachWeekOfInterval,
  getWeeksInMonth,
  getDayOfYear,
} from "date-fns";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import style from "./style.module.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import classNames from 'classnames/bind';



const DatePicker = ({ globalDate, setGlobalDate }) => {
  const [today, setDate] = React.useState(new Date());
  const nowDay = getDate(today);
  const nowWeek = getWeek(today, { weekStartsOn: 1}); 
  const nowWeekOfStartMonth = getWeek(startOfMonth(today), { weekStartsOn: 1}); // Unsure: Might cause bug, im not sure
  const nowWeekOfMonth = getWeekOfMonth(today);
  const nowFormatMonth = format(today, "MMMM");
  const nowYear = getYear(today);
  const AllOfThisYear = eachDayOfInterval({
    start: new Date(nowYear, 0, 1),
    end: new Date(nowYear, 11, 31),
  });
  const weekInMonth = getWeeksInMonth(today);
  const todayIndex = getDayOfYear(today) - 1;
  const StartOfThisMonthIndex = todayIndex - nowDay + 1;
  const totalDate = getDaysInMonth(today);
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
  let ArrayOfQuater = ["Q1", "Q2", "Q3", "Q4"];
  let WeekRow = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const sx = classNames.bind(style)
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
        <div className={sx("row")}>
          <FaAngleLeft
            className={style.icon}
            onClick={() => {
              setDate(
                new Date(getYear(today) - 1, getMonth(today), getDate(today))
              );
            }}
          />
          <ToggleGroup.Item value={nowYear} className={sx("button")}>
            <div
              className={sx("highlight","clickable","text")}
            >
              {nowYear}
            </div>
          </ToggleGroup.Item>
          {ArrayOfQuater.map((item, index) => {
            return (
              <ToggleGroup.Item
                key={index}
                value={nowYear + " " + item}
                className={sx("button")}
              >
                <div
                  className={sx("quater","text","clickable")}
                >
                  {item}
                </div>
              </ToggleGroup.Item>
            );
          })}
          <FaAngleRight
            className={sx("icon")}
            onClick={() => {
              setDate(
                new Date(getYear(today) + 1, getMonth(today), getDate(today))
              );
            }}
          />
        </div>
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
            className={sx("button")}
          >
            <div
              className={sx("highlight","clickable","text")}
            >
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
            <div className={sx("text","gray")}>WEEKS</div>
            {ArrayWeek.map((item, index) => {
              return (
                <ToggleGroup.Item
                  value={nowYear + " W" + item}
                  key={index}
                  className={sx("button","textContainer")}
                >
                  <div
                    className={sx("nonHighlight","weekItem","text")}
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
                  <div key={index} className={sx("text","gray")}>
                    {item}
                  </div>
                );
              })}
            </div>
            {ArrayOfDay.map((array, index) => {
              return (
                <div className={sx("dayRow")} key={"dayRow" + index}>
                  {array.map((item, i) => {
                    if (i === 6 || i === 5) {
                      return (
                        <ToggleGroup.Item
                          value={new Date(nowYear, getMonth(today), item)}
                          key={"date" + i}
                          className={sx("button","textContainer","red")}
                        >
                          <div className={sx("gray")}>{item}</div>
                        </ToggleGroup.Item>
                      );
                    }
                    if (item === "")
                      return <div className={sx("textContainer")}></div>;
                    return (
                      <ToggleGroup.Item
                        value={new Date(nowYear, getMonth(today), item)}
                        key={"date" + i}
                        className={sx("button","textContainer")}
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
        <div className={sx("row")}>
          <div
            onClick={() => {
              setGlobalDate(new Date());
            }}
            className={sx("quickSelect")}
          >
            today
          </div>
          <div onClick={() => {
              setGlobalDate(new Date(getYear(new Date()),getMonth(new Date()),getDate(new Date())+1));
            }} className={sx("quickSelect")}>tommorow</div>
          <div onClick={() => {
              setGlobalDate(getYear(new Date()) + " W" + nowWeek);
            }} className={sx("quickSelect")}>this week</div>
        </div>
        <div className={sx("row")}>
          <div className={sx("removeDate")} onClick={() => {
              setGlobalDate("");
          }}>Remove Date</div>
        </div>
      </IconContext.Provider>
    </ToggleGroup.Root>
  );
};

export default DatePicker;
