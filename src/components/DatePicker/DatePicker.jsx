import React from "react";
import { getWeek, getYear } from "date-fns";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import style from "./style.module.scss"
import { FaAngleLeft,FaAngleRight } from "react-icons/fa";

const DatePicker = () => {
  const year = getYear(new Date());
  const today = getWeek(new Date());
  const [date, setDate] = React.useState(today);
  let Quater = ["Q1", "Q2", "Q3", "Q4"]
  return (
    <ToggleGroup.Root
      type="single"
      value={date}
      onValueChange={(date) => {
        if (date) setDate(date);
      }}
    >
      <div className={style.row1}>
      <FaAngleLeft/>
      <ToggleGroup.Item value={year}>
        <div className={style.highlight} >{year}</div>
      </ToggleGroup.Item>
      {Quater.map((item, index) => {
        return(
          <ToggleGroup.Item value={item}>
            <div className={style.nonHighlight} >{item}</div>
          </ToggleGroup.Item>

        )
      })}
      <FaAngleRight/>
      </div>
    </ToggleGroup.Root>
  );
};

export default DatePicker;
