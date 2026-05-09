const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE EVENT
router.post("/", async (req, res) => {
  try {
    const { title, description, location, venue, date, hostID } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      location,
      venue,
      hostID,
      date: {
        start: date.start,
        end: date.end
      }
    });

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE EVENT
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