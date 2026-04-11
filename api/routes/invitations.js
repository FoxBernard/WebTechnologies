const express = require("express")
const router = express.Router()
const Invitation = require("../models/Invitation")
const auth = require("../middleware/auth")

// GET all invitations 
router.get("/", auth, async function (req, res) {

     try {
            const invitations = await Invitation.find();
            res.json(invitations);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

});

// Create invitations 
router.post("/", auth, async function ( req, res ) {

    try {
        const invitation = await Invitation.create({
            eventID: req.body.eventID,
            userID: req.body.userID,
            status: req.body.status || "invited"
        });

        res.json(invitation);

    } catch (err) {
        res.status(500).json({ error: "Invitation could not be posted."})
    }

});

// Delete invitations  
router.delete("/:id", auth, async function ( req, res ) {

    try {
    
        const invitation = await Invitation.findById(req.params.id);

        // If invitation is not found return 404 error
        if (!invitation) {
            return res.status(404).json({ error: "Invitation not found." });
        }
        
        // Delete invitation
        await Invitation.findByIdAndDelete(req.params.id)
        res.json({ message : "Invitation succesfully deleted. "})

    } catch (err) {
        res.status(500).json({ error: err.message })
    }

});

// Update invitations 
router.put("/:id", auth, async function(req,res) {

    try {
        const invitation = await Invitation.findById(req.params.id);
    
        // If event is not found return 404 error
        if (!invitation) {
            return res.status(404).json({ error: "Invitation not found." });
        }
    
        // Update event
        const updatedInvitation = await Invitation.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true });
        res.json(updatedInvitation);
        
        } catch (err) {
            res.status(500).json({ error : "Invitation could not be updated." });
        }
        

    
});

module.exports = router;