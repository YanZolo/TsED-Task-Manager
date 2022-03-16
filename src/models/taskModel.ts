import { Default, Description, Example, Groups, MinLength, object, Property, Required, RequiredGroups } from '@tsed/schema'
import { Model, ObjectID, Trim, Unique } from "@tsed/mongoose";

@Model({name: 'tasks'})
export class TaskModel {
    @ObjectID("id")
    @Groups('!create', "!patch")
    _id: string;

    @Property()
    @Unique()
    @Trim()
    @Required()
    @MinLength(3)
    @Example('Le titre de la tache')
    @RequiredGroups("!patch")
    name: string;

    @Default(false)
    @Description('Indique si la tache est terminée ou non')
    completed: boolean;
}