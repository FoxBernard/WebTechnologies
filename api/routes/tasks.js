const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");

// GET TASKS
router.get("/", auth, async function (req, res) {
  try {
    console.log("SESSION USER:", req.session.user);

    const tasks = await Task.find({
      userId: req.session.user.id
    });

    res.json({
      sessionUser: req.session.user,
      tasks
    });
  } catch (err) {
    console.error("GET TASKS ERROR:", err);
    res.status(500).json({
      error: "Can't load tasks",
      details: err.message
    });
  }
});

// CREATE TASK
router.post("/", auth, async function (req, res) {
  try {
    const { title } = req.body;

    if (!title || title.length < 3) {
      return res.status(400).json({
        error: "Title must be at least 3 characters"
      });
    }

    const task = new Task({
      title,
      userId: req.session.user.id
    });

    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE TASK
router.put("/:id", auth, async function (req, res) {
  try {
    const { title } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ error: "Not authorized to update this task" });
    }

    if (title && title.length < 3) {
      return res.status(400).json({
        error: "Title must be at least 3 characters"
      });
    }

    task.title = title || task.title;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE TASK
router.delete("/:id", auth, async function (req, res) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;