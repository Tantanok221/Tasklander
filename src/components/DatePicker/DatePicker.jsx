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

const DatePicker = () => {
  const today = new Date();
  const nowDay = getDate(today);
  const nowWeek = getWeek(today);
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

  const [date, setDate] = React.useState(today);
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
  let ArrayWeek = [];
  for (let i = 0; i < ArrayOfDay.length; i++) {
    ArrayWeek.push(nowWeek - nowWeekOfMonth + i + 1);
  }
  let ArrayOfQuater = ["Q1", "Q2", "Q3", "Q4"];
  let WeekRow = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  console.log(ArrayWeek, ArrayOfDay);
  return (
    <ToggleGroup.Root
      type="single"
      value={date}
      className={style.body}
      onValueChange={(date) => {
        if (date) setDate(date);
      }}
    >
      <IconContext.Provider value={{ color: "#686868", size: "1.5rem" }}>
        <div className={`${style.row}`}>
          <FaAngleLeft className={style.icon} />
          <ToggleGroup.Item value={nowYear} className={style.button}>
            <div className={`${style.highlight} ${style.text}`}>{nowYear}</div>
          </ToggleGroup.Item>
          {ArrayOfQuater.map((item, index) => {
            return (
              <ToggleGroup.Item
                key={index}
                value={item}
                className={style.button}
              >
                <div className={`${style.nonHighlight} ${style.text}`}>
                  {item}
                </div>
              </ToggleGroup.Item>
            );
          })}
          <FaAngleRight className={style.icon} />
        </div>
        <div className={`${style.row}`}>
          <FaAngleLeft className={style.icon} />
          <ToggleGroup.Item
            value={nowFormatMonth}
            className={`${style.highlight} ${style.text} ${style.button}`}
          >
            {nowFormatMonth}
          </ToggleGroup.Item>
          <FaAngleRight className={style.icon} />
        </div>
        <div className={`${style.row}`}>
          <div className={style.week}>
            <div className={`${style.text} ${style.gray}`}>WEEKS</div>
            {ArrayWeek.map((item, index) => {
              return (
                <ToggleGroup.Item
                  value={"W" + item}
                  key={index}
                  className={`${style.button} ${style.textContainer}`}
                >
                  <div className={`${style.nonHighlight} ${style.text}`}>
                    W{item}
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
                <div className={style.dayRow} key={"dayRow"+index}>
                  {array.map((item, i) => {
                    if(i === 6 || i === 5){
                      return (
                        <ToggleGroup.Item key={"date"+i}className={`${style.button} ${style.textContainer} ${style.red}`}>
                          <div className={`${style.gray}`}>{item}</div>
                        </ToggleGroup.Item>
                      );
                    }
                    return (
                      <ToggleGroup.Item key={"date"+i}className={`${style.button} ${style.textContainer}`}>
                        <div className={`${style.nonHighlight}`}>{item}</div>
                      </ToggleGroup.Item>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </IconContext.Provider>
    </ToggleGroup.Root>
  );
};

export default DatePicker;
