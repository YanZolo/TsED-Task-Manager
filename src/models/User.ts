import { Model, ObjectID } from "@tsed/mongoose";
import { Description, Groups, Ignore } from "@tsed/schema";
import { UserCreation } from "./UserCreation";

@Model({ name: "user" })
export class User extends UserCreation {
  @ObjectID("id")
  @Description("database given id")
  @Groups("!patch")
  _id: string;

  @Ignore()
  password: string;

  async verifyPassword(password: string) {
    return this.password === password;
  }
}
