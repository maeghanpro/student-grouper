import addEnvironmentMiddlewares from "./addEnvironmentMiddlewares.js";
import addExpressSession from "./addExpressSession.js";
import addClientMiddlewares from "./addClientMiddlewares.js";
import addPassport from "./addPassport.js";
import addRejectUnauthorizedApiRequest from "./addRejectUnauthorizedApiRequest.js";

const addMiddlewares = async app => {
  addExpressSession(app);
  addPassport(app);
  addRejectUnauthorizedApiRequest(app);
  await addClientMiddlewares(app);
  await addEnvironmentMiddlewares(app);
};



export default addMiddlewares;
