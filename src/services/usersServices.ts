import { Inject, Injectable } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { MongooseModel } from "@tsed/mongoose";
import { TaskModel } from "src/models/taskModel";
import { UserModel } from "src/models/userModel";

@Injectable()
export class UserServices {
  @Inject(UserModel) private readonly model: MongooseModel<UserModel>;

  async createUser(user: UserModel) {
    const newUser = new this.model(user);
    await newUser.save();
    console.log(`user: ${user.username}`);

    return newUser;
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.model.find();
    console.table(users);
    return users;
  }

  async findOne(id: string): Promise<UserModel | any> {
    const user = await this.model.findById(id);

    if (user) {
      return user;
    }

    throw new NotFound("User not found");
  }

  async updateUser(id: string, user: UserModel) {
    return this.model.findByIdAndUpdate(id, user, { new: true, upsert: false });
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.model.deleteOne({ _id: id });
  }

  //////////////////////////  tasks services

  async createTask(id: string, task: TaskModel) {
    const user = await this.model.findByIdAndUpdate({ _id: id }, { $addToSet: { tasks: task } }, { new: true, upsert: false });

    return user;
  }
  async updateTask(id: string, task: TaskModel) {
    return this.model.findByIdAndUpdate(id, {}, { new: true, upsert: false });
  }
}
