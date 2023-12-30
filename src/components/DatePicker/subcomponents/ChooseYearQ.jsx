import React from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import classNames from "classnames/bind";
import style from "../style.module.scss";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {getYear,getMonth,getDate} from "date-fns"
export const ChooseYearQ = ({globalDate,nowYear,setDate,today}) => {
  let ArrayOfQuater = ["Q1", "Q2", "Q3", "Q4"];
  const sx = classNames.bind(style);
  return (
    <div className={sx("row")}>
          <FaAngleLeft
            className={sx("icon")}
            onClick={() => {
              setDate(
                new Date(getYear(today) - 1, getMonth(today), getDate(today))
              );
            }}
          />
          <ToggleGroup.Item value={nowYear} className={sx("button", {
                  active: globalDate === nowYear,
                } )}>
            <div className={sx("highlight", "clickable", "text")}>
              {nowYear}
            </div>
          </ToggleGroup.Item>
          {ArrayOfQuater.map((item, index) => {
            return (
              <ToggleGroup.Item
                key={index}
                value={nowYear + " " + item}
                className={sx("button", {
                  active: globalDate === nowYear + " " + item,
                })}
              >
                <div className={sx("quater", "text", "clickable")}>{item}</div>
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
  )
}
