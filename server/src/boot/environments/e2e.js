import getNodeEnv from "../../config/getNodeEnv.js";

(async () => {
  if (getNodeEnv() === "e2e") {
    // development specific middlewares here
    const { default: dotenv } = await import("dotenv");
    await dotenv.config();
  }
})()
