import { Inject, Injectable } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel, ObjectID } from "@tsed/mongoose";
import { TaskModel } from "src/models/taskModel";
import { UserModel } from "src/models/userModel";

@Injectable()
export class TasksServices {
  @Inject(TaskModel) private readonly model: MongooseModel<TaskModel>;
  @Inject(UserModel) private readonly userModel: MongooseModel<UserModel>;

  async create(task: TaskModel) {
    const newTask = new this.model(task);
    await newTask.save(async (err, doc) => {
      if (err) return err;
      const user = await this.userModel.findByIdAndUpdate(
        { _id: doc.userId },
        { $addToSet: { tasks: task } },
        { new: true, upsert: false }
      );
      console.log("user taskservice create() ===> ", user);
    });

    console.log(`task ====> ${task.name}\n completed ========>: ${task.completed}`);
    return task;
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
    return this.model.findByIdAndUpdate(id, task, { new: true, upsert: false });
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.model.deleteOne({ _id: id });
  }
}
