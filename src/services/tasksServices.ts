import { Service } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { TaskModel } from "src/models/taskModel";


@Service()
export class TasksServices {
    private readonly tasks: TaskModel[] = [];

    create(task: TaskModel) {
        this.tasks.push(task);
        return `task ${task} was successfully created`
    }

    findAll(): TaskModel[] {
        return this.tasks;
    }
    findOne(name: string): TaskModel {
        return this.tasks.filter(task => task.name === name)[0]
    }
    update(name: string, body: TaskModel): TaskModel {
        return this.tasks
            .splice(this.tasks
                .indexOf(this.tasks
                    .filter(task => task.name === name)[0]), 1, body)[0]
    }
    delete(name: string): string {
        const result = this.tasks
            .splice(this.tasks
                .indexOf(this.tasks
                    .filter(task => task.name === name)[0]), 1)
        console.log(`task ${result[0].name} was successfully deleted`);
        return `task ${result[0].name} was successfully deleted `

        // const task =  this.tasks.filter(task => task.name === name)[0]
        // this.tasks.splice(this.tasks.indexOf(task),1)
        // return this.tasks
    }
}