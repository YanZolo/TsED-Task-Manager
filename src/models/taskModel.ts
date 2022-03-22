import { Default, Description, Example, Groups, MinLength, Property, Required, RequiredGroups } from "@tsed/schema";
import { Model, ObjectID, Ref, Trim, Unique } from "@tsed/mongoose";
import { v4 } from "uuid";
import { UserModel } from "./userModel";
@Model({ name: "tasks" })
export class TaskModel {
  // @Default(v4())
  @ObjectID("id")
  @Groups("!create", "!patch")
  id: string;

  @Property()
  @Unique()
  @Trim()
  @Required()
  @MinLength(3)
  @Example("Le titre de la tache")
  @RequiredGroups("!patch")
  name: string;

  @Default(false)
  @Description("Indique si la tache est terminée ou non")
  completed: boolean;

  @Ref(() => TaskModel)
  userId: Ref<UserModel>;
}
