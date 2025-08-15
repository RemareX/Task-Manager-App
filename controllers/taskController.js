import Task from "../models/Task.js";

// @desc Create a new task
// @route POST /api/tasks
// @access Private

export const createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;

    try {
        console.log("Creating task:", req.body);
        console.log("User from token", req.user);


        const task = await Task.create({
            user: req.user.id,
            title: title.trim(),
            description: description || "",
            status: status || "Pending",
            dueDate: dueDate && dueDate.trim() !== "" ? new Date(dueDate) : null,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get all tasks for logged-in user
// @route GET /api/tasks
// @access Private
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get a single task by ID
// @route GET /api/tasks/:id
// @access Private
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update a task
// @route PUT /api/tasks/:id
// @access Private
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not Authorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access Private
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not Authorized' })
        };

        await task.deleteOne();
        res.json({ message: 'Task Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};