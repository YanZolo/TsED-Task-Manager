import { Inject, Injectable } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { TaskModel } from "src/models/taskModel";

@Injectable()
export class TasksServices {
  @Inject(TaskModel) private readonly model: MongooseModel<TaskModel>;

  async create(task: TaskModel) {
    const newTask = new this.model(task);
    await newTask.save();
    console.log(`task: ${task.name}\n completed: ${task.completed}`);
    return newTask;
  }

  async findAll(): Promise<TaskModel[]> {
    const tasks = await this.model.find();
    console.table(tasks);
    return tasks;
  }

  async findOne(id: string): Promise<TaskModel | any> {
    const task = await this.model.findById(id);
    
    if (task) {
      return task;
    }
    
    throw new NotFound("Task not found");
  }

  async update(id: string, task: TaskModel) {
    return this.model.findByIdAndUpdate(id, task, {new: true, upsert: false});
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.model.deleteOne({ _id: id });
  }
}
