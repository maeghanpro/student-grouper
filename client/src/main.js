import React from "react";
import { render } from "react-dom";

import RedBox from "redbox-react";
import App from "./components/App";
import config from "./config";

document.addEventListener("DOMContentLoaded", () => {
  const reactElement = document.getElementById("app");

  if (reactElement) {
    if (config.env === "development") {
      try {
        render(<App />, reactElement);
      } catch (e) {
        render(<RedBox error={e} />, reactElement);
      }
    } else {
      render(<App />, reactElement);
    }
  }
});
