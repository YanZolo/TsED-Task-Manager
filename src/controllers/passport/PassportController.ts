import { Req, Request, BodyParams, Post, Res } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Authenticate, Authorize } from "@tsed/passport";
import { Delete, Returns } from "@tsed/schema";
import { Credentials } from "src/models/credential";
import { User } from "src/models/User";
import { UserCreation } from "src/models/UserCreation";

@Controller("/auth")
export class PassportController {
  @Post("/login")
  @Authenticate("login", { failWithError: false })
  @Returns(200, User)
  @Returns(400).Description("Validation error")
  login(@Req() req: Request, @BodyParams() credentials: Credentials) {
    return req.user;
  }
  @Post("/register")
  @Returns(201, User)
  @Authenticate("register")
  signup(@Req() req: Req, @BodyParams() user: UserCreation) {
    return req.user;
  }

  @Delete("/logout")
  @Returns(204)
  logout(@Req() req: Req, @Res() res: Res) {
    req.user = "";
    res.cookie("connect.sid", "", { maxAge: 0 });
    res.redirect("/login");
  }
}
