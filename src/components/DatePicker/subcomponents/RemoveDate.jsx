import React from "react";
import style from "../style.module.scss";
import classNames from "classnames/bind";

const RemoveDate = ({setGlobalDate}) => {
  const sx = classNames.bind(style);
  return (
    <div className={sx("row")}>
      <div
        className={sx("removeDate")}
        onClick={() => {
          setGlobalDate("");
        }}
      >
        Remove Date
      </div>
    </div>
  );
};

export default RemoveDate;
