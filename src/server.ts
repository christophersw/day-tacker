/*
 * Day Tracker Server Setup
 */
import {getLogger, setGlobalLogLevel} from "log4js";
import {get} from "config";
import * as xpress from "express";

setGlobalLogLevel(get<string>("LOG_LEVEL") || "INFO");
let logger = getLogger("Server");
let app = xpress();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(get<string>("PORT") || 9000, function () {
  logger.info('Example app listening on %s!', get<string>("PORT"));
});