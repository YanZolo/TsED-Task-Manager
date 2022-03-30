import { Req, Request, BodyParams, Post, Res } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Authenticate, Authorize } from "@tsed/passport";
import { Delete, Get, Returns } from "@tsed/schema";
import { Credentials } from "src/models/credential";
import { User } from "src/models/User";
import { UserCreation } from "src/models/UserCreation";

@Controller("/auth")
export class PassportController {
  @Post("/login")
  @Authenticate("login", { failWithError: false })
  @Returns(200)
  @Returns(400).Description("Validation error")
  login(@Req() req: Request, @Res() res: Res, @BodyParams() credentials: Credentials) {
    console.log("PassportLogin req.user ====>", req.user);
    req.app.set("user", res.req.user); // using req.app.set for setting and send data
    res.redirect("/profile");
  }
  @Post("/register")
  @Returns(201)
  @Authenticate("register")
  signup(@Req() req: Req, @Res() res: Res, @BodyParams() user: UserCreation) {
    console.log(" register ==> req.user", req.user);
    res.redirect("/login");
  }

  @Get("/logout")
  @Returns(204)
  logout(@Req() req: Req, @Res() res: Res) {
    req.user = "";
    res.cookie("connect.sid", "", { maxAge: 0 });
    res.redirect("/login"); // render login.ejs
    // req.logOut();
    // res.clearCookie('connect.sid', {
    //   path: '/'
    // });
    // req.session.destroy(function (err) {
    //   res.redirect('/login');
    // });
  }
}
