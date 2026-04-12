const express = require("express")
const router = express.Router()
const Comment = require("../models/Comment")
const auth = require("../middleware/auth")

// GET all comments 
router.get("/", auth, async function (req, res) {
    
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }

});

// Create Comment
router.post("/", auth, async function ( req, res ) {

    try {
        const comment = await Comment.create({
            eventID: req.body.eventID,
            userID: req.user._id,
            comment: req.body.comment       
        });
        res.json(comment);

    } catch (err) {
        res.status(500).json({ error: "Comment could not be posted."})
    }
    
});

// Delete Comment 
router.delete("/:id", auth, async function ( req, res ) {

    try {
        const comment = await Comment.findById(req.params.id);

        // Check if comment exists 
        if (!comment) {
            // If not return error message
            return res.status(404).json({ error: "Comment could not be found."})
        }

        // Only owner can delete its comment 
        if ( comment.userID.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error : "Not allowed to delete this comment."})
        } 

        await Comment.findByIdAndDelete(req.params.id);

        // Succesful message #
        res.json({ message : "Comment deleted. "})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

// Update Comment 
router.put("/:id", auth, async function(req,res) {

    try {
        // Fetch the comment to be updated 
        const comment = await Comment.findById(req.params.id);

        // Check if comment is found 
        if (!comment) {
            return res.status(404).json({ error: "Comment not found."});
        }

         // Only owner can update its comment 
        if ( comment.userID.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error : "Not allowed to update this comment."})
        } 

        const updated = await Comment.findByIdAndUpdate( req.params.id, { comment : req.body.comment }, { new : true, runValidators: true});

        // Check if comment to be uodated exists 
        if (!updated) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json(updated);

    } catch ( err ) {
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;