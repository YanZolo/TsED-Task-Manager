import { Req, Request, BodyParams, Post } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { Returns } from "@tsed/schema";
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
}
