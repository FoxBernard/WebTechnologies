// Models files sets the database schema 
const mongoose = require("mongoose")

// Invitations database schema 
const InvitationsSchema = new mongoose.Schema({

// Each Invitation has a invitationID, eventID, userID, status ( Invited / accepted / declined )
// trim : removes whitespace from the beginning and end of a string operation 

  invitationID: {
    type: Number,
    unique: true,
    required: true
  },

  eventID: {
    type: Number,
    required: true,
  },

  userID: {
    type: Number,
    required: true,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["invited", "attending", "not_attending", "maybe"],
    default: "invited",
    required: true,
  }

  
})

// Preventing duplicate invitations so that same user doesn't get invited more than once 
InvitationsSchema.index({ userID: 1, eventID: 1}, {unique: true});


module.exports = mongoose.model("Invitations", InvitationsSchema)