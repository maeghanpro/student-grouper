import getNodeEnv from "../../config/getNodeEnv.js";

(async () => {
  if (getNodeEnv() === "test") {
    // development specific middlewares here
    const { default: dotenv } = await import("dotenv");
    await dotenv.config();
  }
})()
