const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

// =======================
// GET COMMENTS
// =======================
router.get("/", async (req, res) => {
  const { eventId } = req.query;

  if (!eventId) {
    return res.status(400).json({ message: "eventId required" });
  }

  try {
    const comments = await Comment.find({ eventId })
      .populate("userID", "username")
      .lean();

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//POST
router.post("/", auth, async (req, res) => {
  try {
    const { eventId, comment } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const newComment = await Comment.create({
      eventId,
      comment,
      userID: req.user.id,
    });

    const populated = await newComment.populate("userID", "username");

    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
// =======================
// DELETE COMMENT
// =======================
router.delete("/:id", auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Not found" });
  }

  if (comment.userID.toString() !== req.user.id) {
    return res.status(403).json({ message: "No permission" });
  }

  await comment.deleteOne();

  res.json({ message: "Deleted" });
});

module.exports = router;