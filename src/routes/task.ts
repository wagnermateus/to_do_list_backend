import { prisma } from "../lib/prisma";
import { Router } from "express";
import { z } from "express-zod-api";
const taskRoutes = Router();

taskRoutes.get("/task", async (req, res) => {
  try {
    const getTasks = await prisma.task.findMany();
    res.status(200).json(getTasks);
  } catch (error) {
    console.log(error);
  }
});

taskRoutes.post("/task", async (req, res) => {
  const createTaskBody = z.object({
    name: z.string(),
    notes: z.string(),
    place: z.string(),
    startDate: z.dateIn(),
    endDate: z.dateIn(),
  });
  const { name, notes, place, startDate, endDate } = createTaskBody.parse(
    req.body
  );

  try {
    const postTasks = await prisma.task.create({
      data: {
        name,
        notes,
        place,
        startDate,
        endDate,
        done: false,
      },
    });
    res.status(201).json({ postTasks, message: "Task created successfully" });
  } catch (error) {
    console.log(error);
  }
});

taskRoutes.get("/task/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getTaskById = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(getTaskById);
  } catch (error) {
    console.log(error);
  }
});

taskRoutes.patch("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const setTaskDone = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        done: true,
      },
    });
    res.status(201).json({ setTaskDone, message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

taskRoutes.delete("/task/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await prisma.task.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ deleteTask, message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

taskRoutes.put("/task/:id", async (req, res) => {
  const updateTaskBody = z.object({
    name: z.string(),
    notes: z.string(),
    place: z.string(),
    done: z.boolean(),
    startDate: z.dateIn(),
    endDate: z.dateIn(),
  });
  const { name, notes, place, startDate, endDate, done } = updateTaskBody.parse(
    req.body
  );
  const { id } = req.params;

  try {
    const updateTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        name,
        notes,
        place,
        startDate,
        endDate,
        done,
      },
    });
    res.status(200).json({ updateTask, message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
  }
});
export { taskRoutes };
