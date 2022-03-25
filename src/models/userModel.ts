import {
  CollectionOf,
  Default,
  Description,
  Example,
  Groups,
  MaxLength,
  MinLength,
  Property,
  Required,
  RequiredGroups
} from "@tsed/schema";
import { Model, ObjectID, Ref, Trim, Unique } from "@tsed/mongoose";
import { TaskModel } from "./taskModel";

// export interface Task {
//     name: string;
//     completed: boolean
// }

@Model({ name: "user" })
export class UserModel {
  @ObjectID("id")
  @Groups("!create", "!patch")
  _id: string;

  @Property()
  @Trim()
  @MinLength(3)
  @Example("john doe")
  username: string;

  @Unique()
  @Required()
  @RequiredGroups("!patch")
  @Example("john@doe.com")
  email: string;

  @Required()
  @MinLength(4)
  @MaxLength(10)
  password: string;

  verifyPassword(password: string) {
    return this.password === password;
  }

  // @Ref(() => TaskModel)
  // @CollectionOf(() => TaskModel)
  // tasks?: Ref<TaskModel>[];
}
