import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createTask) // Create a new task, protected route
    .get(protect, getTasks); // Get all tasks, protected route

router.route('/:id')
    .get(protect, getTaskById) // Get a task by ID, protected route
    .put(protect, updateTask) // Update a task by ID, protected route
    .delete(protect, deleteTask); // Delete a task by ID, protected route

export default router;