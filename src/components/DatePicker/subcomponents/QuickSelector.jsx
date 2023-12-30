import React from 'react'
import classNames from "classnames/bind";
import style from "../style.module.scss";
import {format,getYear,getDate,getMonth, set} from 'date-fns'
const QuickSelector = ({nowWeek,setDate,setGlobalDate,globalDate,nowYear}) => {
  const sx = classNames.bind(style);
  const globalDateWithoutTime =
    typeof globalDate === typeof new Date()
      ? format(globalDate, "yyyy-MM-dd")
      : null;
  console.log(globalDateWithoutTime)
  return (
    <div className={sx("row")}>
          <div
            onClick={() => {
              setGlobalDate(
                new Date(
                  getYear(new Date()),
                  getMonth(new Date()),
                  getDate(new Date())
                )
              );
              setDate(
                new Date(
                  getYear(new Date()),
                  getMonth(new Date()),
                  getDate(new Date())
                )
              );
              // To avoid having time signature when returning back to GlobalDate
            }}
            className={sx("quickSelect", {
              active:
                globalDateWithoutTime ===
                format(
                  new Date(
                    getYear(new Date()),
                    getMonth(new Date()),
                    getDate(new Date())
                  ),
                  "yyyy-MM-dd"
                ),
            })}
          >
            today
          </div>
          <div
            onClick={() => {
              setGlobalDate(
                new Date(
                  getYear(new Date()),
                  getMonth(new Date()),
                  getDate(new Date()) + 1
                )
              );
              setDate(
                new Date(
                  getYear(new Date()),
                  getMonth(new Date()),
                  getDate(new Date()) + 1
                )
              );
            }}
            className={sx( {
              active:
                globalDateWithoutTime ===
                format(
                  new Date(
                    getYear(new Date()),
                    getMonth(new Date()),
                    getDate(new Date()) + 1
                  ),
                  "yyyy-MM-dd"
                ),
            },"quickSelect")}
          >
            tommorow
          </div>
          <div
            onClick={() => {
              setGlobalDate(getYear(new Date()) + " W" + nowWeek);
              setDate(getYear(new Date()) + " W" + nowWeek);
            }}
            className={sx("quickSelect",  {
              active: globalDate === getYear(new Date()) + " W" + nowWeek,
            })}
          >
            this week
          </div>
        </div>
  )
}

export default QuickSelector