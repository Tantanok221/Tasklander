import React from "react";
import { getWeek, getYear, getMonth, getQuarter,format } from "date-fns";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import style from "./style.module.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IconContext } from "react-icons";

const DatePicker = () => {
  const today = new Date();
  const week = getWeek(today);
  const month = format(today, "MMMM")
  const year = getYear(today);
  const quater = getQuarter(today)
  const [date, setDate] = React.useState(week);
  let Quater = ["Q1", "Q2", "Q3", "Q4"];
  let nowWeekArray = [];
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
          <ToggleGroup.Item value={year} className={style.button}>
            <div className={`${style.highlight} ${style.text}`}>{year}</div>
          </ToggleGroup.Item>
          {Quater.map((item, index) => {
            return (
              <ToggleGroup.Item value={item} className={style.button}>
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
          <div className={`${style.highlight} ${style.text}`}>{month}</div>
          <FaAngleRight className={style.icon} />
        </div>
        <div className={style.row}>
          <div className={style.week}>
            <div className={`${style.gray} ${style.text}`}>WEEKS</div>
          </div>
          <div className={style.day}></div>
        </div>
      </IconContext.Provider>
    </ToggleGroup.Root>
  );
};

export default DatePicker;
