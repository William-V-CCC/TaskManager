import { Router } from "npm:express";
import {
  getAllTasks,
  getTaskById,
  toggleCompleted,
  createTask
} from "../controllers/tasks.controller.ts";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: "Finish project"
 *                 description: "Stop procrastinating"
 *                 completed: false
 *                 created_at: "2026-03-25T10:00:00Z"
 */
router.get("/", getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /tasks/{id}/toggle:
 *   put:
 *     summary: Toggle task completion status
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task completion toggled
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               completed: true
 *       404:
 *         description: Task not found
 */
router.put("/:id/toggle", toggleCompleted);
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Finish project"
 *             description: "Try to stay focused for once"
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: "Finish project"
 *               description: "Try to stay focused for once"
 *               completed: false
 *               created_at: "2026-03-25T10:00:00Z"
 *       500:
 *         description: Failed to create task
 */
router.post("/", createTask);
export default router;