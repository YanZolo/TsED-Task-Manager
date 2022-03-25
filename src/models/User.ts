import { Model } from "@tsed/mongoose";
import { Description, Ignore } from "@tsed/schema";
import { UserCreation } from "./UserCreation";

@Model({ name: "user" })
export class User extends UserCreation {
  @Description("database given id")
  _id: string;

  @Ignore()
  password: string;

  verifyPassword(password: string) {
    return this.password === password;
  }
}
