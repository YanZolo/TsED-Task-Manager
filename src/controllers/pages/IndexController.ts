import { Constant, Controller } from "@tsed/di";
import { HeaderParams } from "@tsed/platform-params";
import { View } from "@tsed/platform-views";
import { SwaggerSettings } from "@tsed/swagger";
import { Hidden, Get, Returns } from "@tsed/schema";
import { Req, Res } from "@tsed/common";

@Hidden()
@Controller("/")
export class IndexController {
  @Constant("swagger")
  private swagger: SwaggerSettings[];

  @Get("/")
  @View("swagger.ejs")
  @Returns(200, String).ContentType("text/html")
  get(@HeaderParams("x-forwarded-proto") protocol: string, @HeaderParams("host") host: string) {
    const hostUrl = `${protocol || "http"}://${host}`;

    return {
      BASE_URL: hostUrl,
      docs: this.swagger.map((conf) => {
        return {
          url: hostUrl + conf.path,
          ...conf
        };
      })
    };
  }

  @Get("/login")
  @View("login.ejs")
  @Returns(200, String).ContentType("text/html")
  getLogin() {
    return {
      title: "LOGIN PAGE"
    };
  }
  @Get("/register")
  @View("register.ejs")
  @Returns(200, String).ContentType("text/html")
  getRegister() {
    return {
      title: "REGISTER PAGE"
    };
  }

  @Get("/profile")
  @View("profile.ejs")
  @Returns(200, String).ContentType("text/html")
  getProfile(@Res() res: Res, @Req() req: Req) {
    const user = res.locals.user; // can't retreive user.username maybe i need to use middlware and  locals() decorator
    console.log("getProfile() res.locals ====>", res.locals);
    console.log("getProfile() user ====>", user);
    return {
      title: "REGISTER PAGE",
      user: user
    };
  }
}
