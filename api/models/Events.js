const mongoose = require("mongoose")

// Events database schema

const EventsSchema = new mongoose.Schema({

    // Each Event has a eventId, title, description, date&Time, location, venue, isPrivate, hostID

    title: {
        type: String,
        required :true
    },

    description: {
        type: String,
        required :true
    },

    dateAndTime: {
        type: Date,
        startDateTime: Date,
        endDateTime: Date,
        required: true
    },

    location: {
        type: text,
        required: true
    },

    venue: {
        type: text,
        required: true
    },

    isPrivate: {
        type: Boolean,
        required: true
    },

    hostID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }

},

// Records when event was posted
{ timestamps: true });

module.exports = mongoose.model("Event", EventsSchema);