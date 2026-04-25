const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// =======================
// GET ALL EVENTS
// =======================
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// CREATE EVENT
// =======================
router.post("/", async (req, res) => {
  try {
    console.log("CREATE EVENT HIT");

    const { title, description } = req.body;

    const newEvent = await Event.create({
      title,
      description,

      // SAFE: only if session exists
      createdBy: req.session?.user?._id || null,
    });

    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// GET SINGLE EVENT
// =======================
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;