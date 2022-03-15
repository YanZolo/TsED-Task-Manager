import { Controller } from "@tsed/di";
import { Delete, Description, Get, Patch, Post, Returns, string } from "@tsed/schema";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { TaskModel } from '../../models/taskModel';
import { TasksServices } from "src/services/tasksServices";
import { Request } from "express";
import { Req } from "@tsed/common";


@Controller("/tasks")
export class TasksControllerController {
  constructor(private readonly tasksService: TasksServices) { }

  @Get("/")
  @Returns(200, Array).Of(TaskModel)
  @Description("return all tasks from database")
  async getAllTasks(): Promise<TaskModel[]> {
    return this.tasksService.findAll();
  }

  @Get("/:name")
  @Returns(200)
  async getTask(
    @PathParams("name")
    @QueryParams("search")
    @Description("Search keyword and return the task in database that match the given name")
    name: string
  ) {
    return this.tasksService.findOne(name);
  }

  @Post("/")
  @Returns(201)
  @Description("add new task in database")
  async addTask(@BodyParams("task") task: TaskModel): Promise<string> {
    console.log(`task: ${task.name}\n completed: ${task.completed}`);
    return this.tasksService.create(task);
  }

  @Patch("/:name")
  @Returns(200)
  async updateTask(
    @PathParams("name")
    @BodyParams("task")
    @Description("find by id a task in database and update it")
    name: string, task: TaskModel
  ) {
    return this.tasksService.update(name, task)
  }

  @Delete("/:name")
  async deleteTask(
    @PathParams("name")
    @Description("find by name and delete task")
    name : string
  ): Promise<string> {
    return this.tasksService.delete(name)
  }
}
