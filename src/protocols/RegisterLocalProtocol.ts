import { Req, BodyParams } from "@tsed/common";
import { OnVerify, Protocol } from "@tsed/passport";
// import {OnInstall} from "@tsed/passport";
import { UserCreation } from "src/models/UserCreation";
import { UsersServices } from "src/services/usersServices";
import { Strategy } from "passport-local";
import { Forbidden } from "@tsed/exceptions";

@Protocol({
  name: "register",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class RegisterLocalProtocol implements OnVerify {
  constructor(private readonly usersService: UsersServices) {}

  async $onVerify(@Req() request: Req, @BodyParams() user: UserCreation) {
    const { email } = user;
    const found = await this.usersService.findOne(email);

    if (found) {
      throw new Forbidden("This email already exist");
    }

    return this.usersService.createUser(user);
  }

  // $OnInstall(strategy: Strategy): void {

  // }
}
