import { Request, Response } from "npm:express";
import { db } from "../database.ts";
import { Task } from "../types/tasks.ts";


type TaskRow = {
  id: number;
  title: string;
  description: string | null;
  completed: number;
  created_at: string;
};

//  Helper to convert db row -> task
const mapTask = (t: TaskRow): Task => ({
  id: t.id,
  title: t.title,
  description: t.description ?? undefined,
  completed: Boolean(t.completed),
  created_at: t.created_at,
});



export const getAllTasks = (_req: Request, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM tasks`).all() as TaskRow[];

    const tasks: Task[] = rows.map(mapTask);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err });
  }
};



export const getTaskById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const row = db
      .prepare(`SELECT * FROM tasks WHERE id = ?`)
      .get(id) as TaskRow | undefined;

    if (!row) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(mapTask(row));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task", error: err });
  }
};


export const toggleCompleted = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const row = db
      .prepare(`SELECT completed FROM tasks WHERE id = ?`)
      .get(id) as { completed: number } | undefined;

    if (!row) {
      return res.status(404).json({ message: "Task not found" });
    }

    const newCompleted = row.completed ? 0 : 1;

    db.prepare(
      `UPDATE tasks SET completed = ? WHERE id = ?`
    ).run(newCompleted, id);

    res.json({
      id: Number(id),
      completed: Boolean(newCompleted),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", error: err });
  }
};


export const createTask = (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const result = db
      .prepare(`INSERT INTO tasks (title, description) VALUES (?, ?)`)
      .run(title, description ?? null);

    const row = db
      .prepare(`SELECT * FROM tasks WHERE id = ?`)
      .get(result.lastInsertRowid) as TaskRow;

    res.status(201).json(mapTask(row));
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err });
  }
};