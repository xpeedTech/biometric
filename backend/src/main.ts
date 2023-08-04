/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import chalk from "chalk";
import * as models from "./models";
import bodyParser from "body-parser";
import RequestLogger from "./middleware/RequestLogger";
import router from "./router";
import columnify from "columnify";
import "./lib/logger";
import { _console } from "./lib/logger";

dotenv.config();

const boot = async () => {
    /**
    * App Variables
    */
   
    console.log("-----------------------------------------------------------------------")
    console.info(chalk.blue("Launching Database"));
    await models.init();

    console.log("-----------------------------------------------------------------------")
    console.info(chalk.blue("Registering router"))
    const app = express();

    /**
    *  App Configuration
    */

    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(RequestLogger);

    const endpoints = await router(app);
    _console.log(columnify(endpoints, {
        columnSplitter: ' → ',
        showHeaders: false
    }));
    console.log("Router registered");
    const server = http.createServer(app);

    /**
    * Server Activation
    */
    console.log("-----------------------------------------------------------------------")
    console.info(chalk.blue("Launching server"));
    const port = Number(process.env.PORT || 3001);
    server.listen(port, () => {
        console.log("HTTP Server is listening to port : ", port);
    })

}

boot();