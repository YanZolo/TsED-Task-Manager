import { Model } from "@tsed/mongoose";
import { Description, Required } from "@tsed/schema";
import { Credentials } from "./credential";

@Model({ name: "user" })
export class UserCreation extends Credentials {
  @Description("user first name")
  @Required()
  username: string;
}
