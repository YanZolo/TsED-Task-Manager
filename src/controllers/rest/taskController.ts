import { Controller } from "@tsed/di";
import { Default, Delete, Description, Get, Patch, Post, Property, Returns } from "@tsed/schema";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { Trim, Unique } from "@tsed/mongoose";

class Task {
  @Property()
  @Unique()
  @Trim()
  name: string;

  @Default(false)
  completed: boolean;
}

@Controller("/tasks")
export class UsersController {
  @Get("/")
  @Returns(200, Array).Of(Task)
  @Description("return all tasks from database")
  async getAllTasks(): Promise<Task[]> {
    return [];
  }

  @Get("/:id")
  @Returns(200)
  async getTask(
    @PathParams("id")
    @QueryParams("search")
    @Description("Search keyword and return the task in database that match the given id")
    id: string
  ) {
    return { idRequestedTask: id };
  }

  @Post("/")
  @Returns(201)
  @Description("add new task in database")
  addTask(@BodyParams("task") body: Task): Task {
    console.log("task", body.name);
    return body;
  }

  @Patch("/:id")
  @Returns(200)
  async updateTask(
    @PathParams("id")
    @Description("find by id a task in database and update it")
    id: string
  ) {
    return { idTaskRequestedForUpdating: id };
  }

  @Delete("/:id")
  async deleteTask(
    @PathParams("id")
    @Description("find by id and delete task")
    id: string
  ): Promise<void> {
    console.log("task deleted successfully");
  }
}
