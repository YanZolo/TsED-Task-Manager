import { Req } from "@tsed/common";
import { Arg, OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { BasicStrategy } from "passport-http";
import { Strategy } from "passport-local";
import { UsersServices } from "src/services/usersServices";

@Protocol({
  name: "basic",
  useStrategy: BasicStrategy,
  settings: {}
})
export class BasicProtocol implements OnVerify, OnInstall {
  constructor(private userService: UsersServices) {}

  async $onVerify(@Req() request: Req, @Arg(0) username: string, @Arg(1) password: string) {
    const user = await this.userService.findOneByEmail({ email: username });

    if (!user) {
      return false;
    }

    if (!user.verifyPassword(password)) {
      return false;
    }
    return user;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
