// import { Req, Request, BodyParams } from "@tsed/common";
// import { UserCreation } from "src/models/UserCreation";
// import { UsersServices } from "src/services/usersServices";
import { IStrategyOptions, Strategy } from "passport-local";
import { OnInstall, OnVerify, Protocol, BeforeInstall } from "@tsed/passport";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class RegisterLocalProtocol {}
// export class RegisterLocalProtocol implements OnVerify, BeforeInstall, OnInstall {
//     constructor(private readonly usersService: UsersServices) {}

//    async $BeforeInstall(settings: IStrategyOptions): Promise<IStrategyOptions> {
//         return settings
//     }
//     $OnInstall(strategy: Strategy) : void {
//      return console.log("onInstall")
//    }

//    async $Onverify(@Req() req: Request, @BodyParams() userCreation: UserCreation) {
//     return console.log("onVerify")
//    }

// }
