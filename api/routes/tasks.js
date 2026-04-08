const express = require("express")
const router = express.Router()

const Task = require("../models/Task")
const auth = require("../middleware/auth")


// GET TASKS
router.get("/", auth, async function (req, res) {
  try {
    // Find all tasks that belong to the logged-in user (using userId from session)
    const tasks = await Task.find({
      userId: req.session.userId
    });
    res.json(tasks)

  } catch (err) {
    res.status(500).json({ error: "Can't load tasks" })
  }
});


// CREATE TASK
router.post("/", auth, async function (req, res) {
  try {
    const { title } = req.body

    if (!title || title.length < 3) {
      return res.status(400).json({
        error: "Title must be at least 3 characters"
      })
    }

    const task = new Task({
      title,
      userId: req.session.userId
    })

    await task.save()

    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
});


// UPDATE TASK
router.put("/:id", auth, async function (req, res) {
  try {

  const { title } = req.body
  const task = await Task.findById(req.params.id) 

  task.title = title || task.title

  await task.save()

  res.json(task)
  
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
});


// DELETE TASK
router.delete("/:id", auth, async function (req, res) {
  try {

  await Task.findByIdAndDelete(req.params.id)

  res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
