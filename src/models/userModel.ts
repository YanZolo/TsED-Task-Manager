import { CollectionOf, Default, Description, Example, Groups, MinLength, Property, Required, RequiredGroups } from "@tsed/schema";
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
  @Required()
  @MinLength(3)
  @Example("john doe")
  username: string;

  @Unique()
  @Required()
  @RequiredGroups("!patch")
  email: string;

  @Ref(() => TaskModel)
  @CollectionOf(() => TaskModel)
  tasks?: Ref<TaskModel>[];
}
