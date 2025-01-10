require("dotenv").config();
import express from "express";
import config from "config";
import db from "../config/db";
import Logger from "../config/logger";
import router from "./router";
import morganMiddleware from "./middlewares/morgan.middleware";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morganMiddleware);
app.use("/", router);

const port = config.get<Number>("port");

app.listen(port, async () => {
  await db();
  Logger.info(`O servidor está rodando na porta ${port}`);
});
