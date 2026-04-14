const mongoose = require("mongoose")

// Events database schema

const EventsSchema = new mongoose.Schema({

    // Each Event has a eventId, title, description, date&Time, location, venue, isPrivate, hostID

    title: {
        type: String,
        trim: true,
        required :true
    },

    description: {
        type: String
    },

    date: {
       start: {
        type: Date,
        required: true
       },
       end: {
        type: Date,
        required: true
       }
    },

    location: {
        type: String,
        required: true
    },

    venue: {
        type: String,
        required: true
    },

    isPrivate: {
        type: Boolean,
        default: false
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