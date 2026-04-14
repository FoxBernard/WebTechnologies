const express = require("express");
const router = express.Router();
const Invitation = require("../models/Invitation");
const auth = require("../middleware/auth");
const EventModel = require("../models/Event");

console.log("EVENT MODEL:", EventModel);

// GET all invitations 
router.get("/", auth, async function (req, res) {

     try {
            const invitations = await Invitation.find({ userID: req.user.id})
            .populate("eventID", "title")
            .populate("userID", "username");
            res.status(200).json(invitations);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

});

// Create invitations (Only host can invite)
router.post("/", auth, async function ( req, res ) {

    try {

        // Fetch event to invite to 
        const { eventID, userID } = req.body;
        if ( !eventID || !userID ) {
            return res.status(400).json({ error: "eventID and userID are required" });
        }
        const event = await EventModel.findById(eventID);

        // If no event is found
        if (!event) {
            return res.status(404).json({error: "Event not found"});
        }

        // making sure only host can invite 
        if ( event.hostID.toString() !== req.user.id) {
            return res.status(403).json({ error: "event not found "})
        }

        // Creates invitation
        const invitation = await Invitation.create({
            eventID,
            userID,
            status:  "invited",
            createdBy: req.user.id
        });

        res.status(201).json(invitation);

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "User is already invited to this event"});
        }
        console.error("Create invitation error: ", err );
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

        // Host only
        if (invitation.createdBy?.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not allowed to delete this invitation"});
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