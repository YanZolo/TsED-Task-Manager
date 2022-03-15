import { Service } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { TaskModel } from "src/models/taskModel";


@Service()
export class TasksService {
    private readonly tasks: TaskModel[] = [];

    create(task: TaskModel) {
        this.tasks.push(task);
    }

    findAll(): TaskModel[] {
        return this.tasks;
    }
    findOne(name: string): TaskModel {
        return this.tasks.filter(task => task.name === name)[0]
    }
    delete(name: string): TaskModel[] {
        return this.tasks
            .splice(this.tasks
                .indexOf(this.tasks
                    .filter(task => task.name === name)[0]), 1)
        // const task =  this.tasks.filter(task => task.name === name)[0]
        // this.tasks.splice(this.tasks.indexOf(task),1)
        // return this.tasks
    }
}