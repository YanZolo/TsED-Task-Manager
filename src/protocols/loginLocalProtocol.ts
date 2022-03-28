import { Req } from "@tsed/common";
import { BodyParams } from "@tsed/platform-params";
import { BeforeInstall, OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { UsersServices } from "../services/usersServices";
import { Inject } from "@tsed/di";
import { Credentials } from "src/models/credential";
import bcrypt from "bcrypt";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify, OnInstall, BeforeInstall {
  @Inject()
  private usersService: UsersServices;

  async $beforeInstall(settings: IStrategyOptions): Promise<IStrategyOptions> {
    // load something from backend
    // settings.usernameField = await this.usersService.loadFieldConfiguration()

    return settings;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;
    const user = await this.usersService.findOneByEmail({ email });
    const decodedPassword = await bcrypt.compare(password, user.password);
    console.log("decodedPassword", decodedPassword, user.password);
    if (!user || !decodedPassword || !user.verifyPassword(password)) {
      return false;
    }
    // if (!user.verifyPassword(password)) {
    //   return false;
    // }
    if (user && decodedPassword) {
      console.log("connected ======>", user);
      return user;
    }
  }
}
