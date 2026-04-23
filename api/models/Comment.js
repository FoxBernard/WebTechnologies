const mongoose = require("mongoose");

// Comments database schema

const CommentsSchema = new mongoose.Schema({

    // Each Comment Has eventID, userId, comment, dateOfComment

   eventID: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Event",
  required: true
},
    
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // This is where relantionship between tables is created 
    },

    comment: {
        type: String,
        required: true,
        trim: true
    }

},
// Timestamp register dateOfComment of the new comment 
{timestamps: true});

module.exports = mongoose.model("Comment", CommentsSchema);