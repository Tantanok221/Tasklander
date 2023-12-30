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
        <div className={`${style.row}`}>
          <FaAngleLeft
            className={style.icon}
            onClick={() => {
              setDate(
                new Date(getYear(today) - 1, getMonth(today), getDate(today))
              );
            }}
          />
          <ToggleGroup.Item value={nowYear} className={style.button}>
            <div
              className={`${style.highlight} ${style.clickable} ${style.text}`}
            >
              {nowYear}
            </div>
          </ToggleGroup.Item>
          {ArrayOfQuater.map((item, index) => {
            return (
              <ToggleGroup.Item
                key={index}
                value={nowYear + " " + item}
                className={style.button}
              >
                <div
                  className={`${style.text} ${style.clickable} ${style.quater} `}
                >
                  {item}
                </div>
              </ToggleGroup.Item>
            );
          })}
          <FaAngleRight
            className={style.icon}
            onClick={() => {
              setDate(
                new Date(getYear(today) + 1, getMonth(today), getDate(today))
              );
            }}
          />
        </div>
        <div className={`${style.row}`}>
          <FaAngleLeft
            className={style.icon}
            onClick={() => {
              setDate(
                new Date(getYear(today), getMonth(today) - 1, getDate(today))
              );
            }}
          />
          <ToggleGroup.Item
            value={nowYear + " " + nowFormatMonth}
            className={`${style.button}`}
          >
            <div
              className={`${style.highlight} ${style.clickable} ${style.text} `}
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
            className={style.icon}
          />
        </div>
        <div className={`${style.row}`}>
          <div className={style.week}>
            <div className={`${style.text} ${style.gray}`}>WEEKS</div>
            {ArrayWeek.map((item, index) => {
              return (
                <ToggleGroup.Item
                  value={nowYear + " W" + item}
                  key={index}
                  className={`${style.button} ${style.textContainer}`}
                >
                  <div
                    className={`${style.nonHighlight} ${style.weekItem}  ${style.text}`}
                  >
                    {"W" + item}
                  </div>{" "}
                </ToggleGroup.Item>
              );
            })}
          </div>
          <div className={style.divider}></div>
          <div className={style.day}>
            <div className={style.dayRow}>
              {WeekRow.map((item, index) => {
                return (
                  <div key={index} className={`${style.text} ${style.gray}`}>
                    {item}
                  </div>
                );
              })}
            </div>
            {ArrayOfDay.map((array, index) => {
              return (
                <div className={style.dayRow} key={"dayRow" + index}>
                  {array.map((item, i) => {
                    if (i === 6 || i === 5) {
                      return (
                        <ToggleGroup.Item
                          value={new Date(nowYear, getMonth(today), item)}
                          key={"date" + i}
                          className={`${style.button} ${style.textContainer} ${style.red}`}
                        >
                          <div className={`${style.gray}`}>{item}</div>
                        </ToggleGroup.Item>
                      );
                    }
                    if (item === "")
                      return <div className={style.textContainer}></div>;
                    return (
                      <ToggleGroup.Item
                        value={new Date(nowYear, getMonth(today), item)}
                        key={"date" + i}
                        className={`${style.button} ${style.textContainer}`}
                      >
                        <div className={`${style.nonHighlight}`}>{item}</div>
                      </ToggleGroup.Item>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.row}>
          <div
            onClick={() => {
              setGlobalDate(new Date());
            }}
            className={`${style.quickSelect}`}
          >
            today
          </div>
          <div onClick={() => {
              setGlobalDate(new Date(getYear(new Date()),getMonth(new Date()),getDate(new Date())+1));
            }} className={`${style.quickSelect}`}>tommorow</div>
          <div onClick={() => {
              setGlobalDate(getYear(new Date()) + " W" + nowWeek);
            }} className={`${style.quickSelect}`}>this week</div>
        </div>
        <div className={style.row}>
          <div className={style.removeDate} onClick={() => {
              setGlobalDate("");
          }}>Remove Date</div>
        </div>
      </IconContext.Provider>
    </ToggleGroup.Root>
  );
};

export default DatePicker;
