import { Application } from "express";

const port = process.env.PORT_NUMBER || 3001;
const startServer = (app: Application) => {
  app.listen(port, () => {
    console.log(` server started at port number ${port}`);
  });
};
export default startServer;
