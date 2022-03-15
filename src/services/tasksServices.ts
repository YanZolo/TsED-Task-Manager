import { Service } from "@tsed/di";
import { TaskModel } from "src/models/taskModel";


@Service()
export class TasksServices {
    private readonly tasks: TaskModel[] = [];

    create(task: TaskModel) {
        this.tasks.push(task);
        console.log(`task: ${task.name}\n completed: ${task.completed}`);
        return `task ${task.name} was successfully created`
    }

    findAll(): TaskModel[] {
        console.table(this.tasks)
        return this.tasks;
    }
    findOne(name: string): TaskModel {
        console.log(this.tasks.filter(task => task.name === name)[0])
        return this.tasks.filter(task => task.name === name)[0]
    }
    update(name: string, taskUpdated: TaskModel) {
        const taskBeforeUpdate = this.tasks
            .splice(this.tasks
                .indexOf(this.tasks
                    .filter(task => task.name === name)[0]), 1, taskUpdated)[0]

        console.info("updated from : ", taskBeforeUpdate,". To : ", taskUpdated)

        return `The task was updated successfully from "name: ${taskBeforeUpdate.name}, completed: ${taskBeforeUpdate.completed}" to "name: ${taskUpdated.name}, completed: ${taskUpdated.completed}"`
    }
    delete(name: string): string {
        const taskName = name
        const result = this.tasks
            .splice(this.tasks
                .indexOf(this.tasks
                    .filter(task => task.name === name)[0]), 1)

        console.log(`task "${taskName}" was successfully deleted and completed: ${result[0].completed}`);

        return `task "${taskName}" was ${result[0].completed ? 'completed and' : 'not completed and'} successfully deleted !`
    }
}