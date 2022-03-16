import { Controller } from "@tsed/di";
import { Delete, Description, Get, Groups, Patch, Post, Returns } from "@tsed/schema";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { TaskModel } from "../../models/taskModel";
import { TasksServices } from "../../services/tasksServices";
import { ObjectID } from "@tsed/mongoose";

@Controller("/tasks")
export class TasksControllerController {
  constructor(private readonly tasksService: TasksServices) {}

  @Get("/")
  @Returns(200, Array).Of(TaskModel)
  @Description("return all tasks from database")
  async getAllTasks(): Promise<TaskModel[]> {
    return this.tasksService.findAll();
  }

  @Get("/:id")
  @Returns(200, TaskModel)
  @Returns(404)
  async getTask(
    @PathParams("id")
    @ObjectID()
    id: string
  ): Promise<TaskModel> {
    return this.tasksService.findOne(id);
  }

  @Post("/")
  @Returns(201, TaskModel)
  @Description("add new task in database")
  async addTask(@BodyParams() @Groups('create') task: TaskModel) {
    return this.tasksService.create(task);
  }

  @Patch("/:id")
  @Returns(200, TaskModel)
  async updateTask(
    @PathParams("id")
    @ObjectID()
    id: string,
    @BodyParams()
    @Groups('patch') body: TaskModel
  ) {
    return this.tasksService.update(id, body);
  }

  @Delete("/:id")
  @Returns(204)
  @Returns(404)
  async deleteTask(
    @PathParams("id")
    @Description("find by id and delete task")
    @ObjectID()
    id: string
  ) {
    await this.tasksService.delete(id);
  }
}
