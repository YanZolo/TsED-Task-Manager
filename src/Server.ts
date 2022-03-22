import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/mongoose";
import "@tsed/passport";
import { config } from "./config";
import * as rest from "./controllers/rest";
import * as pages from "./controllers/pages";
import session from "express-session";
import { TaskModel } from "./models/taskModel";
const rootDir = __dirname;
@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8080,
  httpsPort: false, // CHANGE
  componentsScan: [`${rootDir}/protocols/*.ts`],
  passeport: {
    taskModel: TaskModel
  },
  mount: {
    "/rest": [...Object.values(rest)],
    "/": [...Object.values(pages)]
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1"
    }
  ],
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),
    session({
      secret: "mysecretkey",
      resave: true,
      saveUninitialized: true,
      // maxAge: 3600,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: undefined
      }
    })
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: ["**/*.spec.ts"]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
