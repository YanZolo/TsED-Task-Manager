import { Controller } from "@tsed/di";
import { Delete, Description, Get, Groups, Patch, Post, Returns } from "@tsed/schema";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { UsersServices } from "src/services/usersServices";
import { ObjectID } from "@tsed/mongoose";
// import { UserModel } from "src/models/userModel";
import { TaskModel } from "src/models/taskModel";
import { UserCreation } from "src/models/UserCreation";
import { User } from "src/models/User";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UsersServices) {}

  @Post("/")
  @Returns(201, UserCreation)
  @Description("add new user in database")
  async createUser(@BodyParams() @Groups("create") user: UserCreation) {
    return this.userService.createUser(user);
  }

  @Get("/")
  @Returns(200, Array).Of(User)
  @Description("return all users from database")
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get("/:id")
  @Returns(200, User)
  @Returns(404)
  async getUser(
    @PathParams("id")
    @ObjectID()
    id: string
  ): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Patch("/:id")
  @Returns(200, User)
  async updateUser(
    @PathParams("id")
    @ObjectID()
    id: string,
    @BodyParams()
    @Groups("patch")
    body: User
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete("/:id")
  @Returns(204)
  @Returns(404)
  async deleteUser(
    @PathParams("id")
    @Description("find by id and delete user")
    @ObjectID()
    id: string
  ) {
    await this.userService.delete(id);
  }

  ///////////////////////////////////// tasks routes

  @Patch("/task/:id")
  @Returns(201, TaskModel)
  @Description("create new task in user database")
  async createTask(
    @PathParams("id")
    @ObjectID()
    id: string,
    @BodyParams()
    @Groups("patch")
    task: TaskModel
  ) {
    return this.userService.createTask(id, task);
  }

  @Patch("/task/:id")
  @Returns(200, TaskModel)
  async updateTask(
    @PathParams("id")
    @ObjectID()
    id: string,
    @BodyParams()
    @Groups("patch")
    task: TaskModel
  ) {
    return this.userService.updateTask(id, task);
  }
}
