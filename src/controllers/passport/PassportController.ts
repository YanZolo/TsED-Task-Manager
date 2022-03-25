import { Req, Request, BodyParams, Post } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Authenticate } from "@tsed/passport";
import { Returns } from "@tsed/schema";
import { Credentials } from "src/models/credential";
import { User } from "src/models/User";

@Controller("/auth")
export class PassportController {
  @Post("/login")
  @Authenticate("login", { failWithError: false })
  @Returns(200, User)
  @Returns(200).Description("Validation error")
  login(@Req() req: Request, @BodyParams() credentials: Credentials) {
    return req.user;
  }

  // @Post("/reqister")
  // @Returns(201, User)
  // @Authenticate("register")
}
