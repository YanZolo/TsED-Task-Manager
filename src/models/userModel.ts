import { CollectionOf, Default, Description, Example, Groups, MinLength, Property, Required, RequiredGroups } from "@tsed/schema";
import { Model, ObjectID, Ref, Trim, Unique } from "@tsed/mongoose";
import { TaskModel } from "./taskModel";
import mongoose from "mongoose";

// export interface Task {
//     name: string;
//     completed: boolean
// }

@Model({ name: "user" })
export class UserModel {
  @ObjectID("id")
  _id: string;
  @Groups("!create", "!patch")
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
  // @Property()
  // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskModel' }]
}
