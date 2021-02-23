import React from "react";
import _ from "lodash";

const ErrorList = ({ errors }) => {
  const errorFields = Object.keys(errors);
  if (errorFields.length > 0) {
    let index = 0;
    const listItems = errorFields.map((field) => {
      index++;
      return (
        <li key={index}>
          {_.capitalize(field)} {errors[field]}
        </li>
      );
    });
    return (
      <div className="callout alert form-error-messages">
        <ul>{listItems}</ul>
      </div>
    );
  }
  return "";
};

export default ErrorList;
