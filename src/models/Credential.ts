import { Model } from "@tsed/mongoose";
import { Description, Example, Format, Required } from "@tsed/schema";

@Model({ name: "user" })
export class Credentials {
  @Description("user password")
  @Example("/5hhfO/")
  @Required()
  password: string;

  @Description("user email")
  @Example("john@doe.com")
  @Required()
  @Format("email")
  email: string;
}
