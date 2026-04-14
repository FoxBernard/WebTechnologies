const express = require("express")
const router = express.Router()
const EventModel = require("../models/Event")
const auth = require("../middleware/auth")


// GET all events 
router.get("/", auth, async function (req, res) {
    
    try {
        const events = await EventModel.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

// GET event by ID 
router.get("/:id", auth, async function (req, res) {

    try {
        const event = await EventModel.findById(req.params.id);

        // Check if event was founf
        if (!event) {
            return res.status(404).json({ error: "Event not found."})
        }
        res.json(event);
    } catch ( err ) {
        res.status(500).json({ error: err.message });
    }

});


// Create event ( Host(Owner) Only)
router.post("/", auth, async function ( req, res ) {

    try {

        // Only owner  can create events
        if (req.user.role !== "host") {
            return res.status(403).json({ error: "Only hosts can create events." });
        }

        // Create event 
        const { title, date, location, venue, description } = req.body;

        if (!title || !date || !location || !venue ) {
            return res.status(400).json({ error: "Title, date, location, and venue are required"});
        }

        const event = await EventModel.create({...req.body, hostID: req.user.id});
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }

});

// Delete events ( Host only )
router.delete("/:id", auth, async function ( req, res ) {
    try {
    
        const event = await EventModel.findById(req.params.id);

        // If event is not found return 404 error
        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        // Making sure only Host can delete an event 
        if (event.hostID.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to delete this event." });
        }
        
        // Delete event
        await EventModel.deleteOne();
        res.json({ message : "Event succesfully deleted. "});

    } catch (err) {
        res.status(500).json({ error: err.message })
    }

});

// Update events ( Host only )
router.put("/:id", auth, async function(req,res) {
    
    try {

        console.log("PARAM ID:", req.params.id);
        console.log("TYPE:", typeof req.params.id);
        console.log("LENGTH:", req.params.id.length);

        const event = await EventModel.findById(req.params.id);

        // If event is not found return 404 error
        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        // Making sure only Host can uodate an event 
        if (event.hostID.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to update this event." });
        }

        // Update event
        const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true });
        res.json(updatedEvent);
    
    } catch (err) {
            res.status(500).json({ error : err.message });
    }
    
});

module.exports = router;