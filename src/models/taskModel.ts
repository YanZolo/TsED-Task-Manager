import { Default, Name, Property } from '@tsed/schema'
import { Model, Trim, Unique } from "@tsed/mongoose";

@Model()
export class TaskModel {
    @Property()
    @Unique()
    @Trim()
    name: string;

    @Property()
    @Default(false)
    completed: boolean;
}