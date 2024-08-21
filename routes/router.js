const express = require('express');
const router = express.Router();
const Task = require('../models/taskSchema');

// Route to add a new task
router.post("/add-task", async (req, res) => {
    try {
        const { taskname, taskDesc, startDate, endDate, timeToComplete, task_status } = req.body;

        if (!taskname || !taskDesc || !startDate || !endDate || !timeToComplete) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const task = new Task({ taskname, taskDesc, startDate, endDate, timeToComplete, task_status });
        const saveTask = await task.save();

        res.status(201).json({
            message: "Task added successfully",
            task: saveTask
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get all tasks
router.get('/get-tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.send(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route to get a single task by ID
router.get('/get-task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById({ _id: id });
        res.status(201).json(task);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route to update a task
router.put('/edit-task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { taskname, taskDesc, startDate, endDate, timeToComplete, task_status } = req.body;

        const updatedTask = {};
        if (taskname) updatedTask.taskname = taskname;
        if (taskDesc) updatedTask.taskDesc = taskDesc;
        if (startDate) updatedTask.startDate = startDate;
        if (endDate) updatedTask.endDate = endDate;
        if (timeToComplete) updatedTask.timeToComplete = timeToComplete;
        if (task_status) updatedTask.task_status = task_status;

        let task = await Task.findById({ _id: id });
        if (!task) {
            return res.status(404).send("Task not found");
        }

        task = await Task.findByIdAndUpdate(id, { $set: updatedTask }, { new: true });
        res.json({ task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route to delete a single task
router.delete('/delete-task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let task = await Task.findById({ _id: id });
        if (!task) {
            return res.status(404).send("Task not found");
        }

        task = await Task.findByIdAndDelete(id);
        res.json({ "Success": "Task has been deleted", task: task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route to delete all tasks
router.delete('/delete-all-tasks', async (req, res) => {
    try {
        const result = await Task.deleteMany({});
        res.send({ message: "All tasks deleted successfully", result });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
